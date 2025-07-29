import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <div
      style={{
        display: 'flex',
        marginRight: 'auto',
        alignItems: 'center',
        gap: '8px',
      }}
    >
      <Link to={'/'}>
        <h1 style={{ color: 'white' }}>A.R.I.A</h1>{' '}
      </Link>
      <Typography
        sx={{
          display: { md: 'block', sm: 'none', xs: 'none' },
          mr: 'auto',
          fontWeight: '800',
          textShadow: '2px 2px 2px #000',
        }}
      >
        <span style={{ fontSize: '20px' }}>
          {' '}
          - Artificial Response & Intelligence Assistant
        </span>
      </Typography>
    </div>
  );
};

export default Logo;
