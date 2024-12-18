import { useContext } from "react"
import { FoodItemType, StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";
import './FoodDisplay.css'

type FoodDisplayProps = {
    category: string;
}
const FoodDisplay : React.FC <FoodDisplayProps>= ({category}) => {
  const contextData = useContext(StoreContext);  
  return (
    <div className="food-display" id="food-display">
        <h2>Top dishes near you</h2>
        <div className="food-display-list">
            {
                contextData?.foodList?.map((foodItem:FoodItemType, index) => {
                    if (category ==="All" || category===foodItem.category) {
                        return <FoodItem item={foodItem} key={index} />
                    }
                })
            }
        </div>      
    </div>
  )
}

export default FoodDisplay