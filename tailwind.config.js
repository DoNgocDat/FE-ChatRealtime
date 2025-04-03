import { colors } from '@mui/material';

/** @type {import('tailwindcss').Config} */
export const content = ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"];
export const theme = {
  extend: {
    colors: {
      color2: '#ffffff',
      color3: '#9fa6b2',
    },

    boxShadow: {
      'right': '4px 0 10px rgba(0, 0, 0, 0.25)',
      'left': '-4px 0 10px rgba(0, 0, 0, 0.25)',
      'bottom': '0 4px 10px rgba(0, 0, 0, 0.25)',
    },

    spacing: {
      '100': '100px',
    },

    backgroundImage: {

    },
    keyframes: {
      wave: {
        '0%': { transform: 'rotate(0deg)' },
        '10%': { transform: 'rotate(14deg)' },
        '20%': { transform: 'rotate(-8deg)' },
        '30%': { transform: 'rotate(14deg)' },
        '40%': { transform: 'rotate(-4deg)' },
        '50%': { transform: 'rotate(10deg)' },
        '60%': { transform: 'rotate(0deg)' },
        '100%': { transform: 'rotate(0deg)' },
      },
    },
    animation: {
      waving: 'wave 1.5s infinite',
    },
    transformOrigin: {
      'hand': '70% 70%',
    },
  },
};
export const plugins = [];
