import { useState } from "react"
import { Button, Container, Nav, Navbar } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useShoppingCart } from "../context/ShoppingCartContext"
import ShoppingCart from "./ShoppingCart"


const NavbarComponent = () => {
  const { cartItems, isShown, setIsShown } = useShoppingCart()
  return (
      <Navbar sticky="top" className="bg-white shadow-sm mb-3">
        <ShoppingCart isShown={isShown} setIsShown={setIsShown} />
        <Container>
          <Nav className="fw-bold">
            <Nav.Link to='/' as={Link}>Home</Nav.Link>
            <Nav.Link to='/store' as={Link}>Store</Nav.Link>
            <Nav.Link to='/about' as={Link}>About</Nav.Link>
          </Nav>
          <Button  
            style={{width:"3rem",height:"3rem",position:"relative"}} 
            className="rounded-circle" 
            variant="outline-secondary"
            onClick={() => setIsShown(true)}
          > 
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-cart-fill" viewBox="0 0 16 16">
              <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
            </svg>
            <div 
              className="d-flex justify-content-center align-items-center bg-danger rounded-circle" 
              style={{
                color:"white",
                width:"1.5rem",
                height:"1.5rem",
                position:"absolute", 
                bottom:"0", 
                right:"0",
                transform:"translate(25%,25%)"
              }}
            >
              {cartItems.reduce((a,b) => a + b.quantity, 0)}
            </div>
          </Button>
        </Container>
    </Navbar>
  )
}
export default NavbarComponent