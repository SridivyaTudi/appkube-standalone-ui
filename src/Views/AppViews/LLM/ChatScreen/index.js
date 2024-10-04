import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  IconButton,
  Typography,
  InputAdornment,
  CircularProgress,
  MenuItem, Select,
  FormControl,
  
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import BotImage from 'assets/img/LLM/bot.png';
import { useSelector, useDispatch } from 'react-redux';
import { updateChatMessages } from 'Redux/LLM/chatSlice';
import TableComponent, { parseTableData } from '../Table';
import LineGraph from '../LineGraph';
import Group from 'assets/img/LLM/Group.png';
import Setting from 'assets/img/LLM/Setting.png';




export default function ChatScreen({ selectedChatId }) {
  const chatHistory = useSelector((state) => state.chat.chatHistory);
  const [chatMessages, setChatMessages] = useState(null);
  const dispatch = useDispatch();
  const [newPrompt, setNewPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const user_id = '3e69745a-295b-4a52-ae28-1922841ca09b'; // Assuming user_id is constant

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


  

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newPrompt.trim() || !selectedChatId) return;

    setIsLoading(true);
    try {
      const response = await fetch(
        'https://awschatbotapi.onrender.com/chatbot',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt: newPrompt,
            id: selectedChatId,
            user_id: user_id,
          }),
        }
      );
      const data = await response.json();
      
      

      // Update local state
      const newMessage = {
        prompt: newPrompt,
        response: data.response,
        type: data.type,
      };
      setChatMessages((prevMessages) => [...prevMessages, newMessage]);

      let parsedData = null;
      if (data.type === 'tabular') {
        parsedData = parseTableData(data.response);
      } else if (data.type === 'datapoints') {
        
        newMessage.datapoints = data.datapoints;
        newMessage.plotText = `I have plotted the CPU utilization for instance ${newPrompt.split(' ')[-1]}. The plot has been generated and is ready for you to view.`;
      }
      console.log(data)
      // Update Redux store
      dispatch(
        updateChatMessages({
          chatId: selectedChatId,
          newPrompt: newPrompt,
          newResponse: data.response,
          type: data.type,
          parsedData: parsedData,
          datapoints: newMessage.datapoints,
          plotText: newMessage.plotText
        })
      );
    } catch (error) {
      console.error('Error sending message:', error);
    }
    setIsLoading(false);
    setNewPrompt(''); // Clear the input field
  };

  if (!chatHistory || !Array.isArray(chatHistory.chat_history)) {
    return (
      <Box display="flex" justifyContent="center" my={2}>
        <CircularProgress />
      </Box>
    );
  }

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
    <Typography variant="body1" sx={{ color: '#666' }}>Select a chat from the history to view messages.</Typography>
  ) : chatMessages === null ? (
    <Box display="flex" justifyContent="center" my={2}>
      <CircularProgress />
    </Box>
  ) : (
    chatMessages.map((message, index) => (
      <Box key={index} my={2} display="flex" flexDirection="column" alignItems={message.prompt ? 'flex-end' : 'flex-start'}>
        {message.prompt && (
          <Box 
            sx={{ 
              maxWidth: '90%', 
            fontFamily: 'Poppins', // Apply Poppins font family
            fontSize: '16px', // Set font size (optional)
            fontWeight: '400', // Set font weight (optional)
            lineHeight: '1.5', // Set line height (optional)
              
              borderRadius: '20px 20px 0 20px', 
              p: 2, 
              mb: 1,
              alignSelf: 'flex-end'
            }}
          >
            <Typography variant="body1" sx={{ color: '#333' }}>
            
              {message.prompt}
              <img src={Group} alt="Message" style={{ width: '20px', height: '20px', marginLeft: '8px' }} />
            </Typography>
          </Box>
        )}
        <Box 
          sx={{ 
            maxWidth: '90%', 
            fontFamily: 'Poppins', // Apply Poppins font family
            fontSize: '16px', // Set font size (optional)
            fontWeight: '400', // Set font weight (optional)
            lineHeight: '1.5', // Set line height (optional)
            
            borderRadius: message.prompt ? '20px 20px 20px 0' : '20px 20px 20px 0', 
            p: 2,
            alignSelf:'flex-start'
          }}
        >
          {message.type === 'tabular' && message.parsedData ? (
            
            
            <TableComponent data={message.parsedData} />
          ) : message.type === 'datapoints' && message.datapoints && message.plotText ? (
            <Box>
              <Typography sx={{ fontWeight: 'bold' }}>{message.plotText}</Typography>
              <LineGraph datapoints={message.datapoints.datapoints} width="100%" />
            </Box>
          ) : (
            <Typography variant="body2" sx={{ color: '#666', display: 'flex', alignItems: 'flex-start' }}>
              <img src={Group} alt="Message" style={{ width: '20px', height: '20px', marginRight: '8px' }} />
              <Box>{message.response}</Box>
            </Typography>
          )}
        </Box>
      </Box>
    ))
  )}
</Box>

      <Box p={2}  display="flex" justifyContent="center" >
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
                  <IconButton type="submit" color="primary" sx={{ transform: 'rotate(325deg)' }} disabled={isLoading || !selectedChatId}>
                    {isLoading ? <CircularProgress size={24} /> : <SendIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              borderRadius: '25px',
              backgroundColor: 'white', // Set background color to white
              '& .MuiOutlinedInput-root': {
                borderRadius: '25px',
                '& fieldset': {
                  borderColor: 'blue', // Change border color to light blue
                },
                '&:hover fieldset': {
                  borderColor: 'blue', // Change border color on hover
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'blue', // Change border color when focused
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