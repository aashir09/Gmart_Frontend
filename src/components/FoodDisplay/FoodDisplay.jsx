import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../Context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'

const FoodDisplay = () => {
  const { food_list } = useContext(StoreContext)

  return (
    <>
      <div className='food-display' id='food-display'>
        <h2>Top Products near you</h2>
        <div className="food-display-list">
          {food_list.map((item, index) => {
            return <FoodItem key  ={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.thumbnail} rating={item.rating} />
          })}
        </div>
      </div>
      <div className='food-display' id='food-display'>
        <h2>Dairy, Bread & Eggs</h2>
        <div className="food-display-list">
          {food_list.map((item, index) => {
            return <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.thumbnail} rating={item.rating} />
          })}
        </div>
      </div>

      <div className='food b-display' id='food-display'>
        <h2>Snacks & Munchies</h2>
        <div className="food-display-list">
          {food_list.map((item, index) => {

            return <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.thumbnail} rating={item.rating} />

          })}
        </div>
      </div>

    </>
  )
}

export default FoodDisplay