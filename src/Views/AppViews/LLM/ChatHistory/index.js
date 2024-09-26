import React, { useState, useEffect, useCallback } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Button, useMediaQuery, useTheme, Divider } from '@mui/material';
import NewChat from 'assets/img/LLM/Newchat.png';
import Vector from 'assets/img/LLM/Vector.png';

const groupChatsByDateRange = (chats) => {
  if (!chats || !Array.isArray(chats)) {
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

  chats.forEach(chat => {
    const chatDate = new Date(chat.date);

    if (isSameDay(chatDate, today)) {
      todayChats.push(chat);
    } else if (isSameDay(chatDate, yesterday)) {
      yesterdayChats.push(chat);
    } else if (isWithinThisWeek(chatDate, today)) {
      thisWeekChats.push(chat);
    } else {
      previousChats.push(chat);
    }
  });

  return {
    today: todayChats,
    yesterday: yesterdayChats,
    thisWeek: thisWeekChats,
    previous: previousChats,
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
  thisWeekEnd.setDate(today.getDate() + (7 - today.getDay() - 2)); // Exclude today and yesterday
  return date >= thisWeekStart && date <= thisWeekEnd;
};

const ChatHistory = ({ allChats, onSelectChat, selectedChat, onNewChat }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [groupedChats, setGroupedChats] = useState(() => {
    const storedChats = localStorage.getItem('groupedChats');
    return storedChats ? JSON.parse(storedChats) : {
      today: [],
      yesterday: [],
      thisWeek: [],
      previous: [],
    };
  });

  useEffect(() => {
    const grouped = groupChatsByDateRange(allChats);
    setGroupedChats(grouped);
  }, [allChats]);

  useEffect(() => {
    const storedChats = JSON.parse(localStorage.getItem('groupedChats') || '{}');
    Object.keys(groupedChats).forEach(category => {
      storedChats[category] = groupedChats[category]; 
    });
    localStorage.setItem('groupedChats', JSON.stringify(storedChats));
  }, [groupedChats]);

  const handleChatSelect = (chat) => {
    const newGroupedChats = { ...groupedChats };
    const today = new Date();

    // Remove the chat from its previous category
    Object.keys(newGroupedChats).forEach(category => {
      newGroupedChats[category] = newGroupedChats[category].filter(c => c.uuid !== chat.uuid);
    });

    // Update the chat's timestamp to the current time
    const updatedChat = { ...chat, date: today.toISOString() };

    // Add the updated chat to the 'today' category
    newGroupedChats.today.unshift(updatedChat);

    // Update the state
    setGroupedChats(newGroupedChats);
    onSelectChat(updatedChat.uuid);
  };

  return (
    <Box
      width={isMobile ? '100%' : 320}
      height="100%"
      borderLeft={isMobile ? 0 : 1}
      borderColor="divider"
      style={{
        background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.8) 0%, rgba(231, 228, 254, 0.4) 100%)'
      }}
    >
      <Box p={2} borderBottom={1} borderColor="divider" display="flex" alignItems="center">
        <img src={Vector} alt="Vector Image" style={{ width: 20, height: 20, marginRight: 8 }} />
        <Typography variant="subtitle1" fontWeight="bold">Previous Chats</Typography>
      </Box>
      <List sx={{ height: 'calc(100% - 100px)', overflowY: 'auto' }}>
        {Object.keys(groupedChats).map(category => (
          <React.Fragment key={category}>
            <ListItem>
              <ListItemText
                primary={category.charAt(0).toUpperCase() + category.slice(1)}
                primaryTypographyProps={{ fontWeight: 'bold' }}
              />
            </ListItem>
            {groupedChats[category].map((chat) => (
              <ListItem
                key={chat.uuid}
                onClick={() => handleChatSelect(chat)}
                selected={selectedChat === chat.uuid}
              >
                <ListItemText
                  primary={chat.title}
                  primaryTypographyProps={{
                    color: 'black',
                    variant: 'body2',
                    fontWeight: selectedChat === chat.uuid ? 'bold' : 'medium'
                  }}
                />
              </ListItem>
            ))}
            {category !== 'previous' && <Divider />}
          </React.Fragment>
        ))}
      </List>
      <Box p={2} display="flex" justifyContent="left" sx={{ mt: -3 }}>
        <Button
          startIcon={<img src={NewChat} alt="New Chat" width={20} height={20} />}
          onClick={onNewChat}
        >
          New Chat
        </Button>
      </Box>
    </Box>
  );
};

export default ChatHistory;