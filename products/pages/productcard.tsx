import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./navbar";

const koneksiProducts = axios.create({
    baseURL: "http://127.0.0.1:5000/api/products",
});

export default function card() {
    const [products, setProducts] = useState([]);

    function formatDate(date) {
        const d = new Date(date);
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        const year = d.getFullYear();
        return `${year}-${month}-${day}`;
    }

    useEffect(() => {
        async function getKaryawan() {
            try {
                const response = await koneksiProducts.get("/");
                setProducts(response.data.data);
            } catch (error) {
                console.error("Error from products in api products:", error);
            }
        }
        getKaryawan();
    }, []);

    return (
        <div>
            <Navbar />
            <div className="container">
                <br />
                <br />

                <center>
                    <h1>Product Card</h1>
                </center>
                <br />
                <div className="card-container">
                    {products.map((product) => (
                        <div key={product.id} className="card">
                            <img className="card-image" src={product.foto} alt="" />
                            <div className="card-content">
                                <h3 className="card-title">{product.title}</h3>
                                <p className="card-text">Price: {product.price}</p>
                                <p className="card-text">Weight: {product.weight}</p>
                                <p className="card-text">Desc: {product.detail}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
