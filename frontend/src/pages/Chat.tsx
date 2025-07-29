import { useRef, useState } from 'react';
import { Box, Avatar, Typography, Button, IconButton } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { red } from '@mui/material/colors';
import ChatItem from '../components/chat/ChatItem';
import { IoMdSend } from 'react-icons/io';
import { sendChatRequest } from '../helpers/api-communicator';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

const Chat = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const auth = useAuth();
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const handleSubmit = async () => {
    const content = inputRef.current?.value as string;
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
            msx: 3,
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
            {auth?.user?.name[0]}
            {auth?.user?.name.split(' ')[1][0]}
          </Avatar>
          <Typography
            sx={{
              ms: 'auto',
              fontFamily: 'work sans',
              px: 2,
            }}
          >
            Hello, {auth?.user?.name.split(' ')[0] || 'User'}!<br />I am ARIA,
            your personal AI Assistant.
          </Typography>
          <Typography sx={{ ms: 'auto', fontFamily: 'work sans', my: 3, p: 3 }}>
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
          {' '}
          <input
            ref={inputRef}
            type='text'
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
