import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';
import { assets } from '../../assets';
import './DetailProductView.css';
import ProductDescription from '../ProductDescription/ProductDescription';

const DetailProductView = () => {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);
  const { id } = useParams();
  const [selectedFood, setSelectedFood] = useState(null);
  const [activeImg, setActiveImg] = useState('');
  const [rating, setRating] = useState(0); // State to hold the current rating

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/products/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product details');
        }
        const data = await response.json();
        setSelectedFood(data);
        setActiveImg(data.images[0]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!selectedFood) {
    return <div>Loading...</div>;
  }

  const { name, price, description, salesPrice, images, category } = selectedFood;

  const handleImageClick = (imgSrc) => {
    setActiveImg(imgSrc);
  };

  const handleStarClick = (starRating) => {
    setRating(starRating);
    submitRating(id, starRating); // Submit rating when a star is clicked
  };

  const submitRating = async (productId, rating) => {
    try {
      const response = await fetch('http://localhost:3000/api/products/review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          productId: productId,
          rating: rating
        })
      });
      if (!response.ok) {
        throw new Error('Failed to submit rating');
      }
      // Optionally, you can update the state to reflect the new rating
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className='DetailProductView'>
        <div className='product_display_left'>
          <div className="product_display_img_list">
            {images.map((imgSrc, index) => (
              <img
                key={index}
                src={imgSrc}
                alt="Main Image"
                className={activeImg === imgSrc ? "active" : ""}
                onClick={() => handleImageClick(imgSrc)}
              />
            ))}
          </div>
          <div className="product_display_img">
            <img className='product_display_main_img' src={activeImg} alt="Main Image" />
          </div>
        </div>
        <div className='product_display_right'>
          <h1>{name}</h1>
          <div className="product_display_right_star">
            {/* Render stars */}
            {[1, 2, 3, 4, 5].map((star) => (
              <img
              style={{width:'20px',height:"20px"}}
                key={star}
                src={star <= rating ? assets.golden_star : assets.white_star}
                alt="Rating Star"
                onClick={() => handleStarClick(star)}
              />
            ))}
          </div>
          <div className="product_display_right_prices">
            <div className="product_display_right_price_old">₹ {salesPrice}</div>
            <div className="product_display_right_price_new">₹{price}</div>
          </div>
          <div className="product_display_right_description">{description}</div>

          {!cartItems[id] ? (
            <button onClick={() => addToCart(id)}>Add to Cart</button>
          ) : (
            <div className='addtocart'>
              <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt="Remove from Cart" />
              <p>{cartItems[id]}</p>
              <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt="Add to Cart" />
            </div>
          )}
          <p className='product_display_right_category'><span>Category :</span> {category}</p>
        </div>
      </div>
      <ProductDescription description={description} />
    </>
  );
};

export default DetailProductView;
