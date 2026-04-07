"use client";
import { chipData } from '@/data/dummyData2';
import { Box, Button, Chip, Stack, Typography } from '@mui/material'
import React from 'react'

export const Chips = () => {
    const handleClick = (item) => {
        console.info(`clicked ${item?.name}`); 
    };
    const chipsData = chipData?.map((item, index) => {
        return (
            <>
                <Chip key={item.id} label={`${item.name} ${item.icon}`} onClick={() => { handleClick(item) }} variant="outlined" />
            </>
        )


    })
    return (
        <Stack direction="row" spacing={1}>
            {chipsData && chipsData.length ? chipsData : <Typography>No category found</Typography>}
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