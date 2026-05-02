"use client";

import dynamic from "next/dynamic";
import { Box, Card, Skeleton, Stack } from "@mui/material";

const Hero = dynamic(() => import("@/component/home/Hero"), {
  loading: () => (
    <Box className="w-full max-w-[1200px] pt-4">
      <Skeleton variant="rounded" className="w-full" height={320} />
    </Box>
  ),
  ssr: false,
});

const Category = dynamic(() => import("@/component/home/Category"), {
  loading: () => (
    <Box className="w-full p-10">
      <Skeleton variant="text" width={120} height={30} />
      <Stack direction="row" spacing={1} className="mt-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} variant="rounded" width={90} height={32} />
        ))}
      </Stack>
    </Box>
  ),
  ssr: false,
});

const ProductGrid = dynamic(() => import("@/component/products/ProductGrid"), {
  loading: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-5 w-full">
      {Array.from({ length: 8 }).map((_, index) => (
        <Card key={index} className="p-4 rounded-xl flex flex-col gap-4">
          <Skeleton variant="rounded" height={250} />
          <Skeleton variant="text" height={32} width="80%" />
          <Skeleton variant="text" height={22} width="55%" />
          <Skeleton variant="rounded" height={34} />
        </Card>
      ))}
    </div>
  ),
  ssr: false,
});

export default function Home() {
  return (
    <main className="flex items-center w-full flex-col gap-1 px-8 py-20">
      <Hero />
      <Category />
      <ProductGrid />
    </main>
  );
}
