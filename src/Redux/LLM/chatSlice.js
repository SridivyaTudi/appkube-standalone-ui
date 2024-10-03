import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  chatHistory: { chat_history: [] },
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChatHistory: (state, action) => {
      state.chatHistory = action.payload;
    },
    updateChatMessages: (state, action) => {
      const { chatId, newPrompt, newResponse, type, parsedData, datapoints, plotText } = action.payload;
      const chatIndex = state.chatHistory.chat_history.findIndex(chat => chat[0] === chatId);
      if (chatIndex !== -1) {
        // Add new message to the chat
        state.chatHistory.chat_history[chatIndex][2].push({
          prompt: newPrompt,
          response: newResponse,
          type: type, // Assuming you want to store the type as well
          parsedData: parsedData, 
          datapoints: datapoints,
          plotText: plotText
        });
        // Update last modified date
        state.chatHistory.chat_history[chatIndex][4] = new Date().toISOString();
      }
    },
    addMessage(state, action) {
      state.chatHistory.chat_history.push(action.payload);
    },
    clearChatHistory(state) {
      state.chatHistory.chat_history = [];
    },
  },
});

export const { setChatHistory, addMessage, clearChatHistory, updateChatMessages } = chatSlice.actions;

export default chatSlice.reducer;