import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useCategoryIdStore, useSearchStore } from '../stores/useVideoStore';
import { categoryMap } from '../constants/categoryMap';
import { useNavigate } from 'react-router-dom';

export default function NavBarbuttonGroup() {
  const categoryId = useCategoryIdStore((state) => state.categoryId);
  const setCategoryId = useCategoryIdStore((state) => state.setCategoryId);
  const setInput = useSearchStore((state) => state.setInput);
  const submitQuery = useSearchStore((state) => state.submitQuery);
  const name = categoryMap[categoryId];
  const navigate = useNavigate();

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newCategoryId: string,
  ) => {
    event.preventDefault();
    setInput('');
    submitQuery();
    name && navigate(`/${name}`);

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
          className={`!text-white ${String(categoryId) === value ? 'bg-gray-300' : ''}`}
        >
          {label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
