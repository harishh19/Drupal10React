
import React, { useState } from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
import './ProductCard.scss';

const ProductCard = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Function to add a product to the cart
  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  // Function to handle showing the cart modal
  const showCartModal = () => {
    setShowModal(true);
  };

  // Function to hide the cart modal
  const hideCartModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Card className="product-card">
        <div className="image-container">
          <Card.Img variant="top" src="path_to_your_image" />
        </div>
        <Card.Body>
          <div className="text-container">
            <Card.Title className="title">Product Title</Card.Title>
            <Card.Text className="price">$19.99</Card.Text>
          </div>
          <Button variant="primary" onClick={() => addToCart()}>Add to Cart</Button>
        </Card.Body>
      </Card>
      <Button variant="secondary" onClick={showCartModal}>View Cart</Button>

      {/* Modal for displaying cart */}
      <Modal show={showModal} onHide={hideCartModal}>
        <Modal.Header closeButton>
          <Modal.Title>Cart Items</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {cartItems.map((item, index) => (
            <div key={index}>
              {/* Display your cart item details here */}
            </div>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hideCartModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProductCard;