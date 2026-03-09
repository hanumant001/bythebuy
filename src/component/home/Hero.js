import { Box } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import './Hero.css'
const Hero = () => {

  return (
    <div className='relative flex w-[350px] h-[360px]'>
      <Image src="/HeroSectionImg.jpg" 
      alt="HeroSection"
      fill
      className='rounded-[10px] object-cover'
      />
    </div>
  )
}

export default Hero