import { useCart } from "@/context/CartContext";
import { BuyRequestStatusEnum } from "@/domain/BuyRequestStatusEnum";
import { useEffect } from "react";

export function UserBuyRequestComponent() {
  const {
    availableItems, cartItems, addItem, removeItem, canShowAddButton, setUserId, finishBuy, userId, userRequests, fetchUserRequests
  } = useCart();

  useEffect(() => {
    fetchUserRequests();
  }, []);

  const returnStatus = (status: BuyRequestStatusEnum) => {
    switch (status) {
      case BuyRequestStatusEnum.PendingPayment:
        return "Aguardando Pagamento";
      case BuyRequestStatusEnum.Shipped:
        return "Enviado";
      case BuyRequestStatusEnum.PaymentDenied:
        return "Pagamento Negado";
      case BuyRequestStatusEnum.PaymentApproved:
        return "Pagamento Aprovado";
      case BuyRequestStatusEnum.Cancelled:
        return "Pagamento Aprovado";
      default:
        return "Desconhecido";
    }
  };

  return (<>
    <div className="col-span-4">
      <h2>Lista de Pedidos</h2>
      {userRequests.map((userRequests) => (
        <div key={userRequests.id} className="flex items-center gap-4">
          <h3>{userRequests.userId}</h3>
          <h3>{returnStatus(userRequests.status)}</h3>
          <h3>{userRequests.totalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h3>
          {userRequests.products.map((item) => (
            <div key={item.id} >
              <img src={item.image} alt={item.name} width={100} height={100} />
              <div>
                <h3>{item.name}</h3>
                <p>{item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                <p>Total {item.stock}</p>
              </div>
            </div>))}
        </div>
      ))}
    </div>
  </>);
}
