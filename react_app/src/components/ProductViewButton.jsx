import React, { useState } from 'react';
import { Image, Modal, Table } from 'react-bootstrap';
import Button from 'react-bootstrap/esm/Button';
import './ProductViewButton.scss';


const ProductViewButton = (cartItems) => {
    const [showModal, setShowModal] = useState(false);
    const CartItemArry = cartItems && cartItems.cartItems;

    // Function to handle showing the cart modal
    const showCartModal = () => {
        setShowModal(true);
    };

    // Function to hide the cart modal
    const hideCartModal = () => {
        setShowModal(false);
    };
    // console.log(CartItemArry);
    // Calculate total price of all items in the cart
    const calculateTotalPrice = () => {
        const totalCartPrice = CartItemArry.reduce((total, item) => total + Number(item.price) * item.quantity, 0);
        return parseFloat(totalCartPrice).toFixed(2)

    };

    // Function to handle quantity change in the cart
    // const handleQuantityChange = (productId, quantity) => {
    //     const updatedCartItems = CartItemArry.map(item => {
    //         if (item.id === productId) {
    //             return { ...item, quantity };
    //         }
    //         return item;
    //     });
    //     cartItems.setCartItems(updatedCartItems);
    // };
    const handleQuantityChange = (productId, delta) => {
        const updatedCartItems = CartItemArry.map(item => {
            if (item.id === productId) {
                return { ...item, quantity: Math.max(1, item.quantity + delta) }; // Ensure quantity is at least 1
            }
            return item;
        });
        cartItems.setCartItems(updatedCartItems);
    };
    // Function to delete a product from the cart
    const deleteFromCart = (productId) => {
        const updatedCartItems = CartItemArry.filter(item => item.id !== productId);
        cartItems.setCartItems(updatedCartItems);
    };
    return (
        <div className="viewCartButton">
            <Button variant="secondary" onClick={showCartModal}>View Cart</Button>
            {/* Modal for displaying cart */}
            <Modal show={showModal} onHide={hideCartModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Order Summary</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {CartItemArry.length > 0 ?
                        <Table hover>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th className='cartItem'>Name</th>
                                    <th className='cartItem'>Price</th>
                                    <th className='cartItem'>Quantity</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {CartItemArry.length > 0 && CartItemArry.map((item, index) => (
                                    <tr key={index}>
                                        <td className='cartImg'><Image width="75" src={item.imgUrl} /></td>
                                        <td className='cartItem'>{item.title}</td>
                                        <td className='cartItem'>${item.price}</td>
                                        <td className='cartItem'>
                                            <td>
                                                <Button variant="outline-primary" size="sm" onClick={() => handleQuantityChange(item.id, -1)}>-</Button>
                                                <span className='cartQuantity'>{item.quantity}</span>
                                                <Button variant="outline-primary" size="sm" onClick={() => handleQuantityChange(item.id, 1)}>+</Button>
                                            </td>
                                        </td>
                                        <td className='deleteBtn'><Button variant="danger" size="sm" onClick={() => deleteFromCart(item.id)}>Delete</Button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table> : <span className='emptyCart'>Cart is Empty!</span>}
                    <p className='cartTotalPrice'>Total: ${calculateTotalPrice()}</p>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default ProductViewButton;