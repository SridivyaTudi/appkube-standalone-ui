import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import ChatScreen from './ChatScreen';
import ChatHistory from './ChatHistory';
import { useDispatch, useSelector } from 'react-redux';
import { setChatHistory } from 'Redux/LLM/chatSlice'; // Import the setChatHistory action

const ChatLayout = () => {
  const dispatch = useDispatch();
  const [showHistory, setShowHistory] = useState(true);

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

  // Access the chat history from Redux store
  const allChats = useSelector((state) => state.chat.chatHistory);
  const [selectedChat, setSelectedChat] = useState(null);

  // Handle chat selection from ChatHistory
  const handleChatSelect = (chat) => {
    console.log(chat)
    setSelectedChat(chat);
    
  };

  return (
    <Box display="flex" height="100%" overflow="hidden">
      <Box width={showHistory ? '70%' : '100%'}>
        <ChatScreen selectedChatId={selectedChat} /> 
      </Box>
      {showHistory && (
        <Box width="30%" borderRight={1} borderColor="divider">
          <ChatHistory allChats={allChats} onSelectChat={handleChatSelect} />
        </Box>
      )}
    </Box>
  );
};
export default ChatLayout;
