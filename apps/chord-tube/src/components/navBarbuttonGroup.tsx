import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useCategoryIdStore } from '../stores/useVideoStore';

export default function NavBarbuttonGroup() {
  const categoryId = useCategoryIdStore((state) => state.categoryId);
  const setCategoryId = useCategoryIdStore((state) => state.setCategoryId);

  const [alignment, setAlignment] = React.useState<string>(String(categoryId || 0));

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    if (newAlignment) {
      setAlignment(newAlignment); 
      setCategoryId(Number(newAlignment)); 
    }
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment} 
      exclusive
      onChange={handleChange} 
      aria-label="Category"
    >
      <ToggleButton className='!text-white' value="0">Top Lists</ToggleButton>
      <ToggleButton className='!text-white' value="7">Music</ToggleButton>
      <ToggleButton className='!text-white' value="8">Blog</ToggleButton>
    </ToggleButtonGroup>
  );
}
