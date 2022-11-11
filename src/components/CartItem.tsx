import { Button } from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartContext"
import formatCurrency from "../utilities/formatCurrency"
import storeItems from '../../src/data/items.json'


interface CartItemProps {
    id: number,
    quantity: number

}

const CartItem = ({ id, quantity }: CartItemProps) => {
    const {removeFromCart} = useShoppingCart()
    const storeItem = storeItems.find(e => e.id === id)

    if (!storeItem) return null
    return (
            <div className="d-flex align-items-center gap-2 mb-3">
                <img src={storeItem.imgUrl} style={{width: "120px",height:"70px", objectFit:"cover", borderRadius:'3px'}} />
                <div>
                    <div>{storeItem.name}<span className='text-muted'> x{quantity}</span></div>
                    <div className='text-muted'>{formatCurrency(storeItem.price)}</div>
                </div>
                <div className="ms-auto fw-bold">{formatCurrency(storeItem.price * quantity)}</div>
                <Button className="btn-sm" variant="outline-danger" onClick={() => removeFromCart(id)}>x</Button>
            </div>
    )
}

export default CartItem