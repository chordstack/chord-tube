//@ts-nocheck
import { useState, useRef } from 'react';
import {
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Box,
  Chip,
  IconButton
} from '@mui/material';
import {
  Check as CheckIcon,
  EditOutlined as EditIcon
} from '@mui/icons-material';

const StatusDropdown = ({
  options = [],
  selectedValue = null,
  onSelect,
  placeholder = 'Not selected',
  chipSx = {}
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const chipRef = useRef(null);

  const handleClick = (event) => {
    setAnchorEl(chipRef.current);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (value) => {
    if (onSelect) onSelect(value);
    handleClose();
  };

  const handleClear = () => {
    if (onSelect) onSelect(null);
    handleClose();
  };

  const selectedLabel = selectedValue
    ? options.find(o => o.value === selectedValue)?.label
    : placeholder;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Chip
        ref={chipRef}
        label={
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {!selectedValue && (
              <Box
                sx={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: '#9e9e9e',
                  mr: 1
                }}
              />
            )}
            {selectedLabel}
          </Box>
        }
        onClick={handleClick}
        sx={{
          borderRadius: '16px',
          backgroundColor: '#f5f5f5',
          px: 2,
          py: 1,
          fontSize: '14px',
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: '#eeeeee'
          },
          ...chipSx
        }}
      />
      
      <IconButton
        size="small"
        onClick={handleClick}
        sx={{ 
          p: 0.5,
          '&:hover': { 
            backgroundColor: 'transparent' 
          }
        }}
      >
        <EditIcon fontSize="small" />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        PaperProps={{
          sx: {
            width: '160px',
            mt: '4px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            border: '1px solid #e0e0e0',
            borderRadius: '4px',
            py: 0
          }
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option.value}
            onClick={() => handleSelect(option.value)}
            sx={{
              py: '6px',
              px: 2,
              fontSize: '14px',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)'
              }
            }}
          >
            <ListItemText sx={{ ml: '-8px' }}>{option.label}</ListItemText>
            <ListItemIcon sx={{ minWidth: '24px' }}>
              {selectedValue === option.value && (
                <CheckIcon sx={{ fontSize: '18px' }} />
              )}
            </ListItemIcon>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default StatusDropdown;

     <StatusDropdown
        options={[
          { value: 'checked_in', label: 'Checked In' },
          { value: 'checked_out', label: 'Checked Out' },
        ]}
        selectedValue={checkInStatus}
        onSelect={setCheckInStatus}
        placeholder="Not Selected"
      />