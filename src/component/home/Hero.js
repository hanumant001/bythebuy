"use client";
import { Alert, Box, Button, Chip, Skeleton, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";
import "./Hero.css";

const Hero = () => {
  const router = useRouter();
  const carouselRef = useRef(null);
  const isDragging = useRef(false);
  const hasDragged = useRef(false);
  const pressedProductId = useRef(null);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [heroProducts, setHeroProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchHeroProducts = useCallback(async (signal) => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch(
        "https://dummyjson.com/products?limit=6&select=id,title,description,category,price,discountPercentage,rating,brand,thumbnail,images,availabilityStatus",
        { signal },
      );

      if (!response.ok) {
        throw new Error("Unable to load hero products.");
      }

      const data = await response.json();
      setHeroProducts(data.products || []);
      setActiveIndex(0);
    } catch (error) {
      if (error.name === "AbortError") return;

      setHeroProducts([]);
      setErrorMessage(error.message || "Hero products are unavailable.");
    } finally {
      if (!signal?.aborted) {
        setIsLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetchHeroProducts(controller.signal);

    return () => controller.abort();
  }, [fetchHeroProducts]);

  const getSlideWidth = () => {
    const carousel = carouselRef.current;
    const firstSlide = carousel?.querySelector(".carousel-image-wrapper");

    if (!carousel || !firstSlide) return 0;

    const gap = parseFloat(window.getComputedStyle(carousel).columnGap) || 0;
    return firstSlide.getBoundingClientRect().width + gap;
  };

  const onPointerDown = (e) => {
    if (!carouselRef.current) return;
    const productSlide = e.target.closest("[data-product-id]");

    isDragging.current = true;
    hasDragged.current = false;
    pressedProductId.current = productSlide?.dataset.productId || null;
    startX.current = e.pageX - carouselRef.current.offsetLeft;
    scrollLeft.current = carouselRef.current.scrollLeft;
    carouselRef.current.setPointerCapture(e.pointerId);
  };

  const stopDragging = useCallback(() => {
    isDragging.current = false;
    pressedProductId.current = null;
  }, []);

  const goToProductDetails = useCallback(
    (productId) => {
      if (!productId) return;

      router.push(`/products/${productId}`);
    },
    [router],
  );

  const onPointerUp = useCallback(
    (e) => {
      const productId = pressedProductId.current;
      const shouldOpenDetails = productId && !hasDragged.current;

      isDragging.current = false;
      pressedProductId.current = null;

      if (carouselRef.current?.hasPointerCapture(e.pointerId)) {
        carouselRef.current.releasePointerCapture(e.pointerId);
      }

      if (shouldOpenDetails) {
        goToProductDetails(productId);
      }
    },
    [goToProductDetails],
  );

  const onPointerMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.2;
    if (Math.abs(walk) > 8) {
      hasDragged.current = true;
    }
    carouselRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const onScroll = () => {
    if (!carouselRef.current) return;
    const slideWidth = getSlideWidth();
    if (!slideWidth) return;

    const idx = Math.round(carouselRef.current.scrollLeft / slideWidth);
    const nextIndex = Math.min(Math.max(idx, 0), heroProducts.length - 1);
    setActiveIndex(nextIndex);
  };

  const scrollByBanner = (direction) => {
    if (!carouselRef.current) return;

    const slideWidth = getSlideWidth();
    const currentIndex = Math.round(carouselRef.current.scrollLeft / slideWidth);
    const nextIndex =
      direction === "left"
        ? Math.max(currentIndex - 1, 0)
        : Math.min(currentIndex + 1, heroProducts.length - 1);

    carouselRef.current.scrollTo({
      left: nextIndex * slideWidth,
      behavior: "smooth",
    });
  };

  if (isLoading) {
    return (
      <div className="hero-carousel-container">
        <div className="hero-carousel-skeleton">
          <Skeleton variant="rounded" className="hero-skeleton-image" />
          <Box className="hero-skeleton-content">
            <Skeleton variant="text" width="45%" height={42} />
            <Skeleton variant="text" width="65%" height={24} />
            <Skeleton variant="rounded" width={160} height={36} />
          </Box>
        </div>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="hero-carousel-container">
        <Alert
          severity="error"
          action={
            <Button
              color="inherit"
              size="small"
              onClick={() => fetchHeroProducts()}
            >
              Retry
            </Button>
          }
        >
          {errorMessage}
        </Alert>
      </div>
    );
  }

  if (!heroProducts.length) return null;

  return (
    <div className="hero-carousel-container">
      <button
        className="carousel-arrow left"
        onClick={() => scrollByBanner("left")}
        aria-label="Scroll left"
        type="button"
      >
        &#8249;
      </button>
      <div
        className="hero-carousel drag-scroll"
        ref={carouselRef}
        onPointerDown={onPointerDown}
        onPointerLeave={stopDragging}
        onPointerUp={onPointerUp}
        onPointerCancel={stopDragging}
        onPointerMove={onPointerMove}
        onScroll={onScroll}
      >
        {heroProducts.map((product, idx) => {
          const imageSrc = product.images?.[0] || product.thumbnail;

          return (
          <div
            key={product.id}
            className="carousel-image-wrapper banner-style"
            data-product-id={product.id}
            role="button"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                goToProductDetails(product.id);
              }
            }}
          >
            <Image
              src={imageSrc}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 92vw, 1100px"
              className="carousel-image"
              priority={idx === 0}
            />
            <Box className="hero-product-overlay">
              <Chip
                size="small"
                label={product.category}
                className="hero-product-chip"
              />
              <Typography variant="h4" className="hero-product-title">
                {product.title}
              </Typography>
              <Typography className="hero-product-description">
                {product.description}
              </Typography>
              <Box className="hero-product-meta">
                <Typography className="hero-product-price">
                  Rs. {product.price}
                </Typography>
                <Typography className="hero-product-rating">
                  {product.rating} rating
                </Typography>
                {product.discountPercentage ? (
                  <Typography className="hero-product-discount">
                    {product.discountPercentage}% off
                  </Typography>
                ) : null}
              </Box>
            </Box>
          </div>
          );
        })}
      </div>
      <button
        className="carousel-arrow right"
        onClick={() => scrollByBanner("right")}
        aria-label="Scroll right"
        type="button"
      >
        &#8250;
      </button>
      <div className="carousel-pagination">
        {heroProducts.map((product, idx) => (
          <span
            key={product.id}
            className={`carousel-dot${activeIndex === idx ? " active" : ""}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
