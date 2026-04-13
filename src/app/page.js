import Category from "@/component/home/Category";
import Hero from "@/component/home/Hero";
import ProductsList from "@/component/home/ProductsList";
// import ProductGrid from "@/app/product/ProductGrid";
import Image from "next/image";
import ProductGrid from "./products/page";

export default function Home() {
  return (
    <main className="flex items-center w-full flex-col gap-1 px-8 py-20">
     <Hero/>
     <Category/>
     <ProductGrid/>
    </main>
  );
}
