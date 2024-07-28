import React from 'react'
import './ProductDescription.css'
import { useParams } from 'react-router-dom';

import { assets } from '/src/assets';


const ProductDescription = ({ description }) => {

    return (
        <div className='descriptionbox'>
            <div className="descriptionbox-navigator">
                <div className="descriptionbox-nav-box">Description</div>
            </div>
            <div className="descriptionbox-description">
                <p>{description}</p>
            </div>
        </div>
    )
}

export default ProductDescription
