import React, { useEffect } from 'react'
import MovieCard from '../components/MovieCard'
import { useUserStore } from '../store/userStore'
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { MicVocal } from 'lucide-react';

function UserHomePage() {
  const [age, setAge] = React.useState('');
  const { movieData, isLoading, getAllMovies, nextCursor, clearMovieData, getAllMoviesByName, getAllMoviesByRating, getAllMoviesByRelease, getAllMoviesByDuration } = useUserStore();

  useEffect(() => {
    getAllMovies()

  }, [])

  const handleChange = async (e) => {

    setAge(e.target.value)

    clearMovieData()
    if (e.target.value === "Name") {
      await getAllMoviesByName();
    }
    if (e.target.value === "rating") {
      await getAllMoviesByRating();
    }
    if (e.target.value === "release date") {
      await getAllMoviesByRelease();
    }
    if (e.target.value === "duration") {
      await getAllMoviesByDuration();
    }
  }
  const handleSeeMore = async () => {
    await getAllMovies();
  }

  if (isLoading && movieData.length === 0) {
    return (
      <div className='flex h-screen w-screen items-center justify-center'>
        <Box sx={{ display: 'flex', alignItems: "center" }}>
          <CircularProgress size={50} />
        </Box>
      </div>

    );
  }

  return (
    <div className="h-[90vh] flex flex-col">

      {/* Filters */}
      <div className="p-2 w-48">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Filter</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="Filter"
            onChange={handleChange}
          >
            <MenuItem value={"rating"}>rating</MenuItem>
            <MenuItem value={"Name"}>name</MenuItem>
            <MenuItem value={"release date"}>release</MenuItem>
            <MenuItem value={"duration"}>duration</MenuItem>
          </Select>
        </FormControl>
      </div>

      {/* Scrollable movie list */}
      <div className="flex-1 overflow-y-auto p-2">
        <div className="grid lg:grid-cols-2 md:col-2 sm:col-1 gap-2">
          {
            movieData?.map((movie, index) => (
              <MovieCard movie={movie} key={movie._id} index={index + 1} />
            ))
          }
        </div>
      </div>

      {/* Footer button */}
      {
        nextCursor && (<div className="flex justify-center">
          {
            isLoading ? (<Box sx={{ display: 'flex', alignItems: "center" }}>
              <CircularProgress size={30} />
            </Box>) : (<button
              type='button'
              onClick={handleSeeMore}
              className="bg-blue-400 py-2 px-6 rounded-2xl text-white cursor-pointer">
              See more
            </button>)
          }
        </div>)
      }
    </div>
  )
}

export default UserHomePage
