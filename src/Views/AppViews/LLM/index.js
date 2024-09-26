import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import ChatScreen from './ChatScreen';
import ChatHistory from './ChatHistory';
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY = 'chatHistory';

const loadChatsFromLocalStorage = () => {
  try {
    const storedChats = localStorage.getItem(LOCAL_STORAGE_KEY);
    // Ensure it returns an array
    const chats = JSON.parse(storedChats) || [];
    return Array.isArray(chats) ? chats : [];
  } catch (error) {
    console.error('Failed to load chat history from localStorage:', error);
    return [];
  }
};

const saveChatsToLocalStorage = (chats) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(chats));
  } catch (error) {
    console.error('Failed to save chat history to localStorage:', error);
  }
};

export default function ChatLayout() {
  const [allChats, setAllChats] = useState(loadChatsFromLocalStorage());
  const [selectedChat, setSelectedChat] = useState(null);
  const [showHistory, setShowHistory] = useState(true);

  useEffect(() => {
    const storedChats = loadChatsFromLocalStorage();
    setAllChats(storedChats);
    if (storedChats.length > 0) {
      setSelectedChat(storedChats[0].uuid);
    }
  }, []);

  useEffect(() => {
    saveChatsToLocalStorage(allChats);
  }, [allChats]);

  const handleChatSelect = (chatId) => {
    setSelectedChat(chatId);
  };

  const handleNewChat = () => {
    const newChat = {
      uuid: uuidv4(),
      title: 'New Chat', // Temporary title, will be updated after the first message
      messages: [],
      date: new Date().toISOString(),
    };

    setAllChats(prevChats => [newChat, ...prevChats]);
    setSelectedChat(newChat.uuid);
  };

  const updateChat = (chatId, newMessage, isFirstMessage = false) => {
    setAllChats(prevChats =>
      prevChats.map(chat =>
        chat.uuid === chatId
          ? {
              ...chat,
              messages: [...chat.messages, newMessage],
              title: isFirstMessage ? newMessage.text.slice(0, 30) + (newMessage.text.length > 30 ? '...' : '') : chat.title,
            }
          : chat
      )
    );
  };

  return (
    <Box display="flex" height="100%" overflow="hidden">
      
      <Box width={showHistory ? '70%' : '100%'}>
        <ChatScreen
          selectedChat={selectedChat}
          onNewChat={handleNewChat}
          onSelectChat={handleChatSelect}
          onUpdateChat={updateChat}
          onToggleHistory={() => setShowHistory(!showHistory)}
          allChats={allChats}
        />
      </Box>
      {showHistory && (
        <Box width="30%" borderRight={1} borderColor="divider">
          <ChatHistory
            allChats={allChats}
            onSelectChat={handleChatSelect}
            selectedChat={selectedChat}
            onNewChat={handleNewChat} // Pass the new chat handler
          />
        </Box>
      )}
    </Box>
  );
}