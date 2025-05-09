import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useCategoryIdStore } from '../stores/useVideoStore';

export default function NavBarbuttonGroup() {
  const categoryId = useCategoryIdStore((state) => state.categoryId);
  const setCategoryId = useCategoryIdStore((state) => state.setCategoryId);

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newCategoryId: string,
  ) => {
    if (newCategoryId !== null) {
      setCategoryId(Number(newCategoryId));
    }
  };

  const buttons = [
    { label: 'Top Lists', value: '0' },
    { label: 'Music', value: '10' },
    { label: 'Blog', value: '22' },
  ];

  return (
    <ToggleButtonGroup
      color="primary"
      value={String(categoryId)}
      exclusive
      onChange={handleChange}
      aria-label="Category"
    >
      {buttons.map(({ label, value }) => (
        <ToggleButton
          key={value}
          value={value}
          className={`!text-white ${String(categoryId) === value ? 'bg-gray-700' : ''}`}
        >
          {label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
