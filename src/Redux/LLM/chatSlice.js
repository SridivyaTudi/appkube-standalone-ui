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

export const { setChatHistory, updateChatMessages, setSelectedChat, clearChatHistory } = chatSlice.actions;
export default chatSlice.reducer;
