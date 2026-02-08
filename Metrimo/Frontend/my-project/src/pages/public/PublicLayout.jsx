import React, { useState } from "react";
import logo from '../../assets/images/logo.png'
import abtimg from '../../assets/images/about-section-img.png'
import { TbBulbFilled } from "react-icons/tb";
import { FaStar,FaSearchLocation, FaRegCalendarAlt, FaRegCreditCard, FaGlassCheers,FaUsers, FaChartLine, FaShieldAlt, FaMobileAlt } from "react-icons/fa";
import {Link} from 'react-router-dom'


const PublicLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
    <header className="relative">
            
      <nav className="flex flex-col ">

        <div className="flex justify-between items-center px-[30px] py-6">
   
          <div className="logo font-bold text-xl h-[40px] w-[180px]"><img className="h-full w-full object-contain" src={logo}  alt="logo" /></div>

    
          <ul className="hidden md:flex gap-10 text-black">
            <li className="cursor-pointer p-2 flex items-center hover:text-[#B90707] border rounded-sm border-transparent hover:border-[#B90707] "><a href="#home">Home</a></li>
            <li className="cursor-pointer p-2 flex items-center hover:text-[#B90707] border rounded-sm border-transparent hover:border-[#B90707] "><a href="#about">About us</a></li>
            <li className="cursor-pointer p-2 flex items-center hover:text-[#B90707] border rounded-sm border-transparent hover:border-[#B90707] "><a href="#process">Process</a></li>
            <li className="cursor-pointer p-2 flex items-center hover:text-[#B90707] border rounded-sm border-transparent hover:border-[#B90707] "><a href="#venue">For Venue Owners?</a></li>
          <Link
            className="hidden md:flex px-5 py-2  font-bold items-center rounded-full hover:scale-105 transition-all duration-300 bg-[#B90707] text-white "
            to="/login"
          >
            Login
          </Link>
          </ul>

          {/* Login Button (desktop) */}
    

          <button
            className="md:hidden flex flex-col gap-1"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="w-6 h-1 bg-black"></span>
            <span className="w-6 h-1 bg-black"></span>
            <span className="w-6 h-1 bg-black"></span>
          </button>
        </div>

      </nav>
        <div
          className={`md:hidden absolute w-full flex flex-col p-10 gap-6 rounded-b-2xl bg-gray-100 overflow-hidden transition-all duration-500 ease-in-out ${
            isOpen ? "max-h-96 opacity-100 " : "max-h-0 opacity-0"
          }`}
        >
          <a className='hover:text-white  p-1 hover:bg-red-800' href="#home"   onClick={() => setIsOpen(!isOpen)}>
            Home
          </a>
          <a className='hover:text-white  p-1 hover:bg-red-800' href="#about"  onClick={() => setIsOpen(!isOpen)}>
            About Us
          </a>
          <a className='hover:text-white  p-1 hover:bg-red-800' href="#process"  onClick={() => setIsOpen(!isOpen)}>
           Process
          </a>
          <a  className='hover:text-white  p-1 hover:bg-red-800' href="#venue"  onClick={() => setIsOpen(!isOpen)}>
            For Venue Owners
          </a>
          <a 
            href="#"
            className="px-5 py-2 bg-red-800 text-white rounded-md text-center"
          >
            Login
          </a>
        </div>
        </header>
        <main>
          <section id="home">
            <div className="banner mx-[30px] pt-[120px] pb-[120px] md:pb-[180px] rounded-3xl ">
            <div className="container">
              <h1 className="text-center md:text-start  banner-heading text-[50px] md:text-[70px] text-white">Discover <span className="text-[#B90707]">Perfect Venues</span> for Every <br className="hidden md:block" /> Special Occasion</h1>
              <p className="text-white text-center md:text-start my-5">Plan events effortlessly with Metrimo — explore venues, compare options, check real-time availability, <br className="hidden md:block text-center" /> and book securely in just a few clicks</p>

              <a href="" className="py-3 px-10 transition-all block  w-fit  duration-300 mx-auto md:mx-0 hover:scale-105 text-white rounded-full font-bold bg-[#B90707]">Book Now</a>
            </div>
            </div>
           
          </section>
            <section id="about" className="about-us py-[120px]">
                <div className="container flex flex-col md:flex-row ">
                  <div className="left w-full md:w-[60%]">
                    <h2 className="about-heading text-[40px] font-[500]">Who we are</h2>
                    <p className="text-[18px] font-[400] leading-[28px]">At Metrimo, we are passionate about making event planning simple, transparent, and stress-free. Our platform connects people with the best wedding and event venues, offering detailed information, real-time availability, and instant booking options—all in one place. We believe in saving your time and effort by eliminating endless phone calls and hidden charges, giving you the freedom to focus on creating memorable moments.</p>

                    <div className="flex gap-6 my-5">
                      <span className="py-3 font-medium shadow-xl px-5 text-white bg-[#B90707] rounded-full">Trusted By Event Planners</span>
                      <span className="py-3 font-medium shadow-xl px-5 text-white bg-[#B90707] rounded-full">100+ venues listed</span>
                    </div>

                    <div className="p-[20px] bg-[#F7F7F7] flex flex-col gap-[12px] rounded-[10px]">
                      <span className="flex items-center gap-4 text-[24px] font-[700]"><TbBulbFilled className="bg-[#B90707] text-[white] p-2 text-4xl rounded-md"/>Our Mission & Vision</span>
                      <p className="text-[16px] font-[400]">our mission is to make event planning seamless, transparent, and stress-free. We aim to empower people by connecting them with the best venues through real-time availability, clear pricing, and instant booking.Our vision is to become the most trusted platform for weddings and events, where every celebration starts with ease and confidence..</p>
                    </div>
                    <div className="p-[20px] mt-[20px] bg-[#F7F7F7] flex flex-col gap-[12px] rounded-[10px]">
                      <span className="flex items-center gap-4 text-[24px] font-[700]"><FaStar className="bg-[#B90707] text-[white] p-2 text-3xl rounded-md"/>Where We Come From</span>
                      <p className="text-[16px] font-[400]">Founded in 2025, Metrimo began with a simple idea: to eliminate endless calls, hidden charges, and the hassle of venue hunting. What started with a few listings has now grown into a trusted platform featuring 100+ verified venues.From day one, our focus has been on building a reliable bridge between people and places, helping thousands create memorable events with peace of mind..</p>
                    </div>
                  </div>
                  <div className="right w-full md:w-[40%] flex justify-center md:justify-end">
                    <img src={abtimg} alt=""  className="w-[420px] h-[700px] rounded-3xl mt-5 md:mt-0"/>
                  </div>
                </div>
            </section>
       <section id="process" className="relative py-[100px] bg-gradient-to-br from-gray-900 to-black overflow-hidden">
  {/* Background Elements */}
  <div className="absolute inset-0 opacity-10">
    <div className="absolute top-10 left-10 w-72 h-72 bg-[#B90707] rounded-full blur-3xl"></div>
    <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
  </div>
  
  <div className="container relative z-10">
    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
        How <span className="text-[#B90707]">Metrimo</span> Works
      </h2>
      <p className="text-xl text-gray-300 max-w-3xl mx-auto">
        Your journey to finding the perfect venue, simplified into four easy steps
      </p>
    </div>

    <div className="relative">
      {/* Connecting Line for Desktop */}
      <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-[#B90707] to-blue-500 transform -translate-y-1/2"></div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {[
          {
            icon: <FaSearchLocation className="text-3xl" />,
            title: "Explore Venues",
            description: "Browse 100+ verified wedding and event venues with detailed information, transparent pricing, and real photos.",
            step: "01"
          },
          {
            icon: <FaRegCalendarAlt className="text-3xl" />,
            title: "Check Availability",
            description: "View real-time availability and compare options that fit your event date and requirements.",
            step: "02"
          },
          {
            icon: <FaRegCreditCard className="text-3xl" />,
            title: "Book Instantly",
            description: "Reserve your venue with just a few clicks — no hidden charges, no endless phone calls.",
            step: "03"
          },
          {
            icon: <FaGlassCheers className="text-3xl" />,
            title: "Celebrate with Ease",
            description: "Focus on creating memorable moments while Metrimo takes care of the hassle.",
            step: "04"
          }
        ].map((step, index) => (
          <div 
            key={index}
            className="group relative"
          >
            {/* Step Number */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-r from-[#B90707] to-red-600 rounded-full flex items-center justify-center text-white font-bold text-lg border-4 border-gray-900 group-hover:scale-110 transition-all duration-300 z-20">
              {step.step}
            </div>
            
            <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700 group-hover:border-[#B90707] transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-[#B90707]/20 h-full flex flex-col">
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#B90707]/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Icon Container */}
              <div className="relative z-10 mb-6">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[#B90707] to-red-600 rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  {step.icon}
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10 text-center flex-1 flex flex-col">
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#B90707] transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-gray-300 leading-relaxed flex-1">
                  {step.description}
                </p>
              </div>

              {/* Animated Arrow for Mobile */}
              <div className="lg:hidden flex justify-center mt-6">
                {index < 3 && (
                  <div className="w-6 h-6 border-r-2 border-b-2 border-gray-500 transform rotate-45 animate-pulse"></div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* CTA Button */}
    <div className="text-center mt-12">
      <a 
        href="#" 
        className="inline-flex items-center gap-3 py-4 px-8 bg-gradient-to-r from-[#B90707] to-red-600 text-white font-bold rounded-full hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-[#B90707]/30"
      >
        <FaGlassCheers className="text-xl" />
        Start Your Journey Today
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </a>
    </div>
  </div>
</section>
             <section id="venue" className="py-[100px] bg-gray-50">
        <div className="container">
          <h2 className="about-heading text-[40px] font-[500]  mb-4">For Venue Owners?</h2>
          <p className="text-[18px] text-start text-gray-600 mb-12 ">
            Join Metrimo and grow your venue business with our powerful platform designed specifically for venue owners and managers.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="bg-[#B90707] text-white p-4 rounded-xl w-fit mb-4">
                <FaUsers className="text-2xl" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Reach More Customers</h3>
              <p className="text-gray-600">
                Get your venue in front of thousands of potential clients actively searching for event spaces in your area.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="bg-[#B90707] text-white p-4 rounded-xl w-fit mb-4">
                <FaChartLine className="text-2xl" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Increase Bookings</h3>
              <p className="text-gray-600">
                Our platform helps you fill empty dates and maximize your venue's occupancy throughout the year.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="bg-[#B90707] text-white p-4 rounded-xl w-fit mb-4">
                <FaShieldAlt className="text-2xl" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Secure Payments</h3>
              <p className="text-gray-600">
                Get paid securely and on time with our reliable payment system and booking management tools.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            <div className="lg:w-1/2">
              <h3 className="text-3xl font-bold mb-6">Why List Your Venue with Metrimo?</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-[#B90707] text-white p-2 rounded-lg mt-1">
                    <FaMobileAlt className="text-xl" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Easy Management</h4>
                    <p className="text-gray-600">
                      Update availability, manage bookings, and communicate with clients through our intuitive dashboard.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-[#B90707] text-white p-2 rounded-lg mt-1">
                    <FaChartLine className="text-xl" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Performance Analytics</h4>
                    <p className="text-gray-600">
                      Track your venue's performance with detailed analytics and insights to optimize your pricing and availability.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-[#B90707] text-white p-2 rounded-lg mt-1">
                    <FaUsers className="text-xl" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Verified Clients</h4>
                    <p className="text-gray-600">
                      Connect with serious, pre-screened clients who are ready to book for their special occasions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2 bg-gradient-to-br from-[#B90707] to-red-800 p-8 rounded-2xl text-white">
              <h3 className="text-3xl font-bold mb-6">Ready to Get Started?</h3>
              <p className="text-lg mb-6">
                Join hundreds of venue owners who are already growing their business with Metrimo.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-white text-[#B90707] rounded-full flex items-center justify-center font-bold">✓</div>
                  <span>Free listing with no hidden fees</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-white text-[#B90707] rounded-full flex items-center justify-center font-bold">✓</div>
                  <span>Dedicated support team</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-white text-[#B90707] rounded-full flex items-center justify-center font-bold">✓</div>
                  <span>Marketing and promotion</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-white text-[#B90707] rounded-full flex items-center justify-center font-bold">✓</div>
                  <span>Easy booking management</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="#" 
                  className="py-3 px-8 bg-white text-[#B90707] font-bold rounded-full text-center hover:bg-gray-100 transition-all duration-300"
                >
                  List Your Venue
                </a>
                <a 
                  href="#" 
                  className="py-3 px-8 border-2 border-white text-white font-bold rounded-full text-center hover:bg-white hover:text-[#B90707] transition-all duration-300"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

        </main>
       <footer className="bg-gray-900 text-white py-12">
  <div className="container">
    <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-8">
      {/* Logo Section */}
      <div className="flex flex-col items-center lg:items-start gap-4">
        <div className="logo font-bold text-xl h-[40px] w-[180px]">
          <img className="h-full w-full object-contain" src={logo} alt="logo" />
        </div>
        <p className="text-gray-400 text-center lg:text-left max-w-md">
          Making event planning simple, transparent, and stress-free. Find your perfect venue with Metrimo.
        </p>
      </div>

      {/* Navigation Links */}
      <div className="flex flex-col items-center lg:items-start gap-4">
        <h3 className="text-lg font-bold text-white mb-2">Quick Links</h3>
        <div className="flex flex-col items-center lg:items-start gap-3">
          <a 
            href="#home" 
            className="text-gray-400 hover:text-[#B90707] transition-colors duration-300"
          >
            Home
          </a>
          <a 
            href="#about" 
            className="text-gray-400 hover:text-[#B90707] transition-colors duration-300"
          >
            About Us
          </a>
          <a 
            href="#process" 
            className="text-gray-400 hover:text-[#B90707] transition-colors duration-300"
          >
            Process
          </a>
          <a 
            href="#venue" 
            className="text-gray-400 hover:text-[#B90707] transition-colors duration-300"
          >
            For Venue Owners
          </a>
        </div>
      </div>

      {/* CTA Section */}
      <div className="flex flex-col items-center lg:items-start gap-4">
        <h3 className="text-lg font-bold text-white mb-2">Get Started</h3>
        <a 
          href="#" 
          className="px-6 py-2 bg-[#B90707] text-white font-bold rounded-full hover:scale-105 transition-all duration-300 text-center"
        >
          Book Your Venue
        </a>
        <a 
          href="#" 
          className="px-6 py-2 border border-[#B90707] text-[#B90707] font-bold rounded-full hover:bg-[#B90707] hover:text-white transition-all duration-300 text-center"
        >
          List Your Venue
        </a>
      </div>
    </div>

    {/* Bottom Section */}
    <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
      <p className="text-gray-400 text-sm">
        © 2024 Metrimo. All rights reserved.
      </p>
      <div className="flex gap-6">
        <a href="#" className="text-gray-400 hover:text-[#B90707] transition-colors duration-300 text-sm">
          Privacy Policy
        </a>
        <a href="#" className="text-gray-400 hover:text-[#B90707] transition-colors duration-300 text-sm">
          Terms of Service
        </a>
        <a href="#" className="text-gray-400 hover:text-[#B90707] transition-colors duration-300 text-sm">
          Contact Us
        </a>
      </div>
    </div>
  </div>
</footer>
    </div>
  );
};

export default PublicLayout;
