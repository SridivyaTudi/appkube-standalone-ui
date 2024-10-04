import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, List, Divider, Button, useMediaQuery, useTheme } from '@mui/material';
import NewChat from 'assets/img/LLM/Newchat.png';
import Vector from 'assets/img/LLM/Vector.png';

// Helper functions
const groupChatsByDateRange = (chatHistory) => {
  if (!chatHistory || !Array.isArray(chatHistory) || chatHistory.length === 0) {
    return {
      today: [],
      yesterday: [],
      thisWeek: [],
      previous: [],
    };
  }

  const todayChats = [];
  const yesterdayChats = [];
  const thisWeekChats = [];
  const previousChats = [];

  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  const thisWeekStart = new Date();
  thisWeekStart.setDate(today.getDate() - today.getDay());

  chatHistory.forEach(chat => {
    const chatId = chat[0]; // Assuming uuid is at index 0
    const chatMessages = chat[2]; // Assuming messages are at index 2
    const lastUpdated = new Date(chat[4]); // Assuming date is at index 4

    if (isSameDay(lastUpdated, today)) {
      todayChats.push({ id: chatId, messages: chatMessages });
    } else if (isSameDay(lastUpdated, yesterday)) {
      yesterdayChats.push({ id: chatId, messages: chatMessages });
    } else if (isWithinThisWeek(lastUpdated, today)) {
      thisWeekChats.push({ id: chatId, messages: chatMessages });
    } else {
      previousChats.push({ id: chatId, messages: chatMessages });
    }
  });
  
  const sortChatsByDate = (chats) => chats.sort((a, b) => b.lastUpdated - a.lastUpdated);

  return {
    today: sortChatsByDate(todayChats),
    yesterday: sortChatsByDate(yesterdayChats),
    thisWeek: sortChatsByDate(thisWeekChats),
    previous: sortChatsByDate(previousChats),
  };
};

const isSameDay = (date1, date2) => {
  return date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate();
};

const isWithinThisWeek = (date, today) => {
  const thisWeekStart = new Date(today);
  thisWeekStart.setDate(today.getDate() - today.getDay());
  const thisWeekEnd = new Date(today);
  thisWeekEnd.setDate(today.getDate() + (6 - today.getDay()));
  return date >= thisWeekStart && date <= thisWeekEnd;
};

const ChatHistory = ({ onSelectChat }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const chatHistory = useSelector(state => state.chat.chatHistory);
  const [lastSelectedChatId, setLastSelectedChatId] = useState(null);

  const [groupedChats, setGroupedChats] = useState({
    today: [],
    yesterday: [],
    thisWeek: [],
    previous: [],
  });

  useEffect(() => {
    if (Array.isArray(chatHistory.chat_history)) {
      const grouped = groupChatsByDateRange(chatHistory.chat_history);
      setGroupedChats(grouped);
    }
  }, [chatHistory]);


  const handleChatSelection = (chatId) => {
    setLastSelectedChatId(chatId);
    onSelectChat(chatId);

    setGroupedChats(prevGroupedChats => {
      const newGroupedChats = { ...prevGroupedChats };
      Object.keys(newGroupedChats).forEach(key => {
        const index = newGroupedChats[key].findIndex(chat => chat.id === chatId);
        if (index !== -1) {
          const [selectedChat] = newGroupedChats[key].splice(index, 1);
          newGroupedChats[key].unshift(selectedChat);
        }
      });
      return newGroupedChats;
    });
  };

  if (!chatHistory || !Array.isArray(chatHistory.chat_history)) {
    return <div>Loading...</div>;
  }

  return (
    <Box
      width={isMobile ? '100%' : 390}
      height="100%"
      borderLeft={isMobile ? 0 : 1}
      borderColor="divider"
      style={{ 
        background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(231, 228, 254, 0.8) 100%)'
      }}
    >
      <Box p={2} borderBottom={1} borderColor="divider" display="flex" alignItems="center" sx={{ mt: 1 }}>
        <img src={Vector} alt="Vector Image" style={{ width: 20, height: 20, marginRight: 8 }} />
        <Typography variant="subtitle1" fontWeight="bold">Previous Chats</Typography>
      </Box>
      
      <List sx={{ height: 'calc(100% - 160px)', overflowY: 'auto' }}>
      {Object.keys(groupedChats).map((key) => (
        <Box key={key} mb={2}>
          <Typography 
            variant="p" 
            gutterBottom 
            sx={{
              fontWeight: 500, 
              textTransform: 'capitalize', 
              color: '#383874', // Subtle color for section headers
              marginBottom: 1,
              padding: '10px 6px',
            }}
          >
            {key === 'today' ? 'Today' : key === 'yesterday' ? 'Yesterday' : key === 'thisWeek' ? 'This week' : 'Previous'}
          </Typography>
          {groupedChats[key].map((chat) => (
            <Box key={chat.id} >
              {chat.messages.length > 0 && (
                <Box
                onClick={() => handleChatSelection(chat.id)}
                sx={{
                  cursor: 'pointer',
                  padding: '10px 20px',
                  borderRadius: '6px',
                  transition: 'background-color 0.3s',
                  color: lastSelectedChatId === chat.id ? '#4A90E2' : '#383874', // Selected chat color
                  '&:hover': {
                    color: '#4A90E2', // Light blue color on hover
                  },
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 200,
                    color: lastSelectedChatId === chat.id ? '#4A90E2' : '#383874', // Adjust text color here too
                  }}
                >
                  {chat.messages[0].prompt.length > 30
                    ? `${chat.messages[0].prompt.substring(0, 30)}...`
                    : chat.messages[0].prompt}
                </Typography>
              </Box>
              
              )}
            </Box>
          ))}
        </Box>
      ))}
      </List>

      {/* New Chat button */}
      <Box p={2} display="flex" justifyContent="left" >
        <Button
          startIcon={<img src={NewChat} alt="New Chat" width={20} height={20} />}
          //onClick={onNewChat}
        >
          New Chat
        </Button>
      </Box>
    </Box>
  );
};

export default ChatHistory;
