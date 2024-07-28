import React, { useContext, useState } from 'react';
import { assets } from '/src/assets';
import { StoreContext } from '../../Context/StoreContext';
import { useNavigate } from 'react-router-dom';
import './MenuData.css';

const MenuData = ({ id, name, price, description, image }) => {
  const navigate = useNavigate();
  const [itemCount, setItemCount] = useState(0);
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);

  const handleItemClick = () => {
    navigate(`/DetailProductView/${id}`);
  };

  return (
    <div className='food-item_m'>
      <div className="food-item-img-container_m">
        <img className='food-item-image_m' src={image} alt="" onClick={handleItemClick} />
        {!cartItems[id] ? (
          <img
            className='add_m'
            onClick={() => addToCart(id)}
            src={assets.add_icon_white}
            alt='add'
          />
        ) : (
          <div className='food-item-counter_m'>
            <img
              onClick={() => removeFromCart(id)}
              src={assets.remove_icon_red}
              alt=""
            />
            <p>{cartItems[id]}</p>
            <img
              onClick={() => addToCart(id)}
              src={assets.add_icon_green}
              alt=""
            />
          </div>
        )}
      </div>
      <div className="food-item-info_m">
        <div className="food-item-name-rating_m">
          <p style={{fontSize:'15px'}}><nobr>{name}</nobr></p>
          {/* Assuming assets.rating_starts is your star icon */}
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className='food-item-desc_m'>{description}</p>
        <p className='food-item-price_m'>₹{price}</p>
      </div>
    </div>
  );
};

export default MenuData;
