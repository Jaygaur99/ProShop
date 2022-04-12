import React, { useEffect } from "react";
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import Product from "../components/Product/Product";
import Loader from '../components/Loader/Loader';
import Message from "../components/Message/Message";
import { listProducts } from '../actions/productActions';

const HomeScreen = () => {
    const dispatch = useDispatch();
    const productList = useSelector(state => state.productList);
    const { error, loading, products } = productList;

    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);

    return (
        <div>
            <h1>Latest Product</h1>
            {loading ? <Loader/>
                : error ? <Message variant="danger">{error}</Message>
                    :
                    <Row>
                        {products.map(product => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product} />
                            </Col>
                        ))}
                    </Row>
            }

        </div>
    );
};

export default HomeScreen;