import React from 'react';
import './ClientResponse.css';

const ClientResponse=()=>{
    return(
        <div className='div-test'>
            <section className="testimonials-section">
                <h1>What Our Clients Say</h1>
                <div className="testimonials">
                <div className="testimonial-card">
                    <p>"Discover Local made our honeymoon a dream come true!"</p>
                    <span>- Sarah & Mark</span>
                </div>
                <div className="testimonial-card">
                    <p>"A flawless experience, will definitely book again."</p>
                    <span>- John D.</span>
                </div>
                <div className="testimonial-card">
                    <p>"Best travel agency I’ve ever dealt with!"</p>
                    <span>- Linda S.</span>
                </div>
                </div>
        </section>
        </div>
    )
}
export default ClientResponse;