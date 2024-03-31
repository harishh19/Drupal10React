import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import { API_URL } from "../config";
import './ProductList.scss';

const ProductList = () => {
    const [productList, setProductList] = useState("");
    const [productImage, setProductImage] = useState("");

    useEffect(() => {
        const LIST_URL = `${API_URL}/product?include=field_product_image`;
        const fetchProductList = async () => {
            try {
                const response = await fetch(LIST_URL);
                const data = await response.json();
                setProductList(data.data);
                setProductImage(data.included);
            }
            catch (e) {
                console.log(e)
            }
        }
        fetchProductList();
    }, [])
    return (
        <div className="productList">
            {productList.length > 0 && productImage.length > 0 && <ProductItem item={productList} itemImages={productImage} />}
        </div >
    );
}
export default ProductList;