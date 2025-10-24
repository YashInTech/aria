import { Box, Avatar, Typography } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import jarvis from '../../assets/jarvis.png';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkCold } from 'react-syntax-highlighter/dist/esm/styles/prism';

function extractCodeFromString(message: string) {
  if (message.includes('```')) {
    const blocks = message.split('```');
    return blocks;
  }
}

function isCodeBlock(str: string) {
  if (
    str.includes('=') ||
    str.includes(';') ||
    str.includes('[') ||
    str.includes(']') ||
    str.includes('{') ||
    str.includes('}') ||
    str.includes('//')
  ) {
    return true;
  }
  return false;
}

// Helper function to safely extract initials
const getInitials = (name: string | undefined): string => {
  if (!name) return '';
  const parts = name.split(' ').filter((part) => part.length > 0);

  if (parts.length === 0) return '';

  const firstInitial = parts[0][0];
  const secondInitial = parts.length > 1 ? parts[1][0] : '';

  return `${firstInitial}${secondInitial}`.toUpperCase();
};

const ChatItem = ({
  content,
  role,
}: {
  content: string;
  role: 'user' | 'assistant';
}) => {
  const messageBlocks = extractCodeFromString(content);
  const auth = useAuth();

  return role === 'assistant' ? (
    // Assistant's Message
    <Box sx={{ display: 'flex', p: 2, gap: 2 }}>
      <Avatar sx={{ ml: '0' }}>
        <img
          src={jarvis}
          alt='aria'
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      </Avatar>
      <Box>
        {!messageBlocks && (
          <Typography sx={{ fontsize: '20px' }}>{content}</Typography>
        )}
        {messageBlocks &&
          messageBlocks.length &&
          messageBlocks.map((block) =>
            isCodeBlock(block) ? (
              <SyntaxHighlighter style={coldarkCold} language=''>
                {block}
              </SyntaxHighlighter>
            ) : (
              <Typography sx={{ fontsize: '20px' }}>{block}</Typography>
            )
          )}
      </Box>
    </Box>
  ) : (
    // User's Message
    <Box
      sx={{
        display: 'flex',
        p: 2,
        bgcolor: '#4A5BFF',
        gap: 2,
        borderRadius: 2,
      }}
    >
      <Avatar sx={{ ml: '0', bgcolor: 'black', color: 'white' }}>
        {/* FIX APPLIED HERE */}
        {getInitials(auth?.user?.name)}
      </Avatar>
      <Box>
        <Typography fontSize={'20px'} sx={{ color: 'white' }}>
          {content}
        </Typography>
      </Box>
    </Box>
  );
};

export default ChatItem;
