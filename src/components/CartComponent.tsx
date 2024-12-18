import { useCart } from "@/context/CartContext";

export function CartComponent() {

    const {
        availableItems, cartItems, addItem, removeItem, canShowAddButton, setUserId, finishBuy, userId, openTab, setOpenTab
    } = useCart();

    return (
        <>
            <div className="grid grid-cols-6 gap-4 w-full">
                <div className="col-span-4">
                    <h2>Produtos disponíveis</h2>
                    {availableItems.map((item) => (
                        <div key={item.id} className="flex items-center gap-4">
                            <img src={item.image} alt={item.name} width={100} height={100} />
                            <div>
                                <h3>{item.name}</h3>
                                <p>{item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                                <p>Total Disponível: {item.stock}</p>
                                <button className="border m-2 p-2" onClick={() => { addItem(item.id); }}>Adicionar ao carrinho</button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="col-span-2">
                    <h1>Carrinho</h1>
                    <h2>Total: {cartItems.reduce((acc, item) => acc + item.price * item.stock, 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h2>

                    {cartItems.map((item) => (
                        <div key={item.id} className="flex items-center gap-4 my-3">
                            <img src={item.image} alt={item.name} width={100} height={100} />
                            <div>
                                <h3>{item.name}</h3>
                                <p>Preço Unitário: {item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                                <p>{item.stock}</p>
                                <p>Preço Total:{(item.price * item.stock).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>

                                {canShowAddButton(item.id) && <button className="border m-2 p-2" onClick={() => { addItem(item.id); }}>Adicionar mais</button>}
                                <button className="border m-2 p-2" onClick={() => { removeItem(item.id); }}>Remover</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {cartItems.length > 0 && userId !== "" &&
                <div>
                    <button className="border m-2 p-2" onClick={() => { finishBuy(); }}>Finalizar compra</button>
                </div>}
        </>
    );
}
