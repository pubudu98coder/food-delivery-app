import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'
import React from 'react';

type ExploreMenuProps = {
    category: string;
    setCategory: React.Dispatch<React.SetStateAction<string>>
}


// @ts-ignore: Unused destructured elements
const ExploreMenu: React.FC<ExploreMenuProps> = ({ category, setCategory }) => {
    const handleCategory = (menu_name: string) => {
        setCategory((prevCategory: string) => (prevCategory === menu_name ? "All" : menu_name));
    }
    console.log(category)
    return (
        <div className='explore-menu' id='explore-menu'>
            <h1>
                Explore our menu
            </h1>
            <p className="explore-menu-text">
                Choose from a diverse of menu featuring the delectable array of dishes
            </p>
            <div className="explore-menu-list">
                {
                    menu_list.map((item, index) => {
                        return (
                            <div onClick={() => handleCategory(item.menu_name)} key={index} className="explore-menu-list-item">
                                <img className={category===item.menu_name? "active":""} src={item.menu_image} alt="" />
                                <p>{item.menu_name}</p>
                            </div>
                        );
                    })
                }
            </div>
            <h3>{category}</h3>
            <hr />
        </div>
    )
}

export default ExploreMenu