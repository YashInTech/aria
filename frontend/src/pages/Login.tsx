import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import jarvis from '../assets/jarvis.png';
import CustomizedInput from '../components/shared/CustomizedInput';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Login() {
  const auth = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    try {
      toast.loading('Signing in...', { id: 'login' });
      await auth?.login(email, password);
      toast.success('Login successful!', { id: 'login' });
      navigate('/chat');
    } catch (error) {
      console.error(error);
      toast.error('Login failed', { id: 'login' });
    }
  };
  return (
    <Box width={'100%'} height={'100px'} display='flex' flex={1}>
      <Box padding={8} mt={8} display={{ md: 'flex', sm: 'none', xs: 'none' }}>
        <img src={jarvis} alt='jarvis' width={'400px'} height={'400px'} />
      </Box>
      <Box
        display={'flex'}
        flex={{ xs: 1, md: 0.5 }}
        justifyContent={'center'}
        alignItems={'center'}
        ml={'auto'}
        mt={16}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            margin: 'auto',
            padding: '30px',
            boxShadow: '10px 10px 20px #000',
            borderRadius: '10px',
            border: 'none',
            backgroundColor: '#232323',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Typography
              variant='h4'
              textAlign='center'
              padding={2}
              fontWeight={600}
            >
              Login
            </Typography>
            <CustomizedInput type='email' name='email' label='Email' />
            <CustomizedInput type='password' name='password' label='Password' />
            <Button
              type='submit'
              sx={{
                px: 2,
                py: 1,
                mt: 2,
                width: '400px',
                borderRadius: 2,
                bgcolor: '#4A5BFF',
                color: '#FFFFFF',
                ':hover': {
                  bgcolor: '#5C5CFF',
                },
              }}
            >
              Login
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
}

export default Login;
