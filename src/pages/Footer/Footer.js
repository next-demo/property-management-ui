import React from 'react';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faTwitter,
  faGithub,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
// import { faLaptopCode } from "@fortawesome/free-solid-svg-icons";
import './Footer.css'

const Footer=()=> {
  return (
    <section className='content'>
    <footer className='site-footer'>
    <div className='row mb-5'>
    <div className='col-md-3 mb-5'>
    <h5>About</h5>
    <p className='text-white'>
    MyProperty.com is a high-end property portal that caters to a global market with its unique services and novel online features.
    Having been launched in the year 2006 by Times Group, 
    MyProperty has quickly risen to being the No. 1 Property Portal in India.
    </p>
    </div>

    <div className='col-md-3 mb-5'>
    <h5>Contact &amp; Address</h5>
    <ul className='list-unstyled footer-link'>
      <li class='d-flex'>
        <span className='me-3'>Address:</span>
        <span className='text-white'> ICRSAT,patancheru,Hyderbad,
        Telangana</span>
      </li>
      <li class='d-flex'>
        <span className='me-3'>Phone:</span>
        <span className='text-white'>90074829600</span>
      </li>
      <li class='d-flex'>
        <span className='me-3'>Email:</span>
        <span className='text-white'> MyProperty1234@gmail.com</span>
      </li>
    </ul>
    </div>

    <div className='col-md-3 mb-5 '>
    <h5 className='ml-4'>Quick links</h5>
    <ul className='list-unstyled-footer-link'>

    <li><a href='/Terms'>Terms and conditions</a></li>
    <li><a href='/Policy'>Privacy and Policy</a></li>
   
    </ul>
    </div>
    
    <div className='col-md-3'>
    <h5 className='ml-4'>Social media</h5>
    <ul className='list-unstyled-footer-link d-flex footer-social'>
    
          <a
            className="facebook"
            href="https://www.facebook.com/profile.php?id=100011637976786"
            target="_blank"
            rel="noreferrer"
            role="button">
            <FontAwesomeIcon icon={faFacebook} />
          </a>
     
  
          <a
            className="twitter"
            href="#"
            target="_blank"
            rel="noreferrer"
            role="button">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
     
     
          <a
            className="Linkedin"
            href="https://www.linkedin.com/in/aadarsh-yagnik/"
            target="_blank"
            rel="noreferrer"
            role="button">
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
     
     
          <a
            className="Github"
            href="https://github.com/SriSanthosh22"
            target="_blank"
            rel="noreferrer"
            role="button">
            <FontAwesomeIcon icon={faGithub} />
          </a>
     
    </ul>
    </div>
    </div>
    </footer>
    </section>
  );
}

export default Footer;