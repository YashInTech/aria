import { useRef, useState, useEffect } from 'react';
import { Box, Avatar, Typography, Button, IconButton } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { red } from '@mui/material/colors';
import ChatItem from '../components/chat/ChatItem';
import { IoMdSend } from 'react-icons/io';
import { sendChatRequest } from '../helpers/api-communicator';
import { useNavigate } from 'react-router-dom';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

// Helper function to safely extract initials
const getInitials = (name: string | undefined): string => {
  if (!name) return '';
  const parts = name.split(' ').filter((part) => part.length > 0);

  if (parts.length === 0) return '';

  const firstInitial = parts[0][0];
  const secondInitial = parts.length > 1 ? parts[1][0] : '';

  return `${firstInitial}${secondInitial}`.toUpperCase();
};

const Chat = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const auth = useAuth();
  const navigate = useNavigate();
  const [chatMessages, setChatMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (auth?.isLoggedIn === false) {
      navigate('/login');
    }
  }, [auth?.isLoggedIn, navigate]);

  // Show loading while auth state is being determined
  if (auth?.isLoggedIn === undefined) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }}
      >
        <Typography
          sx={{
            color: 'white',
            fontSize: '24px',
            fontWeight: 600,
          }}
        >
          Loading...
        </Typography>
      </Box>
    );
  }

  const handleSubmit = async () => {
    const content = inputRef.current?.value as string;
    if (!content) return; // Prevent sending empty messages

    if (inputRef && inputRef.current) {
      inputRef.current.value = '';
    }
    const newMessage: Message = { role: 'user', content };
    setChatMessages((prev) => [...prev, newMessage]);
    const chatData = await sendChatRequest(content);
    setChatMessages([...chatData.chats]);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flex: 1,
        width: '100%',
        height: '100%',
        mt: 3,
        gap: 3,
      }}
    >
      <Box
        sx={{
          display: { md: 'flex', xs: 'none', sm: 'none' },
          flex: 0.2,
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            height: '70vh',
            bgcolor: '#232323',
            borderRadius: 5,
            flexDirection: 'column',
            mx: 3,
          }}
        >
          <Avatar
            sx={{
              mx: 'auto',
              my: 2,
              bgcolor: 'white',
              color: 'black',
              fontWeight: 700,
            }}
          >
            {/* FIX APPLIED HERE */}
            {getInitials(auth?.user?.name)}
          </Avatar>
          <Typography
            sx={{
              mx: 'auto',
              fontFamily: 'work sans',
              px: 2,
            }}
          >
            Hello, {auth?.user?.name ? auth.user.name.split(' ')[0] : 'User'}!
            <br />I am ARIA, your personal AI Assistant.
          </Typography>
          <Typography sx={{ mx: 'auto', fontFamily: 'work sans', my: 3, p: 3 }}>
            You can ask me anything, and I will do my best to help you. I am
            here to assist you with anything you need.
          </Typography>
          <Button
            sx={{
              width: '200px',
              my: 'auto',
              color: 'white',
              fontWeight: '700',
              borderRadius: 3,
              mx: 'auto',
              bgcolor: red[300],
              ':hover': { bgcolor: red.A400 },
            }}
          >
            Clear Conversation
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flex: { md: 0.8, xs: 1, sm: 1 },
          flexDirection: 'column',
          px: 3,
        }}
      >
        <Typography
          sx={{
            fontSize: '40px',
            color: 'white',
            mb: 2,
            mx: 'auto',
          }}
        >
          Chat with ARIA
        </Typography>
        <Box
          sx={{
            width: '100%',
            height: '60vh',
            borderRadius: 3,
            mx: 'auto',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'scroll',
            overflowX: 'hidden',
            overflowY: 'auto',
            scrollBehavior: 'smooth',
          }}
        >
          {chatMessages.map((chat, index) => (
            <ChatItem content={chat.content} role={chat.role} key={index} />
          ))}
        </Box>
        <div
          style={{
            width: '100%',
            padding: '20px',
            borderRadius: 8,
            backgroundColor: '#3A3A4D',
            display: 'flex',
            margin: 'auto',
          }}
        >
          <input
            ref={inputRef}
            type='text'
            placeholder='Type your message...'
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSubmit();
              }
            }}
            style={{
              width: '100%',
              backgroundColor: 'transparent',
              padding: '10px',
              border: 'none',
              outline: 'none',
              color: 'white',
              fontSize: '20px',
            }}
          />
          <IconButton
            onClick={handleSubmit}
            sx={{ ml: 'auto', color: 'white' }}
          >
            <IoMdSend />
          </IconButton>
        </div>
      </Box>
    </Box>
  );
};

export default Chat;
