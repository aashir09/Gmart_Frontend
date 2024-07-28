import React, { useState, useEffect } from 'react';
import './Header.css';

const Header = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveIndex(prevIndex => (prevIndex === 2 ? 0 : prevIndex + 1)); 
    }, 5000); 

    return () => clearInterval(intervalId);
  }, []);

  const handleIndicatorClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className='header'>
      <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
        <ol className="carousel-indicators" style={{zIndex:1}}>
          <li 
            data-target="#carouselExampleIndicators" 
            data-slide-to="0" 
            className={activeIndex === 0 ? "active" : ""} 
            onClick={() => handleIndicatorClick(0)}
          ></li>
          <li 
            data-target="#carouselExampleIndicators" 
            data-slide-to="1" 
            className={activeIndex === 1 ? "active" : ""} 
            onClick={() => handleIndicatorClick(1)}
          ></li>
          <li 
            data-target="#carouselExampleIndicators" 
            data-slide-to="2" 
            className={activeIndex === 2 ? "active" : ""} 
            onClick={() => handleIndicatorClick(2)}
          ></li>
        </ol>
        <div className="carousel-inner">
          <div className={activeIndex === 0 ? "carousel-item active" : "carousel-item"}>
            <div className="header-contents">
              <h2>
              Don’t miss amazing grocery deals
              </h2>
              <p>Choose from a diverse menu featuring a delectable array of dishes crafted with the  finest ingredients and culinary expertise. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio incidunt rerum unde suscipit pariatur quos officiis voluptates voluptatem? Facilis, totam? </p>
              <button>View Menu</button>
            </div>
            <img className="d-block w-100" src="./assets/assets/slider-1.png" alt="First slide" />
          </div>
          <div className={activeIndex === 1 ? "carousel-item active" : "carousel-item"}>
          <div className="header-contents">
              <h2>
                Order Your Favourite food here
              </h2>
              <p>Choose from a diverse menu featuring a delectable array of dishes crafted with the  finest ingredients and culinary expertise. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio incidunt rerum unde suscipit pariatur quos officiis voluptates voluptatem? Facilis, totam? </p>
              <button>View Menu</button>
            </div>
            <img className="d-block w-100" src="./assets/assets/slider-2.png"alt="Second slide" />
          </div>
          <div className={activeIndex === 2 ? "carousel-item active" : "carousel-item"}>
          <div className="header-contents">
              <h2>
              Don’t miss amazing grocery deals
              </h2>
              <p>Choose from a diverse menu featuring a delectable array of dishes crafted with the  finest ingredients and culinary expertise. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio incidunt rerum unde suscipit pariatur quos officiis voluptates voluptatem? Facilis, totam? </p>
              <button>View Menu</button>
            </div>
            <img className="d-block w-100" src="./assets/assets/slider-1.png" alt="Third slide" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header;
