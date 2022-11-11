import { Button, Offcanvas, Stack } from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartContext"
import formatCurrency from "../utilities/formatCurrency"
import CartItem from "./CartItem"
import storeItems from '../../src/data/items.json'

type ShopingCartProps = {
    isShown: boolean
    setIsShown: React.Dispatch<React.SetStateAction<boolean>>
}

const ShoppingCart = ({ isShown, setIsShown }: ShopingCartProps) => {
    const { cartItems } = useShoppingCart()
    return (
        <Offcanvas show={isShown} onHide={() => setIsShown(false)} placement='end' className='p-3'>
            <Button className="ms-auto" variant="secondary" onClick={() => setIsShown(false)}>X</Button>
            <Stack className="my-3">
                {cartItems.length
                    ? 
                    cartItems.map(item => {
                        return <CartItem key={item.id} {...item}/>
                    }) 
                    : <h4>Your Cart is empty</h4>
                }
                <div className="ms-auto fw-bold fs-5">
                    <span>Total </span> 
                    {
                        formatCurrency(cartItems.reduce((total, current) => {
                            return total + ((storeItems?.find(item => item.id === current.id))?.price  || 0) * current.quantity 
                        }, 0))
                    }
                </div>
            </Stack>
        </Offcanvas>
    )
}
export default ShoppingCart