import React, { useContext, useState } from 'react';
import './FoodItem.css';
import { assets } from '/src/assets';
import { StoreContext } from '../../Context/StoreContext';
import { useNavigate } from 'react-router-dom';

const FoodItem = ({ id, name, price, description, image, rating }) => {
  const navigate = useNavigate();
  const [itemCount, setItemCount] = useState(0);
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);

  const handleItemClick = () => {
    navigate(`/DetailProductView/${id}`);
  };
  const renderRatingStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<img key={i} style={{width:'20px',height:"20px",display:'flex'}} src={assets.golden_star} alt="Golden Star" />);
      } else {
        stars.push(<img key={i}  style={{width:'20px',height:"20px",display:'flex'}}src={assets.white_star} alt="White Star" />);
      }
    }
    return stars;
  };


  return (
    <div className='food-item'>
      <div className="food-item-img-container">
        <img className='food-item-image' src={image} alt="" onClick={handleItemClick} />
        {!cartItems[id]
          ? <img className='add' onClick={() => addToCart(id)} src={assets.add_icon_white} alt='add' />
          : <div className='food-item-counter'>
            <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt="" />
            <p>{cartItems[id]}</p>
            <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt="" />
          </div>
        }
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p className='titel'>{name}</p>
          <div style={{display:'flex',flexDirection:'row'}}>
          {renderRatingStars()}
          </div>
        </div>

        <p className='food-item-desc'>{description}</p>
        <p className='food-item-price'>₹{price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
