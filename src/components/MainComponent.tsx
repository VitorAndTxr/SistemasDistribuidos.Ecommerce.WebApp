import { CartComponent } from "./CartComponent";
import { useCart } from "../context/CartContext";
import { UserBuyRequestComponent } from "./UserBuyRequestComponent";

export default function MainComponent(){

    const { 
        setUserId,
        openTab,
        setOpenTab,
        userId
    } = useCart();

    return(
      <main className="flex flex-col gap-8 row-start-2 items-top sm:items-start">
        <div>
            <label htmlFor="username">Nome do Usuário:</label>
            <input 
                onChange={(e) => {setUserId(e.target.value)}}
            type="text" id="username" name="username" className="border p-2" />

            <button className="border m-2 p-2" onClick={() => {setOpenTab(2)}}>Ver meus pedidos</button>
            <button className="border m-2 p-2" onClick={() => {setOpenTab(1)}}>Comprar</button>


        </div>
        {
            openTab === 1 && <CartComponent/>
        }
        {
            openTab === 2 &&userId!=="" &&  <UserBuyRequestComponent/>

        }

      </main>
    )
  }


