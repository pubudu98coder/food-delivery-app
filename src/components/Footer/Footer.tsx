import { assets } from '../../assets/assets'
import './Footer.css'
const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="" />
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est natus voluptates, enim sapiente quasi voluptate perferendis. Laborum ipsam sit voluptates animi accusantium! Quo laboriosam, non consequatur cupiditate similique consequuntur maiores.</p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>Athukorale</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>Get in touch</h2>  
          <ul>
            <li>+94 765492487</li>
            <li>athukorale@gmail.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className='footer-copyright'> Copyright 2024 &copy; Athukorale corp - All right reserved</p>
    </div>
  )
}

export default Footer