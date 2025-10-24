import React from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import jarvis from '../assets/jarvis.png';

function Home() {
  const navigate = useNavigate();
  const auth = useAuth();

  const features = [
    {
      title: 'AI-Powered Conversations',
      description:
        'Experience natural and intelligent conversations with our advanced AI assistant.',
      icon: '🤖',
    },
    {
      title: 'Secure Authentication',
      description:
        'Your data is protected with enterprise-grade security and encryption.',
      icon: '🔒',
    },
    {
      title: 'Persistent Chat History',
      description:
        'Never lose your conversations with our cloud-based chat storage.',
      icon: '💾',
    },
    {
      title: 'Modern Interface',
      description:
        'Enjoy a beautiful, responsive design that works on all devices.',
      icon: '✨',
    },
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Hero Section */}
      <Container maxWidth='lg' sx={{ flex: 1, py: 8 }}>
        <Grid container spacing={6} alignItems='center'>
          <Grid item xs={12} md={6}>
            <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
              <Typography
                variant='h2'
                sx={{
                  fontWeight: 700,
                  mb: 3,
                  background: 'linear-gradient(45deg, #fff, #f0f0f0)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                }}
              >
                Welcome to A.R.I.A.
              </Typography>
              <Typography
                variant='h5'
                sx={{
                  color: 'rgba(255,255,255,0.9)',
                  mb: 4,
                  lineHeight: 1.6,
                }}
              >
                Your Personal AI Assistant for Intelligent Conversations
              </Typography>
              <Typography
                variant='body1'
                sx={{
                  color: 'rgba(255,255,255,0.8)',
                  mb: 4,
                  fontSize: '18px',
                  lineHeight: 1.8,
                }}
              >
                Experience the future of AI interaction with A.R.I.A. - Advanced
                Response & Interaction Assistant. Get intelligent responses,
                personalized assistance, and seamless conversations.
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  flexWrap: 'wrap',
                  justifyContent: { xs: 'center', md: 'flex-start' },
                }}
              >
                {auth?.isLoggedIn ? (
                  <Button
                    variant='contained'
                    size='large'
                    onClick={() => navigate('/chat')}
                    sx={{
                      background: 'linear-gradient(45deg, #4A5BFF, #6B73FF)',
                      px: 4,
                      py: 1.5,
                      borderRadius: 3,
                      fontSize: '16px',
                      fontWeight: 600,
                      textTransform: 'none',
                      boxShadow: '0 8px 16px rgba(74, 91, 255, 0.3)',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #5C5CFF, #7B82FF)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 12px 20px rgba(74, 91, 255, 0.4)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    Start Chatting
                  </Button>
                ) : (
                  <>
                    <Button
                      variant='contained'
                      size='large'
                      onClick={() => navigate('/login')}
                      sx={{
                        background: 'linear-gradient(45deg, #4A5BFF, #6B73FF)',
                        px: 4,
                        py: 1.5,
                        borderRadius: 3,
                        fontSize: '16px',
                        fontWeight: 600,
                        textTransform: 'none',
                        boxShadow: '0 8px 16px rgba(74, 91, 255, 0.3)',
                        '&:hover': {
                          background:
                            'linear-gradient(45deg, #5C5CFF, #7B82FF)',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 12px 20px rgba(74, 91, 255, 0.4)',
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      Sign In
                    </Button>
                    <Button
                      variant='outlined'
                      size='large'
                      onClick={() => navigate('/signup')}
                      sx={{
                        borderColor: 'rgba(255,255,255,0.5)',
                        color: 'white',
                        px: 4,
                        py: 1.5,
                        borderRadius: 3,
                        fontSize: '16px',
                        fontWeight: 600,
                        textTransform: 'none',
                        backdropFilter: 'blur(10px)',
                        '&:hover': {
                          borderColor: 'white',
                          background: 'rgba(255,255,255,0.1)',
                          transform: 'translateY(-2px)',
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      Sign Up
                    </Button>
                  </>
                )}
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <img
                src={jarvis}
                alt='A.R.I.A. Assistant'
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.3))',
                }}
              />
            </Box>
          </Grid>
        </Grid>

        {/* Features Section */}
        <Box sx={{ mt: 12 }}>
          <Typography
            variant='h3'
            textAlign='center'
            sx={{
              fontWeight: 700,
              mb: 6,
              background: 'linear-gradient(45deg, #fff, #f0f0f0)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Why Choose A.R.I.A.?
          </Typography>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    background: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: 4,
                    boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 30px 60px rgba(0,0,0,0.3)',
                    },
                  }}
                >
                  <CardContent sx={{ textAlign: 'center', p: 4 }}>
                    <Typography variant='h2' sx={{ mb: 2, fontSize: '3rem' }}>
                      {feature.icon}
                    </Typography>
                    <Typography
                      variant='h6'
                      sx={{
                        color: 'white',
                        fontWeight: 600,
                        mb: 2,
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography
                      variant='body2'
                      sx={{
                        color: 'rgba(255,255,255,0.8)',
                        lineHeight: 1.6,
                      }}
                    >
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

export default Home;
