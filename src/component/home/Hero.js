"use client";
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import './Hero.css';

const images = [
  '/HeroSectionImg.jpg',
  '/file.svg',
  '/globe.svg',
  '/next.svg',
  '/vercel.svg',
  '/window.svg',
];

const Hero = () => {
  const carouselRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  // Mouse events for drag-to-scroll
  const onMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX - carouselRef.current.offsetLeft;
    scrollLeft.current = carouselRef.current.scrollLeft;
    document.body.style.cursor = 'grabbing';
  };
  const onMouseLeave = () => {
    isDragging.current = false;
    document.body.style.cursor = '';
  };
  const onMouseUp = () => {
    isDragging.current = false;
    document.body.style.cursor = '';
  };
  const onMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.2; // scroll-fast
    carouselRef.current.scrollLeft = scrollLeft.current - walk;
  };

  // Track active slide for pagination dots
  const onScroll = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, clientWidth } = carouselRef.current;
    const idx = Math.round(scrollLeft / (clientWidth * 0.92));
    setActiveIndex(idx);
  };

  // Arrow button handlers
  const scrollByBanner = (direction) => {
    if (!carouselRef.current) return;
    const bannerWidth = 540 + 32; // image width + gap
    const scrollTo = direction === 'left'
      ? carouselRef.current.scrollLeft - bannerWidth
      : carouselRef.current.scrollLeft + bannerWidth;
    carouselRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
  };

  return (
    <div className="hero-carousel-container">
      <button
        className="carousel-arrow left"
        onClick={() => scrollByBanner('left')}
        aria-label="Scroll left"
      >
        &#8249;
      </button>
      <div
        className="hero-carousel drag-scroll"
        ref={carouselRef}
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
        onScroll={onScroll}
        style={{ cursor: 'grab' }}
      >
        {images.map((src, idx) => (
          <div key={idx} className="carousel-image-wrapper banner-style">
            <Image
              src={src}
              alt={`Hero image ${idx + 1}`}
              width={500}
              height={280}
              className="carousel-image"
              priority={idx === 0}
            />
          </div>
        ))}
      </div>
      <button
        className="carousel-arrow right"
        onClick={() => scrollByBanner('right')}
        aria-label="Scroll right"
      >
        &#8250;
      </button>
      <div className="carousel-pagination">
        {images.map((_, idx) => (
          <span
            key={idx}
            className={`carousel-dot${activeIndex === idx ? ' active' : ''}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;