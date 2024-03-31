import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/esm/Button';
import ProductViewButton from "./ProductViewButton";
import { PUBLIC_URL } from "../config";

import './ProductItem.scss';

const ProductItem = (products) => {
  const [cartItems, setCartItems] = useState([]);
  const [showAddToCartMessage, setShowAddToCartMessage] = useState(false);
  const [addedProduct, setAddedProduct] = useState(null);

  const item = products.item;
  const itemImg = products.itemImages;
  const getimageUri = (fid) => {
    const img = itemImg.filter(image => image.attributes.drupal_internal__fid == fid);
    return img[0];
  }
  // Function to update cart
  const updateCart = (item) => {
    setCartItems(item);
  };
  // Function to add a product to the cart
  const addToCart = (product) => {
    const existingCartItemIndex = cartItems.findIndex(item => item.id === product.id);
    if (existingCartItemIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingCartItemIndex].quantity++;
      updateCart(updatedCartItems);
    } else {
      updateCart([...cartItems, { ...product, quantity: 1 }]);
    }
    setShowAddToCartMessage(true);
    setAddedProduct(product);
    setTimeout(() => {
      setShowAddToCartMessage(false);
      setAddedProduct(null);
    }, 3000);
  };

  return (
    <>
      {showAddToCartMessage && (
        <div className="add-to-cart-message">
          {addedProduct && (<p>{addedProduct.title} added to cart!</p>)}
        </div>
      )}
      <Row xs={1} md={4} className="g-4">
        {item.length > 0 && item.map((res, idx) => {
          const Img = getimageUri(res.relationships.field_product_image.data.meta.drupal_internal__target_id);
          const cartObj = {
            id: res.id,
            title: res.attributes.title,
            imgUrl: PUBLIC_URL + Img.attributes.uri.url,
            price: res.attributes.field_selling_price
          }
          return (
            <Col key={res.id} className='productItem'>
              <Card>
                <Card.Img variant="top" src={PUBLIC_URL + Img.attributes.uri.url} />
                <Card.Body>
                  <Card.Title>{res.attributes.title}</Card.Title>
                  <Row md={12}>
                    <Col md={4}><span className="card-title">${res.attributes.field_selling_price}</span></Col>
                    <Col md={8}><Button className="cartButton" onClick={() => addToCart(cartObj)}>Add To Cart</Button></Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          )
        }
        )}
      </Row>
       <ProductViewButton cartItems={cartItems} setCartItems={updateCart} />
    </>
  )
}
export default ProductItem;
