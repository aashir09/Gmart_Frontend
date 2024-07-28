import React from 'react';
import './ExploreMenu.css';
import { menu_list } from "/src/assets";
import { useNavigate } from 'react-router-dom';

const ExploreMenu = ({ category, setCategory }) => {
    const navigate = useNavigate();

    const navigateToMenu = (selectedCategory) => {
        navigate(`/Menu/${selectedCategory}`);
    };

    return (
        <div className='explore-menu' id='explore-menu'>
            <h1>Featured Categories</h1>
            <p className='explore-menu-text'>Explore our curated selection of featured categories, each offering a unique array of products to cater to your diverse needs. From delectable cuisine to trendy fashion and cutting-edge technology, our featured categories showcase the best of what we have to offer. Whether you're searching for the perfect gift .</p>
            <div className="explore-menu-list">
                {menu_list.map((item, index) => (
                    <div onClick={() => { setCategory(prev => prev === item.menu_name ? 'All' : item.menu_name); navigateToMenu(item.menu_name); }} key={index} className="explore-menu-list-item">
                        <img className={category === item.menu_name ? "active" : ""} src={item.menu_image} alt="" />
                        {/* <p>{item.menu_name}</p> */}
                    </div>
                ))}
            </div>
            <hr />
        </div>
    );
}

export default ExploreMenu;
