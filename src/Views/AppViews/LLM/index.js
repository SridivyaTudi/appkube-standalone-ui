import React, { useEffect, useState } from 'react';
import { Box, Typography, FormControl, Select, MenuItem } from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import ChatScreen from './ChatScreen';
import ChatHistory from './ChatHistory';
import { useDispatch, useSelector } from 'react-redux';
import { setChatHistory } from 'Redux/LLM/chatSlice';
import BotImage from 'assets/img/LLM/bot.png';
import Setting from 'assets/img/LLM/Setting.png';
import { updateChatMessages } from 'Redux/LLM/chatSlice';

const ChatLayout = () => {
  const dispatch = useDispatch();
  const [showHistory, setShowHistory] = useState(true);
  const [cloudService, setCloudService] = useState('Cloud Service');
  
  // Fetch the chat history from the API
  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await fetch('https://awschatbotapi.onrender.com/chat-history/3e69745a-295b-4a52-ae28-1922841ca09b');
        const data = await response.json();

        dispatch(setChatHistory(data));
      } catch (error) {
        console.error('Error fetching chat history:', error);
      }
    };

    fetchChatHistory();
  }, [dispatch]);

  const handleCloudServiceChange = (event) => {
    setCloudService(event.target.value);
  };

  // Access the chat history from Redux store
  const allChats = useSelector((state) => state.chat.chatHistory);
  const [selectedChat, setSelectedChat] = useState(null);

  // Handle chat selection from ChatHistory
  const handleChatSelect = (chatId) => {
    setSelectedChat(chatId);
    if (chatId.startsWith('temp-')) {
      // Fetch new chat ID from API and update Redux store
      fetchNewChatId(chatId);
    }
  };

  const fetchNewChatId = async (tempChatId) => {
    try {
      const response = await fetch('https://awschatbotapi.onrender.com/chat-history/3e69745a-295b-4a52-ae28-1922841ca09b');
      const data = await response.json();

      const newChatId = data.chat_history.find(chat => !allChats.chat_history.some(existingChat => existingChat[0] === chat[0]));
      if (newChatId) {
        dispatch(setSelectedChat({ chatId: newChatId[0] }));
        dispatch(updateChatMessages({
          chatId: newChatId[0],
          newPrompt: 'New Chat',
          newResponse: '',
          type: 'text',
        }));
      }
    } catch (error) {
      console.error('Error fetching new chat ID:', error);
    }
  };

 
 

  return  (
      <Box display="flex" flexDirection="column" height="100%" bgcolor="transparent">
        {/* Header */}
        <Box
          p={2}
          
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          height="10%"
          width="100%"
        >
          <Box display="flex" alignItems="center" gap={2} bgcolor="transparent">
            <Box
              width={28}
              height={28}
              borderRadius="50%"
              display="flex"
              alignItems="center"
              justifyContent="center"
              bgcolor="transparent"
            >
              <img src={BotImage} alt="Bot" style={{ width: '100%', height: '100%' }} />
            </Box>
            <Typography variant="h6" bgcolor="transparent" sx={{ color: '#333' }}>
              Chatbot
            </Typography>
            
            {/* Cloud Service Dropdown */}
            <FormControl sx={{ minWidth: 120, color: '#333' }}>
  <Select
    value={cloudService}
    onChange={handleCloudServiceChange}
    displayEmpty
    IconComponent={ExpandMoreIcon}
    renderValue={(selected) => (
      <Box display="flex" alignItems="center">
        <img
          src={Setting}
          alt="Cloud Service"
          style={{ width: '16px', height: '16px', marginRight: '8px' }}
        />
        <Typography variant="body2" sx={{ color: '#333' }}>
          {selected}
        </Typography>
      </Box>
    )}
    sx={{
      height: 30, // Adjust the height here
      bgcolor: '#DDE1F8', // Set the background color to light blue
      '&:before, &:after': {
        border: 'none', // Remove any pseudo-element borders
      },
      '& .MuiOutlinedInput-notchedOutline': {
        border: 'none', // Remove the outline border
      },
    }}
  >
    <MenuItem value="Cloud Service" disabled>
      Cloud Service
    </MenuItem>
    <MenuItem value="AWS">AWS</MenuItem>
  </Select>
</FormControl>

          </Box>
        </Box>
  
        {/* Main content area */}
        <Box display="flex" height="90%" p={2}>
          <Box 
            width={showHistory ? '70%' : '100%'} 
            mr={showHistory ? 2 : 0}
            bgcolor="rgba(255, 255, 255, 0.7)"
            borderRadius={2}
            boxShadow={1}
            overflow="hidden"
          >
            <ChatScreen selectedChatId={selectedChat} /> 
          </Box>
          {showHistory && (
            <Box 
              width="30%" 
              bgcolor="rgba(255, 255, 255, 0.7)"
              borderRadius={2}
              boxShadow={1}
              overflow="hidden"
            >
              <ChatHistory allChats={allChats} onSelectChat={handleChatSelect} />
            </Box>
          )}
        </Box>
      </Box>
    );
  };
  
  export default ChatLayout;