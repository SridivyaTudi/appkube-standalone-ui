import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, TextField, IconButton, Typography, InputAdornment, CircularProgress, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import axios from 'axios';
import BotImage from 'assets/img/LLM/bot.png';
import Group from 'assets/img/LLM/Group.png';
import LineGraph from '../LineGraph';


// Function to parse table data from text
const parseTableData = (text) => {
  const lines = text.split('\n').filter(line => line.trim() !== '');
  if (lines.length < 4) return null; // Not enough lines for a table

  const headers = lines[1].split('|').filter(cell => cell.trim() !== '').map(cell => cell.trim());
  const rows = lines.slice(3).map(line => 
    line.split('|').filter(cell => cell.trim() !== '').map(cell => cell.trim())
  );

  return { headers, rows };
};

// Component to render a table
const TableComponent = ({ data }) => (
  <Table>
    <TableHead>
      <TableRow>
        {data.headers.map((header, index) => (
          <TableCell key={index}>{header}</TableCell>
        ))}
      </TableRow>
    </TableHead>
    <TableBody>
      {data.rows.map((row, rowIndex) => (
        <TableRow key={rowIndex}>
          {row.map((cell, cellIndex) => (
            <TableCell key={cellIndex}>{cell}</TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export default function ChatScreen({ selectedChat, onNewChat, onUpdateChat, onToggleHistory, allChats }) {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const currentChat = allChats.find(chat => chat.uuid === selectedChat) || { messages: [] };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentChat.messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input, timestamp: new Date().toISOString() };

    if (!selectedChat) {
      onNewChat();
    }

    onUpdateChat(selectedChat, userMessage, currentChat.messages.length === 0); // Check if it's the first message

    setInput('');
    setLoading(true);
    try {
      const response = await axios.post('https://awschatbotapi.onrender.com/chatbot', { prompt: input ,id:"3e69745a-295b-4a52-ae28-1922841ca09b"});
      console.log(response)
      const botMessage = { sender: 'bot', text: response.data.response,  type: response.data.type, datapoints: response.data.datapoints, timestamp: new Date().toISOString() };
      onUpdateChat(selectedChat, botMessage);
    } catch (error) {
      console.error('Error fetching response:', error);
      const errorMessage = { sender: 'bot', text: 'Sorry, I encountered an error. Please try again.', timestamp: new Date().toISOString() };
      onUpdateChat(selectedChat, errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const renderMessage = (message) => {
    
    
    const isUser = message.sender === 'user';
  
    if (message.type === 'tabular' ) {
      const tableData = parseTableData(message.text);
      return (
        <Box
          sx={{
            boxShadow: 3, // Add shadow to the Box
            borderRadius: 2, // Optional: Add rounded corners
            bgcolor: 'white', // White background
            p: 2, // Add some padding inside the popup
            mt: 1, // Add some margin at the top
            maxWidth: '100%', // Limit the width of the popup (adjust as needed)
            alignSelf: isUser ? 'flex-end' : 'flex-start', // Align to right for user
            overflow:'auto',
            fontFamily: 'Poppins'
          }}
        >
          <TableComponent data={tableData} />
        </Box>
      );
    } else if(message.type === 'datapoints') {
     
      return (
      <Box
      sx={{
        boxShadow: 3, // Add shadow to the Box
        borderRadius: 2, // Optional: Add rounded corners
        bgcolor: 'white', // White background
        p: 2, // Add some padding inside the popup
        mt: 1, // Add some margin at the top
        alignSelf: isUser ? 'flex-end' : 'flex-start', // Align to right for user
        overflow:'auto',
        fontFamily: 'Poppins'
      }}
      >
      <Typography>{message.response}</Typography>
      <LineGraph datapoints={message.datapoints} width="100%"  />
      </Box>
      );} else {
      return (
        <Box 
          display="flex" 
          alignItems="center" // Align icon and text
          justifyContent={isUser ? 'flex-end' : 'flex-start'}
        sx={{
          fontFamily: 'Poppins', // Apply Poppins font family
          fontSize: '16px', // Set font size (optional)
          fontWeight: '400', // Set font weight (optional)
          lineHeight: '1.5', // Set line height (optional)
          textAlign: 'left', // Set text alignment (optional)
        }}
        >
          {!isUser && ( // Show icon at the end for bot messages
            <img src={Group} alt="Message" style={{ width: '20px', height: '20px', marginRight: '8px' }} />
          )}
          <Typography sx={{ color: 'black' }}>{message.text}</Typography>
          {isUser && ( // Show icon at the start for user messages
            <img src={Group} alt="Message" style={{ width: '20px', height: '20px', marginLeft: '8px' }} />
          )}
        </Box>
      );
    }
  };

  return (
    <Box display="flex" flexDirection="column" height="100%" style={{
      background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.8) 0%, rgba(231, 228, 254, 0.4) 100%)'
    }}>
      {/* Chat header */}
      <Box p={2} borderBottom={1} borderColor="divider" display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center" gap={2}>
          <Box width={32} height={32} borderRadius="50%" display="flex" alignItems="center" justifyContent="center">
            <img src={BotImage} alt="Bot" style={{ width: '100%', height: '100%' }} />
          </Box>
          <Typography variant="h6">Chatbot</Typography>
        </Box>
        <Button variant="outlined" endIcon={<ExpandMoreIcon />}>
          Cloud Service
        </Button>
      </Box>

      {/* Chat messages */}
      <Box flex={1} p={2} overflow="auto">
        {currentChat.messages.map((message, index) => (
          <Box 
            key={index} 
            mb={2} 
            display="flex" 
            justifyContent={message.sender === 'user' ? 'flex-end' : 'flex-start'}
          >
            <Box
              
              color={message.sender === 'user' ? 'black' : 'black'}
              p={2}
              borderRadius={2}
              maxWidth="90%"
              textAlign="left" // Ensure text is always left-aligned
              
            >
              {renderMessage(message)}
            </Box>
          </Box>
        ))}
        {loading && <CircularProgress />}
        <div ref={messagesEndRef} />
      </Box>

      {/* Chat input */}
      <Box p={2} borderTop={1} borderColor="divider" display="flex" justifyContent="center">
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <TextField
            fullWidth
            placeholder="Ask a question"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            InputProps={{
              
              startAdornment: (
                <InputAdornment position="start">
                  <img src={BotImage} alt="Bot Icon" style={{ width: '24px', height: '24px' }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton type="submit" color="primary" sx={{ transform: 'rotate(325deg)' }}>
                    <SendIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              borderRadius: '25px',
              '& .MuiOutlinedInput-root': {
                borderRadius: '25px',
              },
              '& .MuiInputBase-input::placeholder': {
                color: '#000000', // Darker placeholder color
              },
            }}
          />
        </form>
      </Box>
    </Box>
  );
}