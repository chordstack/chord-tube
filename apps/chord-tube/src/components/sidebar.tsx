import { useState } from 'react';
import {
    Box,
    Drawer,
    Button,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import SportsBaseballIcon from '@mui/icons-material/SportsBaseball';
import TvIcon from '@mui/icons-material/Tv';
import MemoryIcon from '@mui/icons-material/Memory';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import { useCategoryIdStore, useSearchStore } from '../stores/useVideoStore';
import logo from '../assets/images/logo.webp';
import { categoryMap } from '../constants/categoryMap';
import { useNavigate } from 'react-router-dom';
import { Build, CardTravel, EmojiEmotions, MovieCreation, Pets, School, VolunteerActivism } from '@mui/icons-material';

const menu = [
    { id: 1, name: 'Home', categoryID: 0, icon: <HomeOutlinedIcon /> },
    { id: 2, name: 'Cars & Vehicles', categoryID: 2, icon: <DirectionsCarIcon /> },
    { id: 3, name: 'Comedy', categoryID: 23, icon: <EmojiEmotions /> },
    { id: 4, name: 'Education', categoryID: 27, icon: <School /> },
    { id: 5, name: 'Entertainment', categoryID: 24, icon: <TvIcon /> },
    { id: 6, name: 'Film & Animation', categoryID: 1, icon: <MovieCreation /> },
    { id: 7, name: 'Gaming', categoryID: 20, icon: <SportsEsportsIcon /> },
    { id: 8, name: 'How-to & Style', categoryID: 26, icon: <Build /> },
    { id: 9, name: 'Music', categoryID: 10, icon: <MusicNoteIcon /> },
    { id: 10, name: 'News & Politics', categoryID: 25, icon: <NewspaperIcon /> },
    { id: 11, name: 'Non-profits & Activism', categoryID: 29, icon: <VolunteerActivism /> },
    { id: 12, name: 'People & Blogs', categoryID: 22, icon: <RssFeedIcon /> },
    { id: 13, name: 'Pets & Animals', categoryID: 15, icon: <Pets /> },
    { id: 14, name: 'Science & Technology', categoryID: 28, icon: <MemoryIcon /> },
    { id: 15, name: 'Sports', categoryID: 17, icon: <SportsBaseballIcon /> },
    { id: 16, name: 'Travel & Events', categoryID: 19, icon: <CardTravel /> }
];


export default function Sidebar() {
    const [open, setOpen] = useState(false);
    const setCategoryId = useCategoryIdStore((state) => state.setCategoryId);
    const categoryId = useCategoryIdStore((state) => state.categoryId);
    const setInput = useSearchStore((state) => state.setInput);
    const submitQuery = useSearchStore((state) => state.submitQuery);
    const name = categoryMap[categoryId];
    const navigate = useNavigate();

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const handleSelect = (categoryID: number) => {
        // navigate(`/`);
        setInput('');
        submitQuery();
        navigate(`/${name}`);
        setCategoryId(categoryID);
        setOpen(false);
    };

    const renderList = () => (
        <List>
            <div className=" flex items-center">
                <Button onClick={toggleDrawer(true)} className='!w-[20px]' variant="text">
                    <MenuIcon />
                </Button>
                <Button onClick={() => window.location.href = "/"} variant="text" className=" md:w-[130px] w-[120px] hover:!bg-transparent hover:scale-[102%] !transition-all  ">
                    <img src={logo} alt="" />
                </Button>
            </div>
            {menu.map((item) => (
                <ListItem key={item.id} disablePadding>
                    <ListItemButton className={`${categoryId === item.categoryID && '!bg-gray-800'}`} onClick={() => handleSelect(item.categoryID)}>
                        <ListItemIcon className='!text-white'>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.name} />
                    </ListItemButton>
                </ListItem>
            ))
            }
        </List >
    );

    return (
        <div>
            <Button onClick={toggleDrawer(true)} className='!w-[20px]' variant="text">
                <MenuIcon />
            </Button>
            <Drawer open={open} className='bg-[rgba(0,0,0,0.3)]' onClose={toggleDrawer(false)}>
                <Box
                    sx={{ width: 250 }}
                    className="bg-gray-950 text-white h-full"
                    role="presentation"
                    onClick={toggleDrawer(false)}
                >
                    {renderList()}
                </Box>
            </Drawer>
        </div>
    );
}
