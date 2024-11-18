import React from "react";
import './footer.css'; // Import the CSS file

const Footer = () => {
  return (
    <footer className="footer-webfooter">
      <div className="newsletter-webfooter">
        <h2>Get Updated The Latest Newsletter</h2>
        <form className="newsletter-form-webfooter">
          <input type="email-webfooter" placeholder="Enter Email" required />
          <button type="submit">Subscribe Now</button>
        </form>
      </div>

      <div className="footer-content-webfooter">
        <div className="footer-logo-webfooter">
          <img src="https://s3.us-east-1.amazonaws.com/cdn.designcrowd.com/blog/tourism-logos-to-promote-your-happy-travels/airplane-flight-sky-travel-by-ions-brandcrowd.png" alt="Logo" />
          <h3>Discover Local</h3>
          <p>Rapidiously myocardinate cross-platform intellectual capital model. Appropriately create interactive infrastructures.</p>
          <div className="social-icons-webfooter">
            <a href="#"><i className="fab fa-facebook"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-linkedin"></i></a>
            <a href="#"><i className="fab fa-whatsapp"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
          </div>
        </div>

        <div className="footer-links-webfooter">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Our Service</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Tour Booking Now</a></li>
          </ul>
        </div>

        <div className="footer-address-webfooter">
          <h3>Address</h3>
          <p>+01 234 567 890</p>
          <p>+09 876 543 210</p>
          <p><a href="mailto:mailinfo00@tourm.com">mailinfo00@tourm.com</a></p>
          <p><a href="mailto:support24@tourm.com">support24@tourm.com</a></p>
          <p>789 Inner Lane, Holy park, California, USA</p>
        </div>

        <div className="footer-instagram-webfooter">
          <h3>Instagram Post</h3>
          <div className="instagram-images-webfooter">
            <img src="https://landicons.com/wp-content/uploads/2022/05/Preview-New_Delhi-Red_Fort-1.png" alt="Instagram 1" />
            <img src="https://msgcel.com/assets/img/jaipur-icon.png" alt="Instagram 2" />
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTqx-T3PqHNtI-27mKxOdheB-pzME9_11cIw&s" alt="Instagram 3" />
            <img src="https://cdn2.iconfinder.com/data/icons/indian-cities/64/Lucknow-512.png" alt="Instagram 4" />
            <img src="https://static.thenounproject.com/png/5301313-200.png" alt="Instagram 5" />
            {/* <img src="https://static.thenounproject.com/png/1039801-200.png" alt="Instagram 6" />
            <img src="https://cdn-icons-png.flaticon.com/512/317/317839.png" alt="Instagram 7"/>
            <img src="https://static-00.iconduck.com/assets.00/bangalore-icon-2038x2048-sltli6nt.png" alt="Instagram 8"/>
            <img src="https://cdn.iconscout.com/icon/premium/png-256-thumb/chennai-central-railway-station-1575705-1333994.png" alt="Instagram 8"/> */}
          </div>
        </div>
      </div>

      {/* <div className="footer-bottom-webfooter">
        <p>Copyright 2024 Tourm. All Rights Reserved.</p>
        <div className="payment-icons-webfooter">
          <img src="https://pngimg.com/d/mastercard_PNG16.png" alt="Mastercard" />
          <img src="https://static-00.iconduck.com/assets.00/visa-icon-2048x628-6yzgq2vq.png" alt="Visa" />
          <img src="https://static-00.iconduck.com/assets.00/paypal-icon-512x137-as29tjhk.png" alt="Paypal" />
          <img src="https://w7.pngwing.com/pngs/1022/196/png-transparent-apple-pay-brand-logo-flat-icon-thumbnail.png" alt="Apple Pay" />
        </div>
      </div> */}
    </footer>
  );
};

export default Footer;