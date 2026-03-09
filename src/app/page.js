import Category from "@/component/home/Category";
import Hero from "@/component/home/Hero";
import ProductsList from "@/component/home/ProductsList";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex items-center w-full flex-col gap-12 px-6 py-8">
     <Hero/>
     <Category/>
     <ProductsList/>
    </main>
  );
}
