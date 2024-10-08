import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  IconButton,
  Typography,
  InputAdornment,
  CircularProgress,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import BotImage from 'assets/img/LLM/bot.png';
import { useSelector, useDispatch } from 'react-redux';
import { updateChatMessages, setSelectedChat } from 'Redux/LLM/chatSlice';
import TableComponent, { parseTableData } from '../Table';
import LineGraph from '../LineGraph';
import Group from 'assets/img/LLM/Group.png';

export default function ChatScreen({ selectedChatId }) {
  const chatHistory = useSelector((state) => state.chat.chatHistory);
  const [chatMessages, setChatMessages] = useState([]);
  const dispatch = useDispatch();
  const [newPrompt, setNewPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const user_id = '3e69745a-295b-4a52-ae28-1922841ca09b'; // Assuming user_id is constant

  // Fetch chat messages from Redux store for the selected chat
  useEffect(() => {
    if (selectedChatId && chatHistory && chatHistory.chat_history) {
      const selectedChat = chatHistory.chat_history.find(
        (chat) => chat[0] === selectedChatId
      );
      if (selectedChat) {
        // Process messages to handle tabular data
        const processedMessages = selectedChat[2].map((message) => {
          if (message.type === 'tabular') {
            return {
              ...message,
              parsedData: parseTableData(message.response),
            };
          } else if (message.type === 'datapoints') {
            return {
              ...message,
              datapoints: message.datapoints,
              plotText: message.plotText,
            };
          }
          return message;
        });
        setChatMessages(processedMessages);
      }
    }
  }, [selectedChatId, chatHistory]);
  

  const fetchChatHistory = async () => {
    try {
      const response = await fetch('https://awschatbotapi.onrender.com/chatbot/chat-history', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      return data; // Return the chat history
    } catch (error) {
      console.error('Error fetching chat history:', error);
    }
  };
  // Handle sending a message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newPrompt.trim() || !selectedChatId) return;

    setIsLoading(true);
    try {
      const body = {
        prompt: newPrompt,
        user_id: user_id,
      };

      if (selectedChatId && !selectedChatId.startsWith('temp-')  ) {
        body.id = selectedChatId; // Include chatId for existing chats
      }

      const response = await fetch('https://awschatbotapi.onrender.com/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      // Update local state with the new message
      const newMessage = {
        prompt: newPrompt,
        response: data.response,
        type: data.type,
      };

      if (data.type === 'tabular') {
        newMessage.parsedData = parseTableData(data.response);
      } else if (data.type === 'datapoints') {
        console.log(data.type)
        newMessage.datapoints = data.datapoints;
        newMessage.plotText = `I have plotted the CPU utilization for instance ${newPrompt.split(' ')[-1]}.`;
      }

      setChatMessages((prevMessages) => [...prevMessages, newMessage]);

      // Dispatch message update to Redux
      dispatch(updateChatMessages({
        chatId: selectedChatId,
        newPrompt: newPrompt,
        newResponse: data.response,
        type: data.type,
        parsedData: newMessage.parsedData,
        datapoints: newMessage.datapoints,
        plotText: newMessage.plotText,
      }));

      // If the chat ID is temporary, identify and update it with the real chat ID
      if (selectedChatId.startsWith('temp-')) {
        // Assuming the new chat ID will come from the GET request in your layout
        fetchChatHistory(); // Fetch updated chat history and find the real chat ID
      }

    } catch (error) {
      console.error('Error sending message:', error);
    }
    setIsLoading(false);
    setNewPrompt(''); // Clear input field
  };

  // Render the chat screen
  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100%"
      style={{
        background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(231, 228, 254, 0.8) 100%)'
      }}
    >
      <Box flex={1} p={2} overflow="auto">
        {!selectedChatId ? (
          <Typography variant="body1" sx={{ color: '#666' }}>
            Select a chat from the history to view messages.
          </Typography>
        ) : chatMessages === null ? (
          <Box display="flex" justifyContent="center" my={2}>
            <CircularProgress />
          </Box>
        ) : (
          chatMessages.map((message, index) => (
            <Box
              key={index}
              my={2}
              display="flex"
              flexDirection="column"
              alignItems={message.prompt ? 'flex-end' : 'flex-start'}
            >
              {message.prompt && (
                <Box
                  sx={{
                    maxWidth: '90%',
                    fontFamily: 'Poppins',
                    fontSize: '16px',
                    fontWeight: '400',
                    lineHeight: '1.5',
                    borderRadius: '20px 20px 0 20px',
                    p: 2,
                    mb: 1,
                    alignSelf: 'flex-end',
                  }}
                >
                  <Typography variant="body1" sx={{ color: '#333' }}>
                    {message.prompt}
                    <img
                      src={Group}
                      alt="Message"
                      style={{ width: '20px', height: '20px', marginLeft: '8px' }}
                    />
                  </Typography>
                </Box>
              )}
              <Box
                sx={{
                  maxWidth: '95%',
                  fontFamily: 'Poppins',
                  fontSize: '16px',
                  fontWeight: '400',
                  lineHeight: '1.5',
                  borderRadius: message.prompt ? '20px 20px 20px 0' : '20px 20px 20px 0',
                  p: 2,
                  alignSelf: 'flex-start',
                }}
              >
              
                {message.type === 'tabular' && message.parsedData ? (
                  <TableComponent data={message.parsedData} />
                ) : message.type === 'datapoints' && message.datapoints ? (
                  <Box   sx={{
                    boxShadow: 3,
                    borderRadius: 2,
                    bgcolor: 'white',
                    p: 2,
                    mt: 1,
                    
                    overflow: 'auto',
                    fontFamily: 'Poppins',
                  }}>
                    <Typography sx={{ fontWeight: 'bold' }}>{message.plotText}</Typography>
                    
                    

                    <LineGraph datapoints={message.datapoints} width="100%" />
                  </Box>
                ) : (
                  <Typography variant="body2" sx={{ color: '#666', display: 'flex', alignItems: 'flex-start' }}>
                        <img src={Group} alt="Message" style={{ width: '20px', height: '20px', marginRight: '8px' }} />
                        {message.response.startsWith('**') ? (
                          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                            {message.response.replace(/\*\*(.+?)\*\*/g, (match, p1) => (
                              <span style={{ fontWeight: 'bold' }}>{p1}</span>
                            ))}
                          </Typography>
                        ) : message.response.startsWith('*') ? (
                          <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                            {message.response.replace(/\*(.+?)\*/g, (match, p1) => (
                              <span style={{ fontStyle: 'italic' }}>{p1}</span>
                            ))}
                          </Typography>
                        ) : (
                          message.response
                        )}
                      </Typography>

                )}
              </Box>
            </Box>
          ))
        )}
      </Box>

      <Box p={2} display="flex" justifyContent="center">
        <form onSubmit={handleSendMessage} style={{ width: '100%' }}>
          <TextField
            fullWidth
            placeholder="Ask a question"
            value={newPrompt}
            onChange={(e) => setNewPrompt(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <img src={BotImage} alt="Bot Icon" style={{ width: '24px', height: '24px' }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    type="submit"
                    color="primary"
                    sx={{ transform: 'rotate(325deg)' }}
                    disabled={isLoading || !selectedChatId}
                  >
                    {isLoading ? <CircularProgress size={24} /> : <SendIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              borderRadius: '25px',
              backgroundColor: 'white',
              '& .MuiOutlinedInput-root': {
                borderRadius: '25px',
                '& fieldset': {
                  borderColor: 'blue',
                },
                '&:hover fieldset': {
                  borderColor: 'blue',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'blue',
                },
              },
              '& .MuiInputBase-input::placeholder': {
                color: '#666',
              },
            }}
          />
        </form>
      </Box>
    </Box>
  );
}
