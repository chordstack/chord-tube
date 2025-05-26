import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useRegionCodeStore } from '../stores/useVideoStore';
import {
    useMediaQuery,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Box,
    type SelectChangeEvent,
} from '@mui/material';

const regions = [
    { code: 'GB', label: 'UK', flag: 'https://flagcdn.com/gb.svg' },
    { code: 'US', label: 'US', flag: 'https://flagcdn.com/us.svg' },
    { code: 'JP', label: 'JP', flag: 'https://flagcdn.com/jp.svg' },
    { code: 'KR', label: 'KR', flag: 'https://flagcdn.com/kr.svg' },
    { code: 'SG', label: 'SG', flag: 'https://flagcdn.com/sg.svg' },
];

export default function RegionButtonGroup() {
    const regionCode = useRegionCodeStore((state) => state.regionCode);
    const setRegionCode = useRegionCodeStore((state) => state.setRegionCode);

    const isMobile = useMediaQuery('(max-width:768px)');

    const handleChange = (event: SelectChangeEvent) => {
        setRegionCode(event.target.value);
    };

    return isMobile ? (
        <FormControl fullWidth sx={{ mt: 2, width: 120 }}>
            <InputLabel id="region-select-label" sx={{ color: 'white' }}>
                Region
            </InputLabel>
            <Select
                labelId="region-select-label"
                value={regionCode}
                label="Region"
                onChange={handleChange}
                sx={{
                    color: 'white',
                    borderColor: 'rgba(255,255,255,0.6)',
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(255,255,255,0.3)',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(255,255,255,0.5)',
                    },
                }}
            >
                {regions.map(({ code, label }) => (
                    <MenuItem key={code} value={code}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <img
                                src={`https://flagcdn.com/${code.toLowerCase()}.svg`}
                                alt={label}
                                className="h-5 w-5 rounded-full object-cover"
                            />
                            {label}
                        </Box>
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    ) : (
        <ToggleButtonGroup
            color="primary"
            value={regionCode}
            exclusive
            onChange={(_, newCode) => {
                if (newCode !== null) setRegionCode(newCode);
            }}
            aria-label="Region Code"
            className="flex flex-wrap items-center md:gap-2 gap-1 mt-4"
        >
            <h1 className="font-medium text-lg mr-2">Region :</h1>
            {regions.map(({ code, label, flag }) => (
                <ToggleButton
                    key={code}
                    value={code}
                    className={`!text-white flex items-center gap-2 px-3 py-2 rounded ${regionCode === code ? '!bg-gray-700' : ''
                        }`}
                >
                    <img
                        src={flag}
                        alt={label}
                        className="w-5 h-5 object-cover rounded-sm"
                    />
                    <span>{label}</span>
                </ToggleButton>
            ))}
        </ToggleButtonGroup>
    );
}
