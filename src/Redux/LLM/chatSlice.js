import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  chatHistory: [],
  selectedChatId: null, // Store selected chat ID here
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChatHistory: (state, action) => {
      state.chatHistory = action.payload;
    },
    createEmptyChat: (state, action) => {
      const newChatId = action.payload;
      state.chatHistory.chat_history.unshift([
        newChatId,
        'New Chat', // Empty title
        [], // Empty messages array
        '', // Empty model
        new Date().toISOString(), // Current date
      ]);
    },
    updateChatMessages: (state, action) => {
      const { chatId, newPrompt, newResponse, type, parsedData, datapoints, plotText } = action.payload;
      const chatIndex = state.chatHistory.chat_history.findIndex(chat => chat[0] === chatId);
      if (chatIndex > -1) {
        state.chatHistory.chat_history[chatIndex][2].push({
          prompt: newPrompt,
          response: newResponse,
          type: type,
          parsedData: parsedData || null,
          datapoints: datapoints || null,
          plotText: plotText || null,
        });
      }else {
        // If the chat doesn't exist, create a new one
        state.chatHistory.chat_history.unshift([
          chatId,
          '', // You might want to add a title here
          [{
            prompt: newPrompt,
            response: newResponse,
            type: type,
            parsedData: parsedData || null,
            datapoints: datapoints || null,
            plotText: plotText || null,
          }],
          '', // You might want to add a model here
          new Date().toISOString(), // Current date
        ]);
      }
    },
    setSelectedChat: (state, action) => {
      state.selectedChatId = action.payload; // Update the selected chat ID
    },
    clearChatHistory: (state) => {
      state.chatHistory = null;
    },
  },
});

export const { setChatHistory, createEmptyChat, updateChatMessages, setSelectedChat, clearChatHistory } = chatSlice.actions;
export default chatSlice.reducer;
