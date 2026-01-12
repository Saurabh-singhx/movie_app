import Button from '@mui/material/Button'
import React, { useEffect, useState } from 'react'
import { useAuthStore } from '../store/authStore'
import SearchIcon from '@mui/icons-material/Search';
import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/userStore';


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

function Navbar() {
    const navigate = useNavigate();
    const { logout } = useAuthStore();
    const { clearMovieData, searchMovies } = useUserStore()
    const [searchInput, setSearchInput] = useState("")
    const handleLogout = async () => {

        clearMovieData();
        await logout();

    }

    useEffect(() => {
        const timer = setTimeout(() => {
            searchMovies(searchInput);
        }, 400);

        return () => clearTimeout(timer);
    }, [searchInput]);


    const handleSearch = (e) => {
        setSearchInput(e.target.value)
    }

    return (
        <div className='flex justify-between w-full items-center min-h-20 border-b-2 shadow-blue-100 shadow border-b-indigo-100 px-2 gap-2'>
            <div
                onClick={() => navigate("/")}
                className="cursor-pointer font-bold sm:hidden ">
                Movies
            </div>

            <div
                onClick={() => navigate("/")}
                className="cursor-pointer font-bold hidden sm:flex">
                IMDb Top 250 movies
            </div>


            <div className='flex items-center justify-center gap-4'>


                <div className='bg-blue-200 rounded-2xl'>
                    <Search

                    >
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search Movies…"
                            inputProps={{ 'aria-label': 'search' }}
                            value={searchInput}
                            onChange={handleSearch}
                        />


                    </Search>
                </div>
                <Button

                    onClick={handleLogout}
                    variant="outlined"
                    type="submit"
                    className=" font-bold!"
                >
                    Logout
                </Button>
            </div>

        </div>
    )
}

export default Navbar