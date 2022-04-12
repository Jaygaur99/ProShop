import React, { useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import Message from "../components/Message/Message";
import { addToCart, removeFromCart } from "../actions/cartActions";

const CartScreen = () => {
  const id = useParams();
  const navaigate = useNavigate();
  const location = useLocation();

  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  const productId = id["id"];
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  //   console.log("cartItems", cartItems);

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  };

  const checkoutHandler = () => {
    navaigate("/login?redirect=shipping");
  }

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message variant="info">
            Your Cart is empty. <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>

                  <Col md={3}>
                    <Link to={`/products/${item.product}`}>{item.name}</Link>
                  </Col>

                  <Col md={2}>&#8377; {item.price}</Col>

                  <Col md={3}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(addToCart(item.product, Number(e.target.value)))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => {
                        return (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        );
                      })}
                    </Form.Control>
                  </Col>

                  <Col md={1}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>

      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
              <ListGroup.Item>
                  <h2>Subtotal: ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h2>
                    <h3>&#8377; {cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)}</h3>
              </ListGroup.Item>
          </ListGroup>

          <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                style={{width: "100%"}}
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed to Checkout
              </Button>
          </ListGroup.Item>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
