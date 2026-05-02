import { Box, Card, Skeleton } from "@mui/material";

export default function Loading() {
  return (
    <main className="pt-24 px-5 pb-10">
      <Box className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <Card key={index} className="p-4 rounded-xl flex flex-col gap-4">
            <Skeleton variant="rounded" height={220} />
            <Skeleton variant="text" height={32} width="80%" />
            <Skeleton variant="text" height={22} width="55%" />
            <Skeleton variant="rounded" height={38} />
          </Card>
        ))}
      </Box>
    </main>
  );
}
