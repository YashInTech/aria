import { Box, Avatar, Typography } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import jarvis from '../../assets/jarvis.png';

const ChatItem = ({
  content,
  role,
}: {
  content: string;
  role: 'user' | 'assistant';
}) => {
  const auth = useAuth();
  return role === 'assistant' ? (
    <Box sx={{ display: 'flex', p: 2, gap: 2 }}>
      <Avatar sx={{ ml: '0' }}>
        <img src={jarvis} alt='aria' />
      </Avatar>
      <Box>
        <Typography fontSize={'20px'}>{content}</Typography>
      </Box>
    </Box>
  ) : (
    <Box sx={{ display: 'flex', p: 2, bgcolor: '#4A5BFF', gap: 2 }}>
      <Avatar sx={{ ml: '0', bgcolor: 'black', color: 'white' }}>
        {auth?.user?.name[0]}
        {auth?.user?.name.split(' ')[1][0]}
      </Avatar>
      <Box>
        <Typography fontSize={'20px'}>{content}</Typography>
      </Box>
    </Box>
  );
};

export default ChatItem;
