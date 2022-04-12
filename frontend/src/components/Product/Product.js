import React from "react";
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Rating from '../Rating/Rating';

const Product = ({ product }) => {
    return (
        <Card className="my-3 p-3 rounded">
            <Link to={`/products/${product._id}`}>
                <Card.Img src={product.image} />
            </Link>

            <Card.Body>
                <Link to={`/products/${product._id}`}>
                    <Card.Title as="div">
                        <strong>{product.name}</strong>
                    </Card.Title>
                </Link>

                <Card.Text as="div">
                    <div className="my-3">
                        {product.rating} from {product.numReviews}.
                        <Rating value={product.rating} text={`${product.numReviews} reviews`} color={`#f8e825`} />
                    </div>
                </Card.Text>

                <Card.Text as="h3">
                    <span className="mr-2">&#x20B9;</span>{product.price}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default Product;