"use client";


export interface ProductViewModel {
  id: string;
  name: string;
  image: string;
  price: number;
  stock: number;
}

export interface BuyRequestViewModel {
  id:string;
  userId: string;
  status: number;
  products: ProductViewModel[];
  totalPrice: number;
}
