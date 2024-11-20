// import React from "react";
// import { useNavigate } from "react-router-dom";
// import './Packages.css'; // For styling
// import { FaStar, FaRupeeSign } from 'react-icons/fa';
// import Navbar from "../components/Navbar";
// const packageData = 
// [
//     {
//         "id": "66f16cf9c000408191e9d6db",
//         "name": "Royal Rajasthan Adventure",
//         "description": "Explore the royal palaces and deserts of Rajasthan.",
//         "state": "Rajasthan",
//         "photos": [
//             "https://media.istockphoto.com/id/942152278/photo/gadisar-lake-at-jaisalmer-rajasthan-at-sunrise-with-ancient-temples-and-archaeological-ruins.jpg?s=612x612&w=0&k=20&c=HvhbHZ8HH_lAjAAI2pmqL4mUipyyAwy31qp5jjKQTO0=",
//             "https://media.istockphoto.com/id/494659822/photo/india-bada-bagh-cenotaph-in-jaisalmer-rajasthan.jpg?s=612x612&w=0&k=20&c=jKaURS6SI4HPmLKWv_m4MaFh2RgC94FoABfinqJPMGU=",
//             "https://media.istockphoto.com/id/805563154/photo/mehrangharh-fort-and-jaswant-thada-mausoleum-in-jodhpur-rajasthan-india.jpg?s=612x612&w=0&k=20&c=5r9UxPkz9mIkfAIFPLyTwqBQyqSO7mcAdQtcqGHOboA=",
//             "https://cdn.pixabay.com/photo/2021/04/06/11/22/hawa-mahal-6156123_640.jpg"
//         ],
//         "rating": 4.7,
//         "number_of_person_views": 200,
//         "price": 399.99,
//         "best_time": "Winter",
//         "additional_info": "Includes camel safari and cultural shows.",
//         "category": "ADVENTURE",
//         "type": "DELUXE",
//         "available_dates": [
//             "2024-11-01T00:00:00Z",
//             "2024-12-15T00:00:00Z",
//             "2025-01-01T00:00:00Z"
//         ],
//         "slots": {
//             "2024-11-01": 50,
//             "2024-12-15": 45,
//             "2025-01-01": 40
//         },
//         "itinerary": [
//             {
//                 "day": 1,
//                 "description": "Arrival in Jaipur and visit to Amber Fort.",
//                 "activities": "Sightseeing, Cultural Experience",
//                 "images": [
//                     "https://www.tourism.rajasthan.gov.in/content/dam/rajasthan-tourism/english/city/menu/Tonk_jaa_masjid01.jpg"
//                 ]
//             },
//             {
//                 "day": 2,
//                 "description": "Exploring the Blue City of Jodhpur.",
//                 "activities": "City Tour, Photography",
//                 "images": [
//                     "https://static.toiimg.com/photo/36660445.cms"
//                 ]
//             },
//             {
//                 "day": 3,
//                 "description": "Desert safari in Jaisalmer.",
//                 "activities": "Camel Safari, Desert Camp",
//                 "images": [
//                     "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/c3/11/cd/caption.jpg?w=500&h=400&s=1"            
//                 ],
//             },
//             {
//                 "day": 4,
//                 "description": "Visit to Udaipur, the City of Lakes.",
//                 "activities": "Boat Ride, Palace Visit",
//                 "images": [
//                     "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/26/33/75/c5/caption.jpg?w=1200&h=-1&s=1"
//                 ]
//             },
//             {
//                 "day": 5,
//                 "description": "Departure from Udaipur.",
//                 "activities": "Free Time, Souvenir Shopping",
//                 "images": [
//                     "https://images.herzindagi.info/image/2022/Jul/best-shopping-markets-in-udaipur.jpg"
//                 ]
//             }
//         ]
//     },
//     {
//         "id": "66f16d14c000408191e9d6dc",
//         "name": "Kerala Backwaters Escape",
//         "description": "Relax on houseboats in the serene Kerala backwaters.",
//         "state": "Kerala",
//         "photos": [
//             "https://example.com/kerala1.jpg",
//             "https://example.com/kerala2.jpg",
//             "https://example.com/kerala3.jpg",
//             "https://example.com/kerala4.jpg"
//         ],
//         "rating": 4.9,
//         "number_of_person_views": 300,
//         "price": 499.99,
//         "best_time": "Monsoon",
//         "additional_info": "Includes houseboat stay and Ayurvedic treatments.",
//         "category": "WILDLIFE",
//         "type": "LUXURY",
//         "available_dates": [
//             "2024-07-01T00:00:00Z",
//             "2024-08-15T00:00:00Z",
//             "2024-09-01T00:00:00Z"
//         ],
//         "slots": {
//             "2024-07-01": 60,
//             "2024-08-15": 50,
//             "2024-09-01": 40
//         },
//         "itinerary": [
//             {
//                 "day": 1,
//                 "description": "Arrival in Cochin and backwater cruise.",
//                 "activities": "Houseboat Stay, Village Tour",
//                 "images": [
//                     "https://example.com/kerala_day1.jpg"
//                 ]
//             },
//             {
//                 "day": 2,
//                 "description": "Exploring Alleppey backwaters.",
//                 "activities": "Fishing, Photography",
//                 "images": [
//                     "https://example.com/kerala_day2.jpg"
//                 ]
//             },
//             {
//                 "day": 3,
//                 "description": "Visit to Kumarakom Bird Sanctuary.",
//                 "activities": "Bird Watching, Nature Walk",
//                 "images": [
//                     "https://example.com/kerala_day3.jpg"
//                 ]
//             },
//             {
//                 "day": 4,
//                 "description": "Day at Munnar Tea Gardens.",
//                 "activities": "Tea Plantation Tour, Trekking",
//                 "images": [
//                     "https://example.com/kerala_day4.jpg"
//                 ]
//             },
//             {
//                 "day": 5,
//                 "description": "Departure from Cochin.",
//                 "activities": "Shopping, Leisure Time",
//                 "images": [
//                     "https://example.com/kerala_day5.jpg"
//                 ]
//             }
//         ]
//     },
//     {
//         "id": "66f16d3fc000408191e9d6dd",
//         "name": "Goa Beach Bonanza",
//         "description": "Enjoy the sun, sand, and sea at the beaches of Goa.",
//         "state": "Goa",
//         "photos": [
//             "https://example.com/goa1.jpg",
//             "https://example.com/goa2.jpg",
//             "https://example.com/goa3.jpg",
//             "https://example.com/goa4.jpg"
//         ],
//         "rating": 4.6,
//         "number_of_person_views": 180,
//         "price": 299.99,
//         "best_time": "Winter",
//         "additional_info": "Includes beach parties and water sports.",
//         "category": "BEACH",
//         "type": "ECONOMY",
//         "available_dates": [
//             "2024-12-01T00:00:00Z",
//             "2024-12-25T00:00:00Z",
//             "2025-01-10T00:00:00Z"
//         ],
//         "slots": {
//             "2024-12-01": 30,
//             "2024-12-25": 25,
//             "2025-01-10": 20
//         },
//         "itinerary": [
//             {
//                 "day": 1,
//                 "description": "Arrival in Goa and beach exploration.",
//                 "activities": "Beach Walk, Sunset View",
//                 "images": [
//                     "https://example.com/goa_day1.jpg"
//                 ]
//             },
//             {
//                 "day": 2,
//                 "description": "Water sports and beach party.",
//                 "activities": "Jet Ski, Beach Party",
//                 "images": [
//                     "https://example.com/goa_day2.jpg"
//                 ]
//             },
//             {
//                 "day": 3,
//                 "description": "Visit to historical churches.",
//                 "activities": "Sightseeing, Cultural Tour",
//                 "images": [
//                     "https://example.com/goa_day3.jpg"
//                 ]
//             },
//             {
//                 "day": 4,
//                 "description": "Island hopping and snorkeling.",
//                 "activities": "Boat Ride, Snorkeling",
//                 "images": [
//                     "https://example.com/goa_day4.jpg"
//                 ]
//             },
//             {
//                 "day": 5,
//                 "description": "Departure from Goa.",
//                 "activities": "Shopping, Free Time",
//                 "images": [
//                     "https://example.com/goa_day5.jpg"
//                 ]
//             }
//         ]
//     },
//     {
//         "id": "66f16d7cc000408191e9d6de",
//         "name": "Himalayan Trek Adventure",
//         "description": "Experience the serene beauty of the Himalayas with this trekking package.",
//         "state": "Uttarakhand",
//         "photos": [
//             "https://example.com/uttarakhand1.jpg",
//             "https://example.com/uttarakhand2.jpg",
//             "https://example.com/uttarakhand3.jpg",
//             "https://example.com/uttarakhand4.jpg"
//         ],
//         "rating": 4.9,
//         "number_of_person_views": 500,
//         "price": 599.99,
//         "best_time": "Summer",
//         "additional_info": "Includes guide and all meals during the trek.",
//         "category": "MOUNTAIN",
//         "type": "LUXURY",
//         "available_dates": [
//             "2024-05-01T00:00:00Z",
//             "2024-06-01T00:00:00Z",
//             "2024-07-01T00:00:00Z"
//         ],
//         "slots": {
//             "2024-05-01": 15,
//             "2024-06-01": 20,
//             "2024-07-01": 25
//         },
//         "itinerary": [
//             {
//                 "day": 1,
//                 "description": "Arrival in Rishikesh and orientation.",
//                 "activities": "Orientation, Gear Check",
//                 "images": [
//                     "https://example.com/uttarakhand_day1.jpg"
//                 ]
//             },
//             {
//                 "day": 2,
//                 "description": "Start of the trek from Rishikesh.",
//                 "activities": "Trekking, Nature Walk",
//                 "images": [
//                     "https://example.com/uttarakhand_day2.jpg"
//                 ]
//             },
//             {
//                 "day": 3,
//                 "description": "Reach the base camp in the Himalayas.",
//                 "activities": "Camping, Bonfire",
//                 "images": [
//                     "https://example.com/uttarakhand_day3.jpg"
//                 ]
//             },
//             {
//                 "day": 4,
//                 "description": "Summit trek and return to base camp.",
//                 "activities": "Summit, Photography",
//                 "images": [
//                     "https://example.com/uttarakhand_day4.jpg"
//                 ]
//             },
//             {
//                 "day": 5,
//                 "description": "Departure from Rishikesh.",
//                 "activities": "Wrap-Up, Departure",
//                 "images": [
//                     "https://example.com/uttarakhand_day5.jpg"
//                 ]
//             }
//         ]
//     },
//     {
//         "id": "66f16dfbc000408191e9d6df",
//         "name": "Kashmir Valley Escape",
//         "description": "Discover the beautiful valleys of Kashmir.",
//         "state": "Jammu and Kashmir",
//         "photos": [
//             "https://example.com/kashmir1.jpg",
//             "https://example.com/kashmir2.jpg",
//             "https://example.com/kashmir3.jpg",
//             "https://example.com/kashmir4.jpg"
//         ],
//         "rating": 4.8,
//         "number_of_person_views": 450,
//         "price": 549.99,
//         "best_time": "Spring",
//         "additional_info": "Includes shikara ride and saffron farm visit.",
//         "category": "BEACH",
//         "type": "DELUXE",
//         "available_dates": [
//             "2024-03-01T00:00:00Z",
//             "2024-04-01T00:00:00Z",
//             "2024-05-01T00:00:00Z"
//         ],
//         "slots": {
//             "2024-03-01": 35,
//             "2024-04-01": 30,
//             "2024-05-01": 25
//         },
//         "itinerary": [
//             {
//                 "day": 1,
//                 "description": "Arrival in Srinagar and shikara ride.",
//                 "activities": "Shikara Ride, Houseboat Stay",
//                 "images": [
//                     "https://example.com/kashmir_day1.jpg"
//                 ]
//             },
//             {
//                 "day": 2,
//                 "description": "Exploring Gulmarg meadows.",
//                 "activities": "Cable Car, Hiking",
//                 "images": [
//                     "https://example.com/kashmir_day2.jpg"
//                 ]
//             },
//             {
//                 "day": 3,
//                 "description": "Visit to Pahalgam valley.",
//                 "activities": "Sightseeing, Nature Walk",
//                 "images": [
//                     "https://example.com/kashmir_day3.jpg"
//                 ]
//             },
//             {
//                 "day": 4,
//                 "description": "Saffron farm tour and local market visit.",
//                 "activities": "Cultural Tour, Shopping",
//                 "images": [
//                     "https://example.com/kashmir_day4.jpg"
//                 ]
//             },
//             {
//                 "day": 5,
//                 "description": "Departure from Srinagar.",
//                 "activities": "Shopping, Free Time",
//                 "images": [
//                     "https://example.com/kashmir_day5.jpg"
//                 ]
//             }
//         ]
//     },
//     {
//         "id": "66f16e2ec000408191e9d6e0",
//         "name": "Spiritual Varanasi Journey",
//         "description": "A spiritual retreat to the holy city of Varanasi.",
//         "state": "Uttar Pradesh",
//         "photos": [
//             "https://example.com/varanasi1.jpg",
//             "https://example.com/varanasi2.jpg",
//             "https://example.com/varanasi3.jpg",
//             "https://example.com/varanasi4.jpg"
//         ],
//         "rating": 4.5,
//         "number_of_person_views": 320,
//         "price": 199.99,
//         "best_time": "Winter",
//         "additional_info": "Includes Ganga Aarti and boat ride.",
//         "category": "BEACH",
//         "type": "DELUXE",
//         "available_dates": [
//             "2024-01-15T00:00:00Z",
//             "2024-02-01T00:00:00Z",
//             "2024-03-01T00:00:00Z"
//         ],
//         "slots": {
//             "2024-01-15": 40,
//             "2024-02-01": 35,
//             "2024-03-01": 30
//         },
//         "itinerary": [
//             {
//                 "day": 1,
//                 "description": "Arrival in Varanasi and Ganga Aarti.",
//                 "activities": "Evening Aarti, Cultural Experience",
//                 "images": [
//                     "https://example.com/varanasi_day1.jpg"
//                 ]
//             },
//             {
//                 "day": 2,
//                 "description": "Boat ride on the Ganges.",
//                 "activities": "Morning Boat Ride, Temple Visit",
//                 "images": [
//                     "https://example.com/varanasi_day2.jpg"
//                 ]
//             },
//             {
//                 "day": 3,
//                 "description": "Visit to Sarnath Buddhist site.",
//                 "activities": "Historical Tour, Meditation",
//                 "images": [
//                     "https://example.com/varanasi_day3.jpg"
//                 ]
//             },
//             {
//                 "day": 4,
//                 "description": "Walking tour of old Varanasi.",
//                 "activities": "Walking Tour, Market Visit",
//                 "images": [
//                     "https://example.com/varanasi_day4.jpg"
//                 ]
//             },
//             {
//                 "day": 5,
//                 "description": "Departure from Varanasi.",
//                 "activities": "Leisure Time, Departure",
//                 "images": [
//                     "https://example.com/varanasi_day5.jpg"
//                 ]
//             }
//         ]
//     }
// ]
// import React, { useState } from 'react';
// import { Star, Calendar, DollarSign, Clock, Users, MapPin, ChevronRight, X, Camera, Compass, Sunrise, Sunset, Coffee, Utensils } from 'lucide-react';

// const packages = [
//       {
//         "id": "66f16cf9c000408191e9d6db",
//         "name": "Royal Rajasthan Adventure",
//         "description": "Explore the royal palaces and deserts of Rajasthan.",
//         "state": "Rajasthan",
//         "photos": [
//             "https://media.istockphoto.com/id/942152278/photo/gadisar-lake-at-jaisalmer-rajasthan-at-sunrise-with-ancient-temples-and-archaeological-ruins.jpg?s=612x612&w=0&k=20&c=HvhbHZ8HH_lAjAAI2pmqL4mUipyyAwy31qp5jjKQTO0=",
//             "https://media.istockphoto.com/id/494659822/photo/india-bada-bagh-cenotaph-in-jaisalmer-rajasthan.jpg?s=612x612&w=0&k=20&c=jKaURS6SI4HPmLKWv_m4MaFh2RgC94FoABfinqJPMGU=",
//             "https://media.istockphoto.com/id/805563154/photo/mehrangharh-fort-and-jaswant-thada-mausoleum-in-jodhpur-rajasthan-india.jpg?s=612x612&w=0&k=20&c=5r9UxPkz9mIkfAIFPLyTwqBQyqSO7mcAdQtcqGHOboA=",
//             "https://cdn.pixabay.com/photo/2021/04/06/11/22/hawa-mahal-6156123_640.jpg"
//         ],
//         "rating": 4.7,
//         "number_of_person_views": 200,
//         "price": 399.99,
//         "best_time": "Winter",
//         "additional_info": "Includes camel safari and cultural shows.",
//         "category": "ADVENTURE",
//         "type": "DELUXE",
//         "available_dates": [
//             "2024-11-01T00:00:00Z",
//             "2024-12-15T00:00:00Z",
//             "2025-01-01T00:00:00Z"
//         ],
//         "slots": {
//             "2024-11-01": 2,
//             "2024-12-15": 25,
//             "2025-01-01": 40
//         },
//         "itinerary": [
//             {
//                 "day": 1,
//                 "description": "Arrival in Jaipur and visit to Amber Fort.",
//                 "activities": "Sightseeing, Cultural Experience",
//                 "images": [
//                     "https://www.tourism.rajasthan.gov.in/content/dam/rajasthan-tourism/english/city/menu/Tonk_jaa_masjid01.jpg"
//                 ]
//             },
//             {
//                 "day": 2,
//                 "description": "Exploring the Blue City of Jodhpur.",
//                 "activities": "City Tour, Photography",
//                 "images": [
//                     "https://static.toiimg.com/photo/36660445.cms"
//                 ]
//             },
//             {
//                 "day": 3,
//                 "description": "Desert safari in Jaisalmer.",
//                 "activities": "Camel Safari, Desert Camp",
//                 "images": [
//                     "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/c3/11/cd/caption.jpg?w=500&h=400&s=1"            
//                 ],
//             },
//             {
//                 "day": 4,
//                 "description": "Visit to Udaipur, the City of Lakes.",
//                 "activities": "Boat Ride, Palace Visit",
//                 "images": [
//                     "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/26/33/75/c5/caption.jpg?w=1200&h=-1&s=1"
//                 ]
//             },
//             {
//                 "day": 5,
//                 "description": "Departure from Udaipur.",
//                 "activities": "Free Time, Souvenir Shopping",
//                 "images": [
//                     "https://images.herzindagi.info/image/2022/Jul/best-shopping-markets-in-udaipur.jpg"
//                 ]
//             }
//         ]
//     },
//     {
//         "id": "66f16d14c000408191e9d6dc",
//         "name": "Kerala Backwaters Escape",
//         "description": "Relax on houseboats in the serene Kerala backwaters.",
//         "state": "Kerala",
//         "photos": [
//             "https://example.com/kerala1.jpg",
//             "https://example.com/kerala2.jpg",
//             "https://example.com/kerala3.jpg",
//             "https://example.com/kerala4.jpg"
//         ],
//         "rating": 4.9,
//         "number_of_person_views": 300,
//         "price": 499.99,
//         "best_time": "Monsoon",
//         "additional_info": "Includes houseboat stay and Ayurvedic treatments.",
//         "category": "WILDLIFE",
//         "type": "LUXURY",
//         "available_dates": [
//             "2024-07-01T00:00:00Z",
//             "2024-08-15T00:00:00Z",
//             "2024-09-01T00:00:00Z"
//         ],
//         "slots": {
//             "2024-07-01": 60,
//             "2024-08-15": 50,
//             "2024-09-01": 40
//         },
//         "itinerary": [
//             {
//                 "day": 1,
//                 "description": "Arrival in Cochin and backwater cruise.",
//                 "activities": "Houseboat Stay, Village Tour",
//                 "images": [
//                     "https://example.com/kerala_day1.jpg"
//                 ]
//             },
//             {
//                 "day": 2,
//                 "description": "Exploring Alleppey backwaters.",
//                 "activities": "Fishing, Photography",
//                 "images": [
//                     "https://example.com/kerala_day2.jpg"
//                 ]
//             },
//             {
//                 "day": 3,
//                 "description": "Visit to Kumarakom Bird Sanctuary.",
//                 "activities": "Bird Watching, Nature Walk",
//                 "images": [
//                     "https://example.com/kerala_day3.jpg"
//                 ]
//             },
//             {
//                 "day": 4,
//                 "description": "Day at Munnar Tea Gardens.",
//                 "activities": "Tea Plantation Tour, Trekking",
//                 "images": [
//                     "https://example.com/kerala_day4.jpg"
//                 ]
//             },
//             {
//                 "day": 5,
//                 "description": "Departure from Cochin.",
//                 "activities": "Shopping, Leisure Time",
//                 "images": [
//                     "https://example.com/kerala_day5.jpg"
//                 ]
//             }
//         ]
//     },
//     {
//         "id": "66f16d3fc000408191e9d6dd",
//         "name": "Goa Beach Bonanza",
//         "description": "Enjoy the sun, sand, and sea at the beaches of Goa.",
//         "state": "Goa",
//         "photos": [
//             "https://example.com/goa1.jpg",
//             "https://example.com/goa2.jpg",
//             "https://example.com/goa3.jpg",
//             "https://example.com/goa4.jpg"
//         ],
//         "rating": 4.6,
//         "number_of_person_views": 180,
//         "price": 299.99,
//         "best_time": "Winter",
//         "additional_info": "Includes beach parties and water sports.",
//         "category": "BEACH",
//         "type": "ECONOMY",
//         "available_dates": [
//             "2024-12-01T00:00:00Z",
//             "2024-12-25T00:00:00Z",
//             "2025-01-10T00:00:00Z"
//         ],
//         "slots": {
//             "2024-12-01": 30,
//             "2024-12-25": 25,
//             "2025-01-10": 20
//         },
//         "itinerary": [
//             {
//                 "day": 1,
//                 "description": "Arrival in Goa and beach exploration.",
//                 "activities": "Beach Walk, Sunset View",
//                 "images": [
//                     "https://example.com/goa_day1.jpg"
//                 ]
//             },
//             {
//                 "day": 2,
//                 "description": "Water sports and beach party.",
//                 "activities": "Jet Ski, Beach Party",
//                 "images": [
//                     "https://example.com/goa_day2.jpg"
//                 ]
//             },
//             {
//                 "day": 3,
//                 "description": "Visit to historical churches.",
//                 "activities": "Sightseeing, Cultural Tour",
//                 "images": [
//                     "https://example.com/goa_day3.jpg"
//                 ]
//             },
//             {
//                 "day": 4,
//                 "description": "Island hopping and snorkeling.",
//                 "activities": "Boat Ride, Snorkeling",
//                 "images": [
//                     "https://example.com/goa_day4.jpg"
//                 ]
//             },
//             {
//                 "day": 5,
//                 "description": "Departure from Goa.",
//                 "activities": "Shopping, Free Time",
//                 "images": [
//                     "https://example.com/goa_day5.jpg"
//                 ]
//             }
//         ]
//     },
//     {
//         "id": "66f16d7cc000408191e9d6de",
//         "name": "Himalayan Trek Adventure",
//         "description": "Experience the serene beauty of the Himalayas with this trekking package.",
//         "state": "Uttarakhand",
//         "photos": [
//             "https://example.com/uttarakhand1.jpg",
//             "https://example.com/uttarakhand2.jpg",
//             "https://example.com/uttarakhand3.jpg",
//             "https://example.com/uttarakhand4.jpg"
//         ],
//         "rating": 4.9,
//         "number_of_person_views": 500,
//         "price": 599.99,
//         "best_time": "Summer",
//         "additional_info": "Includes guide and all meals during the trek.",
//         "category": "MOUNTAIN",
//         "type": "LUXURY",
//         "available_dates": [
//             "2024-05-01T00:00:00Z",
//             "2024-06-01T00:00:00Z",
//             "2024-07-01T00:00:00Z"
//         ],
//         "slots": {
//             "2024-05-01": 15,
//             "2024-06-01": 20,
//             "2024-07-01": 25
//         },
//         "itinerary": [
//             {
//                 "day": 1,
//                 "description": "Arrival in Rishikesh and orientation.",
//                 "activities": "Orientation, Gear Check",
//                 "images": [
//                     "https://example.com/uttarakhand_day1.jpg"
//                 ]
//             },
//             {
//                 "day": 2,
//                 "description": "Start of the trek from Rishikesh.",
//                 "activities": "Trekking, Nature Walk",
//                 "images": [
//                     "https://example.com/uttarakhand_day2.jpg"
//                 ]
//             },
//             {
//                 "day": 3,
//                 "description": "Reach the base camp in the Himalayas.",
//                 "activities": "Camping, Bonfire",
//                 "images": [
//                     "https://example.com/uttarakhand_day3.jpg"
//                 ]
//             },
//             {
//                 "day": 4,
//                 "description": "Summit trek and return to base camp.",
//                 "activities": "Summit, Photography",
//                 "images": [
//                     "https://example.com/uttarakhand_day4.jpg"
//                 ]
//             },
//             {
//                 "day": 5,
//                 "description": "Departure from Rishikesh.",
//                 "activities": "Wrap-Up, Departure",
//                 "images": [
//                     "https://example.com/uttarakhand_day5.jpg"
//                 ]
//             }
//         ]
//     },
//     {
//         "id": "66f16dfbc000408191e9d6df",
//         "name": "Kashmir Valley Escape",
//         "description": "Discover the beautiful valleys of Kashmir.",
//         "state": "Jammu and Kashmir",
//         "photos": [
//             "https://example.com/kashmir1.jpg",
//             "https://example.com/kashmir2.jpg",
//             "https://example.com/kashmir3.jpg",
//             "https://example.com/kashmir4.jpg"
//         ],
//         "rating": 4.8,
//         "number_of_person_views": 450,
//         "price": 549.99,
//         "best_time": "Spring",
//         "additional_info": "Includes shikara ride and saffron farm visit.",
//         "category": "BEACH",
//         "type": "DELUXE",
//         "available_dates": [
//             "2024-03-01T00:00:00Z",
//             "2024-04-01T00:00:00Z",
//             "2024-05-01T00:00:00Z"
//         ],
//         "slots": {
//             "2024-03-01": 35,
//             "2024-04-01": 30,
//             "2024-05-01": 25
//         },
//         "itinerary": [
//             {
//                 "day": 1,
//                 "description": "Arrival in Srinagar and shikara ride.",
//                 "activities": "Shikara Ride, Houseboat Stay",
//                 "images": [
//                     "https://example.com/kashmir_day1.jpg"
//                 ]
//             },
//             {
//                 "day": 2,
//                 "description": "Exploring Gulmarg meadows.",
//                 "activities": "Cable Car, Hiking",
//                 "images": [
//                     "https://example.com/kashmir_day2.jpg"
//                 ]
//             },
//             {
//                 "day": 3,
//                 "description": "Visit to Pahalgam valley.",
//                 "activities": "Sightseeing, Nature Walk",
//                 "images": [
//                     "https://example.com/kashmir_day3.jpg"
//                 ]
//             },
//             {
//                 "day": 4,
//                 "description": "Saffron farm tour and local market visit.",
//                 "activities": "Cultural Tour, Shopping",
//                 "images": [
//                     "https://example.com/kashmir_day4.jpg"
//                 ]
//             },
//             {
//                 "day": 5,
//                 "description": "Departure from Srinagar.",
//                 "activities": "Shopping, Free Time",
//                 "images": [
//                     "https://example.com/kashmir_day5.jpg"
//                 ]
//             }
//         ]
//     },
//     {
//         "id": "66f16e2ec000408191e9d6e0",
//         "name": "Spiritual Varanasi Journey",
//         "description": "A spiritual retreat to the holy city of Varanasi.",
//         "state": "Uttar Pradesh",
//         "photos": [
//             "https://example.com/varanasi1.jpg",
//             "https://example.com/varanasi2.jpg",
//             "https://example.com/varanasi3.jpg",
//             "https://example.com/varanasi4.jpg"
//         ],
//         "rating": 4.5,
//         "number_of_person_views": 320,
//         "price": 199.99,
//         "best_time": "Winter",
//         "additional_info": "Includes Ganga Aarti and boat ride.",
//         "category": "BEACH",
//         "type": "DELUXE",
//         "available_dates": [
//             "2024-01-15T00:00:00Z",
//             "2024-02-01T00:00:00Z",
//             "2024-03-01T00:00:00Z"
//         ],
//         "slots": {
//             "2024-01-15": 40,
//             "2024-02-01": 35,
//             "2024-03-01": 30
//         },
//         "itinerary": [
//             {
//                 "day": 1,
//                 "description": "Arrival in Varanasi and Ganga Aarti.",
//                 "activities": "Evening Aarti, Cultural Experience",
//                 "images": [
//                     "https://example.com/varanasi_day1.jpg"
//                 ]
//             },
//             {
//                 "day": 2,
//                 "description": "Boat ride on the Ganges.",
//                 "activities": "Morning Boat Ride, Temple Visit",
//                 "images": [
//                     "https://example.com/varanasi_day2.jpg"
//                 ]
//             },
//             {
//                 "day": 3,
//                 "description": "Visit to Sarnath Buddhist site.",
//                 "activities": "Historical Tour, Meditation",
//                 "images": [
//                     "https://example.com/varanasi_day3.jpg"
//                 ]
//             },
//             {
//                 "day": 4,
//                 "description": "Walking tour of old Varanasi.",
//                 "activities": "Walking Tour, Market Visit",
//                 "images": [
//                     "https://example.com/varanasi_day4.jpg"
//                 ]
//             },
//             {
//                 "day": 5,
//                 "description": "Departure from Varanasi.",
//                 "activities": "Leisure Time, Departure",
//                 "images": [
//                     "https://example.com/varanasi_day5.jpg"
//                 ]
//             }
//         ]
//     }
// ];
// // import React, { useState } from 'react';
// // import { Star, Calendar, DollarSign, Clock, Users, MapPin, ChevronRight, X, Camera, Compass, Sunrise, Sunset, Coffee, Utensils } from 'lucide-react';

// // const packages = [
// //   // ... (the JSON data you provided earlier)
// // ];


// function Packages() {
//   const [selectedPackage, setSelectedPackage] = useState(null);
//   const [selectedDate, setSelectedDate] = useState('');
//   const [activeTab, setActiveTab] = useState('overview');
//   const [numberOfPersons, setNumberOfPersons] = useState(1);
//   const [bookingError, setBookingError] = useState('');

//   const handlePackageClick = (pkg) => {
//     setSelectedPackage(pkg);
//     setSelectedDate('');
//     setActiveTab('overview');
//     setNumberOfPersons(1);
//     setBookingError('');
//   };

//   const handleDateSelect = async (packageId, date) => {
//     const slots = selectedPackage.slots[date.split('T')[0]];
//     if (numberOfPersons > slots) {
//       setBookingError(`Only ${slots} slots available for this date.`);
//       return;
//     }

//     try {
//       const response = await fetch('http://localhost:8000/api/bookstaticpackage/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           package_id: packageId,
//           travel_date: date,
//           number_of_persons: numberOfPersons,
//         }),
//       });

//       if (response.ok) {
//         alert('Booking successful!');
//         setSelectedPackage(null);
//       } else {
//         throw new Error('Booking failed');
//       }
//     } catch (error) {
//       setBookingError('Error booking package: ' + error.message);
//     }
//   };

//   const getSlotColor = (slots) => {
//     if (slots > 30) return 'text-green-600';
//     if (slots > 10) return 'text-yellow-600';
//     return 'text-red-600';
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <h1 className="text-4xl font-bold text-center mb-12 text-indigo-800">Discover Amazing Packages</h1>

//       {!selectedPackage ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {packages.map((pkg) => (
//             <div
//               key={pkg.id}
//               className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 cursor-pointer"
//               onClick={() => handlePackageClick(pkg)}
//             >
//               <div className="relative">
//                 <img src={pkg.photos[0]} alt={pkg.name} className="w-full h-64 object-cover" />
//                 <div className="absolute top-0 right-0 bg-indigo-600 text-white px-3 py-1 rounded-bl-lg">
//                   <span className="flex items-center">
//                     <Star className="w-4 h-4 mr-1" />
//                     {pkg.rating.toFixed(1)}
//                   </span>
//                 </div>
//               </div>
//               <div className="p-6">
//                 <h2 className="text-2xl font-semibold mb-2 text-indigo-700">{pkg.name}</h2>
//                 <p className="text-gray-600 mb-4 h-12 overflow-hidden">{pkg.description.slice(0, 80)}...</p>
//                 <div className="flex justify-between items-center mb-4">
//                   <span className="text-2xl font-bold text-indigo-600">₹{pkg.price}</span>
//                   <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
//                     {pkg.category}
//                   </span>
//                 </div>
//                 <div className="flex items-center justify-between text-sm text-gray-600">
//                   <div className="flex items-center">
//                     <MapPin className="w-4 h-4 mr-1" />
//                     <span>{pkg.state}</span>
//                   </div>
//                   <div className="flex items-center">
//                     <Users className="w-4 h-4 mr-1" />
//                     <span>{pkg.number_of_person_views} views</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="bg-white rounded-lg shadow-lg p-8">
//           <button
//             onClick={() => setSelectedPackage(null)}
//             className="mb-6 text-indigo-600 hover:text-indigo-800 transition-colors duration-300 flex items-center"
//           >
//             <ChevronRight className="w-5 h-5 mr-1 transform rotate-180" />
//             Back to all packages
//           </button>
//           <div className="flex flex-col lg:flex-row gap-8">
//             <div className="lg:w-2/3">
//               <h2 className="text-3xl font-bold mb-4 text-indigo-800">{selectedPackage.name}</h2>
//               <div className="mb-6 grid grid-cols-2 gap-4">
//                 {selectedPackage.photos.map((photo, index) => (
//                   <img key={index} src={photo} alt={`${selectedPackage.name} - ${index + 1}`} className="w-full h-64 object-cover rounded-lg" />
//                 ))}
//               </div>
//               <div className="flex mb-6 border-b">
//                 <button
//                   className={`py-2 px-4 font-semibold ${activeTab === 'overview' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
//                   onClick={() => setActiveTab('overview')}
//                 >
//                   Overview
//                 </button>
//                 <button
//                   className={`py-2 px-4 font-semibold ${activeTab === 'itinerary' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
//                   onClick={() => setActiveTab('itinerary')}
//                 >
//                   Itinerary
//                 </button>
//               </div>
//               {activeTab === 'overview' ? (
//                 <>
//                   <p className="text-gray-600 mb-6">{selectedPackage.description}</p>
//                   <div className="grid grid-cols-2 gap-4 mb-6">
//                     <div className="flex items-center bg-gray-50 p-4 rounded-lg">
//                       <MapPin className="w-8 h-8 text-indigo-600 mr-4" />
//                       <div>
//                         <h4 className="font-semibold">Location</h4>
//                         <span>{selectedPackage.state}</span>
//                       </div>
//                     </div>
//                     <div className="flex items-center bg-gray-50 p-4 rounded-lg">
//                       <Star className="w-8 h-8 text-yellow-400 mr-4" />
//                       <div>
//                         <h4 className="font-semibold">Rating</h4>
//                         <span>{selectedPackage.rating.toFixed(1)} ({selectedPackage.number_of_person_views} views)</span>
//                       </div>
//                     </div>
//                     <div className="flex items-center bg-gray-50 p-4 rounded-lg">
//                       <DollarSign className="w-8 h-8 text-green-600 mr-4" />
//                       <div>
//                         <h4 className="font-semibold">Price</h4>
//                         <span className="text-2xl font-bold">₹{selectedPackage.price}</span>
//                       </div>
//                     </div>
//                     <div className="flex items-center bg-gray-50 p-4 rounded-lg">
//                       <Clock className="w-8 h-8 text-indigo-600 mr-4" />
//                       <div>
//                         <h4 className="font-semibold">Best Time to Visit</h4>
//                         <span>{selectedPackage.best_time}</span>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="mb-6">
//                     <h3 className="text-xl font-semibold mb-2">Additional Information</h3>
//                     <p className="text-gray-600">{selectedPackage.additional_info}</p>
//                   </div>
//                 </>
//               ) : (
//                 <div className="mb-6">
//                   <h3 className="text-xl font-semibold mb-4">Itinerary</h3>
//                   {selectedPackage.itinerary.map((day, index) => (
//                     <div key={index} className="mb-8 bg-gray-50 p-6 rounded-lg">
//                       <h4 className="font-semibold text-lg mb-4 text-indigo-700">Day {day.day}: {day.description}</h4>
//                       <div className="flex flex-col md:flex-row gap-6">
//                         <div className="md:w-1/2">
//                           <p className="text-gray-600 mb-4">{day.activities}</p>
//                           <div className="flex flex-wrap gap-2">
//                             {day.activities.split(', ').map((activity, actIndex) => (
//                               <span key={actIndex} className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">
//                                 {activity}
//                               </span>
//                             ))}
//                           </div>
//                         </div>
//                         <div className="md:w-1/2">
//                           <img src={day.images[0]} alt={`Day ${day.day} activity`} className="w-full h-64 object-cover rounded-lg" />
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//             <div className="lg:w-1/3">
//               <div className="bg-gray-100 p-6 rounded-lg sticky top-8">
//                 <h3 className="text-xl font-semibold mb-4">Available Dates</h3>
//                 {selectedPackage.available_dates.map((date) => {
//                   const formattedDate = new Date(date).toLocaleDateString();
//                   const slots = selectedPackage.slots[date.split('T')[0]];
//                   return (
//                     <div key={date} className="mb-2 flex items-center">
//                       <input
//                         type="radio"
//                         id={date}
//                         name="bookingDate"
//                         value={date}
//                         checked={selectedDate === date}
//                         onChange={() => setSelectedDate(date)}
//                         className="mr-2"
//                       />
//                       <label htmlFor={date} className="flex-grow flex justify-between">
//                         <span>{formattedDate}</span>
//                         <span className={getSlotColor(slots)}>{slots} slots</span>
//                       </label>
//                     </div>
//                   );
//                 })}
//                 <div className="mt-4">
//                   <label htmlFor="numberOfPersons" className="block text-sm font-medium text-gray-700 mb-1">
//                     Number of Persons
//                   </label>
//                   <input
//                     type="number"
//                     id="numberOfPersons"
//                     value={numberOfPersons}
//                     onChange={(e) => setNumberOfPersons(Math.max(1, parseInt(e.target.value)))}
//                     min="1"
//                     className="w-full p-2 border border-gray-300 rounded-md"
//                   />
//                 </div>
//                 {bookingError && (
//                   <p className="mt-2 text-red-600 text-sm">{bookingError}</p>
//                 )}
//                 <button
//                   onClick={() => handleDateSelect(selectedPackage.id, selectedDate)}
//                   disabled={!selectedDate}
//                   className={`mt-4 w-full py-2 px-4 rounded-md ${
//                     selectedDate
//                       ? 'bg-indigo-600 text-white hover:bg-indigo-700'
//                       : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                   } transition-colors duration-300 flex items-center justify-center`}
//                 >
//                   <Calendar className="w-5 h-5 mr-2" />
//                   Book Now
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Packages;





























import React, { useState, useEffect  } from 'react'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Star, Calendar, DollarSign, Clock, Users, MapPin, ChevronRight, X, Camera, Compass, Sunrise, Sunset, Coffee, Utensils } from 'lucide-react'
import Navbar from '../Navbar'
import { useNavigate } from 'react-router-dom';
import Footer from '../Home/footer'
function Packages() {
  const navigate  = useNavigate()
  const [packages, setPackages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedPackage, setSelectedPackage] = useState(null)
  const [selectedDate, setSelectedDate] = useState('')
  const [activeTab, setActiveTab] = useState('overview')
  const [numberOfPersons, setNumberOfPersons] = useState(1)
  const [bookingError, setBookingError] = useState('')

  useEffect(() => {
    fetchPackages()
  }, [])

  const fetchPackages = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/add_static_package/')
      if (!response.ok) {
        throw new Error('Failed to fetch packages')
      }
      const data = await response.json()
      setPackages(data)
      setLoading(false)
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  const handlePackageClick = (pkg) => {
    setSelectedPackage(pkg)
    setSelectedDate('')
    setActiveTab('overview')
    setNumberOfPersons(1)
    setBookingError('')
  }

  const handleDateSelect = async (packageId, date) => {
    const slots = selectedPackage.slots[date.split(' ')[0]]
    if (numberOfPersons > slots) {
      setBookingError(`Only ${slots} slots available for this date.`)
      return
    }

    try {
      const date1 = date.slice(0, 10)
      const token = Cookies.get('auth_token')

      if (!token) {
        toast.error('Please login first', {
          position: "top-center",
          autoClose: 3000,
        })
        setTimeout(() => {
          window.location.href = '/login'
        }, 3000)
        return
      }

      const response = await fetch('http://localhost:8000/api/bookstaticpackage/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          package_id: packageId,
          travel_date: date1,
          number_of_persons: numberOfPersons,
        }),
      })

      if (response.ok) {
        toast.success('Booking successful!')
        setSelectedPackage(null)
        navigate('/transaction');
      } else {
        throw new Error('Booking failed')
      }
    } catch (error) {
      setBookingError('Error booking package: ' + error.message)
      toast.error('Error booking package: ' + error.message)
    }
  }

  const getSlotColor = (slots) => {
    if (slots > 30) return 'text-blue-600'
    if (slots > 10) return 'text-yellow-600'
    return 'text-red-600'
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-blue-50">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-blue-50">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      </div>
    )
  }

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-blue-50 p-8">
      <div className="relative text-center mb-12 rounded-lg overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.pexels.com/photos/994605/pexels-photo-994605.jpeg?cs=srgb&dl=pexels-fabianwiktor-994605.jpg&fm=jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(3px)',
          }}
        ></div>
        <div className="relative z-10 p-24 lg:p-48">
          <h1 className="text-5xl font-serif text-white">Discover Amazing Packages</h1>
        </div>
      </div>

      {!selectedPackage ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 cursor-pointer"
              onClick={() => handlePackageClick(pkg)}
            >
              <div className="relative">
                <img src={pkg.photos[0]} alt={pkg.name} className="w-full h-64 object-cover" />
                <div className="absolute top-0 right-0 bg-blue-600 text-white px-3 py-1 rounded-bl-lg">
                  <span className="flex items-center">
                    <Star className="w-4 h-4 mr-1" />
                    {pkg.rating.toFixed(1)}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-2 text-blue-600">{pkg.name}</h2>
                <p className="text-gray-600 mb-4 h-12 overflow-hidden">{pkg.description.slice(0, 80)}...</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-blue-600">₹{pkg.price}</span>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {pkg.category}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{pkg.state}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    <span>{pkg.number_of_person_views} views</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-lg p-8">
          <button
            onClick={() => setSelectedPackage(null)}
            className="mb-6 text-blue-600 hover:text-blue-800 transition-colors duration-300 flex items-center"
          >
            <ChevronRight className="w-5 h-5 mr-1 transform rotate-180" />
            Back to all packages
          </button>
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
              <h2 className="text-3xl font-bold mb-4 text-blue-600">{selectedPackage.name}</h2>
              <div className="mb-6 grid grid-cols-2 gap-4">
                {selectedPackage.photos.map((photo, index) => (
                  <img key={index} src={photo} alt={`${selectedPackage.name} - ${index + 1}`} className="w-full h-64 object-cover rounded-lg" />
                ))}
              </div>
              <div className="flex mb-6 border-b">
                <button
                  className={`py-2 px-4 font-semibold ${activeTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                  onClick={() => setActiveTab('overview')}
                >
                  Overview
                </button>
                <button
                  className={`py-2 px-4 font-semibold ${activeTab === 'itinerary' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                  onClick={() => setActiveTab('itinerary')}
                >
                  Itinerary
                </button>
              </div>
              {activeTab === 'overview' ? (
                <>
                  <p className="text-gray-600 mb-6">{selectedPackage.description}</p>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center bg-blue-50 p-4 rounded-lg">
                      <MapPin className="w-8 h-8 text-blue-600 mr-4" />
                      <div>
                        <h4 className="font-semibold">Location</h4>
                        <span>{selectedPackage.state}</span>
                      </div>
                    </div>
                    <div className="flex items-center bg-blue-50 p-4 rounded-lg">
                      <Star className="w-8 h-8 text-yellow-400 mr-4" />
                      <div>
                        <h4 className="font-semibold">Rating</h4>
                        <span>{selectedPackage.rating.toFixed(1)} ({selectedPackage.number_of_person_views} views)</span>
                      </div>
                    </div>
                    <div className="flex items-center bg-blue-50 p-4 rounded-lg">
                      <DollarSign className="w-8 h-8 text-green-600 mr-4" />
                      <div>
                        <h4 className="font-semibold">Price</h4>
                        <span className="text-2xl font-bold">₹{selectedPackage.price}</span>
                      </div>
                    </div>
                    <div className="flex items-center bg-blue-50 p-4 rounded-lg">
                      <Clock className="w-8 h-8 text-blue-600 mr-4" />
                      <div>
                        <h4 className="font-semibold">Best Time to Visit</h4>
                        <span>{selectedPackage.best_time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-2">Additional Information</h3>
                    <p className="text-gray-600">{selectedPackage.additional_info}</p>
                  </div>
                </>
              ) : (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-4">Itinerary</h3>
                  {selectedPackage.itinerary.map((day, index) => (
                    <div key={index} className="mb-8 bg-blue-50 p-6 rounded-lg">
                      <h4 className="font-semibold text-lg mb-4 text-blue-700">Day {day.day}: {day.description}</h4>
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="md:w-1/2">
                          <p className="text-gray-600 mb-4">{day.activities}</p>
                          <div className="flex flex-wrap gap-2">
                            {day.activities.split(', ').map((activity, actIndex) => (
                              <span key={actIndex} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                {activity}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="md:w-1/2">
                          <img src={day.images[0]} alt={`Day ${day.day} activity`} className="w-full h-64 object-cover rounded-lg" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="lg:w-1/3">
              <div className="bg-blue-50 p-6 rounded-lg sticky top-8">
                <h3 className="text-xl font-semibold mb-4">Available Dates</h3>
                {selectedPackage.available_dates.map((date) => {
                  const formattedDate = new Date(date).toLocaleDateString()
                  const slots = selectedPackage.slots[date.split(' ')[0]]
                  return (
                    <div key={date} className="mb-2 flex items-center">
                      <input
                        type="radio"
                        id={date}
                        name="bookingDate"
                        value={date}
                        checked={selectedDate === date}
                        onChange={() => setSelectedDate(date)}
                        className="mr-2"
                      />
                      <label htmlFor={date} className="flex-grow flex justify-between">
                        <span>{formattedDate}</span>
                        <span className={getSlotColor(slots)}>{slots} slots</span>
                      </label>
                    </div>
                  )
                })}
                <div className="mt-4">
                  <label htmlFor="numberOfPersons" className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Persons
                  </label>
                  <input
                    type="number"
                    id="numberOfPersons"
                    value={numberOfPersons}
                    onChange={(e) => setNumberOfPersons(Math.max(1, parseInt(e.target.value)))}
                    min="1"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                {bookingError && (
                  <p className="mt-2 text-red-600 text-sm">{bookingError}</p>
                )}
                <button
                  onClick={() => handleDateSelect(selectedPackage.id, selectedDate)}
                  disabled={!selectedDate}
                  className={`mt-4 w-full py-2 px-4 rounded-md ${
                    selectedDate
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  } transition-colors duration-300 flex items-center justify-center`}
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    <Footer/>
    </>
  );
}

export default Packages