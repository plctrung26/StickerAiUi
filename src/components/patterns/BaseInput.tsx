import React, { type ReactElement } from 'react';
import { TextField, InputAdornment, type SxProps, type Theme } from '@mui/material';

interface BaseInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    variant?: 'filled' | 'outlined' | 'standard';
    size?: 'small' | 'medium';
    fullWidth?: boolean;
    multiline?: boolean;
    rows?: number;
    disabled?: boolean;
    error?: boolean;
    helperText?: string;
    customSx?: SxProps<Theme>;
}

const BaseInput: React.FC<BaseInputProps> = ({
    value,
    onChange,
    placeholder = '',
    startIcon,
    endIcon,
    variant = 'outlined',
    size = 'medium',
    fullWidth = true,
    multiline = false,
    rows,
    disabled = false,
    error = false,
    helperText,
    customSx = {}
}) => {
    const getInputStyles = () => {
        return {
            borderRadius: '16px',
            background: variant === 'filled' ? '#f8fafc' : 'transparent',
            '& .MuiOutlinedInput-notchedOutline': {
                border: variant === 'filled' ? 'none' : '1px solid #e2e8f0',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
                border: variant === 'filled' ? '1px solid #e2e8f0' : '1px solid #cbd5e1',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                border: '2px solid #667eea',
            },
            '&.Mui-error .MuiOutlinedInput-notchedOutline': {
                border: '2px solid #ef4444',
            },
        };
    };

    return (
        <TextField
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            variant={variant}
            size={size}
            fullWidth={fullWidth}
            multiline={multiline}
            rows={rows}
            disabled={disabled}
            error={error}
            helperText={helperText}
            InputProps={{
                startAdornment: startIcon && (
                    <InputAdornment position="start">
                        {startIcon}
                    </InputAdornment>
                ),
                endAdornment: endIcon && (
                    <InputAdornment position="end">
                        {endIcon}
                    </InputAdornment>
                ),
                sx: getInputStyles()
            }}
            sx={customSx}
        />
    );
};

export default BaseInput;
