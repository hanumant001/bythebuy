
"use client";
import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react'

const ProductCard = ({ product }) => {
    return (
        <Card style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}} className="p-1 rounded-xl shadow-md flex-col justify-center items-center ">
            <div className="relative w-[250px] h-[250px] flex-col justify-center items-center">
                <Image src={product?.thumbnail || ''}
                    alt="HeroSection"
                    fill
                    className='rounded-[10px] object-cover'
                />
            </div>

            <Box className='w-full p-2 flex-col justify-center items-center'>
                <Typography variant="h6">{product.title}</Typography>
                <Typography color="text.secondary">₹ {product.price}</Typography>

                <Button variant="contained" fullWidth sx={{ mt: 2 }}>
                    Add to Cart
                </Button>
            </Box>
        </Card>
    )
}

export default ProductCard