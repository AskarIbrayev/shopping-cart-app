import { Card, Col, Container, Row } from "react-bootstrap"
import storeItems from '../../src/data/items.json'
import StoreItem from "../components/StoreItem"


const Store = () => {
    return (
        <Container>
            <Row xs={1} md={2} lg={3} className='g-3'>
                {storeItems.map(item => (
                    <Col key={item.id}>
                        <StoreItem  {...item}/>
                    </Col>
                ))}                
            </Row>

        </Container>
    )
}

export default Store