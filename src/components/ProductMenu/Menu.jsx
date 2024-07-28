import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';
import MenuData from '../MenuData/MenuData';
import './Menu.css'

const Menu = () => {
    const [foodList, setFoodList] = useState([]);
    const [categories, setCategories] = useState([]);
    const { category } = useParams();

    useEffect(() => {
        // Fetch the product data from the API
        fetch('http://localhost:3000/api/products')
            .then(response => response.json())
            .then(data => {
                // Extract unique categories from the product data
                const uniqueCategories = [...new Set(data.map(product => product.category))];
                setCategories(uniqueCategories);
                setFoodList(data);
            })
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    return (
        <>
            <div className='food-display_m' id='food-display_m' >
                <div style={{ display: 'flex', justifyContent: "space-between" }}>
                    <h2>{category}</h2>
                    <div className="btn-group" role="group" >
                        <button id="btnGroupDrop1" type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{backgroundColor:'#ffff', color:'black',borderColor:'black'}}>FIlter</button>
                        <div className="dropdown-menu" aria-labelledby="btnGroupDrop1" style={{ position: 'absolute', left: '-77px' }}>
                            <a className="dropdown-item" href="#">Lowest Price</a>
                            <a className="dropdown-item" href="#">Highest Price</a>
                        </div>
                    </div>
                </div>
                <div className="food-display-list_m">
                    {foodList.map((item, index) => {
                        if (category === "All" || category === item.category) {
                            return <MenuData key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.thumbnail} />;
                        }
                        return null;
                    })}
                </div>
            </div>
        </>
    );
}

export default Menu;
