// // Import necessary components and styles
// import { Swiper, SwiperSlide } from 'swiper/react';

// import '@fortawesome/fontawesome-free/css/all.min.css';
// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';

// import './Tourguide.css'; // Your custom CSS

// const TourGuideSwiper = () => {
//     return (
//         <Swiper
//             spaceBetween={30}
//             slidesPerView={3}
//             loop={true}
//             grabCursor={true}
//             pagination={{ clickable: true }}
//             breakpoints={{
//                 640: {
//                     slidesPerView: 1,
//                 },
//                 768: {
//                     slidesPerView: 2,
//                 },
//                 1024: {
//                     slidesPerView: 3,
//                 },
//             }}
//         >
//              {/* <div className="tour-categories-container">
//       <h2 className="tour-categories-heading-top">Wonderful Places for You</h2>
//       <h2 className="tour-categories-heading">Tour Categories</h2>
//       </div> */}
//             <SwiperSlide>
           
//                 <div className="tour-guide-card">
//                     <img src="/guide.png" alt="Tourist Guide 1" className="background-image" />
//                     <div className="guide-details">
//                         <img src="/g1.png" alt="Profile" className="profile-image" />
//                         <h3>Rebeka Maliha</h3>
//                         <p>Tourist Guide</p>
//                         <div className="social-icons">
//                             <i className="fab fa-facebook"></i>
//                             <i className="fab fa-twitter"></i>
//                             <i className="fab fa-linkedin"></i>
//                             <i className="fab fa-youtube"></i>
//                             <i className="fab fa-instagram"></i>
//                         </div>
//                     </div>
//                 </div>
//             </SwiperSlide>
//             <SwiperSlide>
//                 <div className="tour-guide-card">
//                     <img src="/guide2.jpeg" alt="Tourist Guide 1" className="background-image" />
//                     <div className="guide-details">
//                         <img src="/g2.png" alt="Profile" className="profile-image" />
//                         <h3>Rebeka Maliha</h3>
//                         <p>Tourist Guide</p>
//                         <div className="social-icons">
//                             <i className="fab fa-facebook"></i>
//                             <i className="fab fa-twitter"></i>
//                             <i className="fab fa-linkedin"></i>
//                             <i className="fab fa-youtube"></i>
//                             <i className="fab fa-instagram"></i>
//                         </div>
//                     </div>
//                 </div>
//             </SwiperSlide>
//             <SwiperSlide>
//                 <div className="tour-guide-card">
//                     <img src="/guide3.jpeg" alt="Tourist Guide 1" className="background-image" />
//                     <div className="guide-details">
//                         <img src="/g3.jpeg" alt="Profile" className="profile-image" />
//                         <h3>Rebeka Maliha</h3>
//                         <p>Tourist Guide</p>
//                         <div className="social-icons">
//                             <i className="fab fa-facebook"></i>
//                             <i className="fab fa-twitter"></i>
//                             <i className="fab fa-linkedin"></i>
//                             <i className="fab fa-youtube"></i>
//                             <i className="fab fa-instagram"></i>
//                         </div>
//                     </div>
//                 </div>
//             </SwiperSlide>
            
//             {/* Repeat SwiperSlide for other guides */}
//         </Swiper>
      
//     );
// };

// export default TourGuideSwiper;
// Import necessary components and styles

import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './Tourguide.css'; // Your custom CSS

const TourGuideSwiper = () => {
    const [guides, setGuides] = useState([]); // State to store guide data

    // Fetch guide data from the backend
    useEffect(() => {
        const fetchGuides = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/get_all_guides/'); // Replace with your API endpoint
                const data = await response.json();
                setGuides(data); // Store the data in state
            } catch (error) {
                console.error('Error fetching guides:', error);
            }
        };

        fetchGuides();
    }, []);

    return (
        <div className="tour-guide-swiper-container">
            <h1 className='h1-guide'>Meet the Guide</h1>
            <h2 className='h2-guide'>Meet Our Tour Guide</h2>
            <Swiper
                modules={[Pagination, Navigation, Autoplay]}
                spaceBetween={20}
                slidesPerView={3}
                loop={true}
                grabCursor={true}
                pagination={{ clickable: true }}
                navigation={true}
                autoplay={{
                    delay: 3000, // 3 seconds delay
                    disableOnInteraction: false,
                }}
                breakpoints={{
                    640: {
                        slidesPerView: 1,
                    },
                    768: {
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 3,
                    },
                }}
            >
                {guides.map(guide => (
                    <SwiperSlide key={guide.id}>
                        <div className="tour-guide-card">
                            <img src={guide.image[0]} alt="Tourist Guide" className="background-image" /> {/* Use the first image */}
                            <div className="guide-details">
                                <img src={guide.image[0]} alt="Profile" className="profile-image" /> {/* Use the first image for profile */}
                                <h3>{guide.name}</h3>
                                <p>Tourist Guide</p>
                                <div className="social-icons">
                                    <i className="fab fa-facebook"></i>
                                    <i className="fab fa-twitter"></i>
                                    <i className="fab fa-linkedin"></i>
                                    <i className="fab fa-youtube"></i>
                                    <i className="fab fa-instagram"></i>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default TourGuideSwiper;
