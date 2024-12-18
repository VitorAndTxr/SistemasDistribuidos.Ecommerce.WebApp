import { createContext, ReactNode, useState, useContext, useEffect } from "react";
import { BuyRequestViewModel, ProductViewModel } from "../domain/ProductViewModel";
import apiInterface from "@/apiInterface";
import { log } from "console";

interface CartContextProps {
  cartItems: ProductViewModel[];
  availableItems: ProductViewModel[];
  userId: string;
  addItem: (item: string) => void;
  removeItem: (item: string) => void;
  setUserId: (userId: string) => void;
  canShowAddButton: (itemId: string) => boolean;
  finishBuy: () => void;
  openTab:number,
  setOpenTab: (tab: number) => void;
  fetchUserRequests: () => void;
  userRequests: BuyRequestViewModel[];
}
const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode; }) => {
  const [cartItems, setCartItems] = useState<ProductViewModel[]>([]);
  
  const [availableItems, setAvailableItems] = useState<ProductViewModel[]>([]);

  const [userRequests, setUserRequests] = useState<BuyRequestViewModel[]>([]);

  const [openTab, setOpenTab] = useState<number>(1);

  
  const [userId, setUserId] = useState<string>('');

  useEffect(() => {
    fetchProducts();
    const eventSource = new EventSource('https://localhost:5002/sse');
    eventSource.onmessage = (event) => {
      console.log("Nova mensagem recebida:", event.data);
      alert("Nova mensagem recebida: " + event.data);

      fetchProducts();
    };

    eventSource.onerror = (err) => {
      console.error("Erro SSE:", err);
      eventSource.close();
    };

    return () => eventSource.close();

  }, []);

  useEffect(() => {
    console.log("cartItems:",cartItems);
  }, [cartItems]);

  useEffect(() => {
    console.log("userId:",userId);
  }, [userId]);

  function fetchProducts() {
    apiInterface.get("/produtos")
      .then((response) => {
        console.log("response.data:", response.data);
        setAvailableItems(response.data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }

  const fetchUserRequests = () => {

    apiInterface.get("/pedidos/"+userId)
    .then((response) => {
      console.log("response.data:",response.data);
      setUserRequests(response.data) 
    })
    .catch((error) => console.error("Error fetching products:", error));
  }


  const addItem = (itemToAddId: string) => {
    let itemToAdd = availableItems.find((item) => item.id === itemToAddId);

    if(itemToAdd === undefined){
      alert("Produto não encontrado");
      return;

    }

    let currentItem = cartItems.find((item) => item.id === itemToAdd.id);

    if (currentItem !== undefined) {
        if (currentItem.stock >= itemToAdd.stock) {
            alert("Quantidade máxima atingida");
            return;
        }
        setCartItems((prevItems) => 
            prevItems.map((item) => 
                item.id === currentItem.id ? { ...item, stock: item.stock + 1 } : item
            )
        );
    } else {
        let itemToAddCopy = { ...itemToAdd, stock: 1 };
        console.log("itemToAddCopy:", itemToAddCopy);
        setCartItems((prevItems) => [...prevItems, itemToAddCopy]);
    }
};

  const removeItem = (id: string) => {
    let itemToRemove = cartItems.find((item) => item.id === id);
    
    if (itemToRemove === undefined) {
      alert("Produto não encontrado no carrinho");
      return;
    }

    if (itemToRemove.stock > 1) {
      setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, stock: item.stock - 1 } : item
      )
      );
    } else {
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    }
  };

  const canShowAddButton = (itemId: string): boolean => {
    var cartItem = cartItems.find((item) => item.id === itemId);
    var availableItem = availableItems.find((item) => item.id === itemId);

    if(cartItem === undefined||availableItem === undefined)
      return false

    return cartItem === undefined || cartItem.stock < availableItem.stock;
  }

  const finishBuy = () =>{
      apiInterface.post("/buy", {userId: userId, items: cartItems}).then((response) => {
          console.log("response",response.data);
          setCartItems([]);
      }).catch((error) => console.error("Error buying products:", error));
      fetchProducts();

  }


  return (
    <CartContext.Provider value={{ 
      cartItems, 
      availableItems, 
      userId, 
      setUserId, 
      addItem, 
      removeItem,
      canShowAddButton,
      finishBuy,
      openTab, 
      setOpenTab,
      userRequests,
      fetchUserRequests
       }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};



