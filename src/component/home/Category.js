"use client";
import { Box, Button, Chip, Stack, Typography } from '@mui/material'
import React from 'react'

export const Chips = () => {
    const handleClick = () => {
        console.info('You clicked the Chip.');
    };

    return (
        <Stack direction="row" spacing={1}>
            <Chip label="lable 1" onClick={handleClick} />
            <Chip label="lable 2" variant="outlined" onClick={handleClick} />
            <Chip label="lable 3" onClick={handleClick} />
            <Chip label="lable 4" variant="outlined" onClick={handleClick} />
            <Chip label="lable 5" onClick={handleClick} />
            <Chip label="lable 6" variant="outlined" onClick={handleClick} />
            <Chip label="lable 1" onClick={handleClick} />
            <Chip label="lable 2" variant="outlined" onClick={handleClick} />
            <Chip label="lable 3" onClick={handleClick} />
            <Chip label="lable 4" variant="outlined" onClick={handleClick} />
            <Chip label="lable 5" onClick={handleClick} />
            <Chip label="lable 6" variant="outlined" onClick={handleClick} />
        </Stack>
    );
}
const Category = () => {


    return (
        <main className='w-full'>
            <Box flex className='flex justify-between items-center'>
                <Typography>Category</Typography>
                <Button>View All</Button>

            </Box>
            <Box className='width-[full] overflow-y-hidden' sx={{
                overflowY: 'scroll',
                "&::-webkit-scrollbar": {
                    display: 'none',
                },
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
            }}>
                <Chips />
            </Box>
        </main>
    )
}

export default Category