"use client"
import { CartProvider } from "../context/CartContext";
import MainComponent from "../components/MainComponent";

export default function Home() {


  return (
    <CartProvider>
      <div className="grid grid-rows-[20px_1fr_20px] items-top justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <MainComponent/>
      </div>
    </CartProvider>
  );
}




