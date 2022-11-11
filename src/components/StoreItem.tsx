import { useContext } from "react"
import { Button, Card, CardImg } from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartContext"
import formatCurrency from "../utilities/formatCurrency"

interface StoreItemProps {
    id: number
    name: string 
    price: number
    imgUrl: string
}

const StoreItem = ({ id, name, price, imgUrl }: StoreItemProps) => {
    const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart } = useShoppingCart()
    const quantity = getItemQuantity(id)
    return (
        <Card className="h-100">
            <CardImg variant="top" src={imgUrl} style={{height: "200px", objectFit:"cover"}} />
            <Card.Body >
                <Card.Title className="d-flex mb-3 fw-bold justify-content-between align-items-baseline">
                    <span className="fs-4 ">{name}</span>
                    <span className="text-muted ms-2">{formatCurrency(price)}</span>
                </Card.Title>
                <div className="d-flex flex-column align-items-center gap-3">
                    {quantity ? (
                        <>
                            <div className="d-flex gap-3 align-items-center">
                                <Button onClick={() => decreaseCartQuantity(id)}>-</Button>  
                                    <div>
                                        <span className="fs-5">{quantity}</span> in cart
                                    </div>
                                <Button onClick={() => increaseCartQuantity(id)}>+</Button>      
                            </div>
                            <Button variant="danger" className="btn-sm" onClick={() => removeFromCart(id)}>Remove</Button>
                        </> 
                        ) 
                        : <Button className="w-100" onClick={() => increaseCartQuantity(id)}>+ Add to Cart</Button>
                    
                    }
                </div>
            </Card.Body>
        </Card>
    )
}

export default StoreItem