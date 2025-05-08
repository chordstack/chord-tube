import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useState } from 'react';

export default function NavBarbuttonGroup() {
    const [alignment, setAlignment] = useState<string | null>('left');

    const handleAlignment = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string | null,
    ) => {
        if (newAlignment !== null) {
            setAlignment(newAlignment);
        }
    };

    const baseStyles = `!text-sm !font-medium !py-1 !border !border-gray-100 px-4`;

    return (
        <ToggleButtonGroup
            sx={{ gap: 2 }}
            value={alignment}
            exclusive
            onChange={handleAlignment}
            aria-label="text alignment"
        >
            <ToggleButton
                value="left"
                aria-label="left aligned"
                className={`${baseStyles} ${alignment === 'left' ? '!bg-gray-100 !text-black' : '!text-white'}`}
            >
                Top Lists
            </ToggleButton>
            <ToggleButton
                value="center"
                aria-label="centered"
                className={`${baseStyles} ${alignment === 'center' ? '!bg-gray-100 !text-black' : '!text-white'}`}
            >
                Music
            </ToggleButton>
            <ToggleButton
                value="right"
                aria-label="right aligned"
                className={`${baseStyles} ${alignment === 'right' ? '!bg-gray-100 !text-black' : '!text-white'}`}
            >
                Blog
            </ToggleButton>
        </ToggleButtonGroup>
    );
}
