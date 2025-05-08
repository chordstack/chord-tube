// components/CustomButton.tsx
import MuiButton from '@mui/material/Button';
import type { ReactNode } from 'react';

type Props = {
    children: ReactNode;
    onClick?: () => void;
    variant?: 'contained' | 'outlined' | 'text';
    color?: 'primary' | 'secondary' | 'error' | 'success';
};

export default function CustomButton({ children, variant = 'contained', ...rest }: Props) {
    return (
        <MuiButton
            {...rest}
            variant={variant === 'contained' ? 'contained' : 'outlined'}
            sx={{
                borderRadius: '8px',
                padding: '8px 20px',
                ...(variant === 'outlined' && {
                    borderWidth: '2px',
                    borderColor: 'secondary',
                    color: '#fff',
                    '&:hover': {
                        borderColor: 'secondary',
                    },
                }),
                ...(variant === 'contained' && {
                    backgroundColor: '#053a9c',
                    color: '#fff',
                    '&:hover': {
                        backgroundColor: '#002f7a',
                    },
                }),
                ...(variant === 'text' && {
                    color: '#secondary',
                    border: "none",
                    '&:hover': {
                        backgroundColor: 'bg-gray-800',
                    },
                }),

            }}
        >
            {children}
        </MuiButton >
    );
}
