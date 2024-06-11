import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import backgroundImage from './Mainbg1.jpg';
const About = () => {
  return (
    <div className="container-xxl position-relative p-0" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'top', minHeight: '100vh' }}>
    {/* Navbar & Hero Start */}
    <nav className="navbar navbar-expand-lg navbar-dark navbar-fixed-top px-4 px-lg-5 py-3 py-lg-0">
        <h1 className="text-primary-emphasis display-5 fw-bold" style={{ fontFamily: 'Times New Roman, serif'}}>
            <FontAwesomeIcon icon={faUsers} />GreenSpace
        </h1>  
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
            <span className="fa fa-bars"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarCollapse">
            <Link to="/home" className="btn btn-success py-2 px-4 text-light">Back</Link>
        </div>
    </nav>
    {/* Navbar & Hero End */}
    <div className='container'>
      <h1>Sustainable Living Community  </h1>
      <p>Welcome to our sustainable living community!</p>
      <p>At our community, we are committed to promoting sustainable practices and creating a more eco-friendly environment for everyone.</p>
      <div className="row">
        <div className="col-lg-6">
          <h2>About Our Community</h2>
          <ul>
            <li>Community Name: Sustainable Living Community</li>
            <li>Founding Date: January 1, 2020</li>
            <li>Location: Eco City, Earth</li>
          </ul>
        </div>
        <div className="col-lg-6">
          <h2>Community Initiatives</h2>
          <p>Our community is actively involved in various sustainable initiatives:</p>
          <ul>
            <li>Community gardens and composting</li>
            <li>Recycling and waste reduction programs</li>
            <li>Energy efficiency and renewable energy projects</li>
            <li>Supporting local sustainable businesses</li>
            <li>Advocacy for environmental policies</li>
          </ul>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6">
          <h2>Upcoming Events</h2>
          <p>Join us for our upcoming events focused on sustainability and community building:</p>
          <ul>
            <li>Earth Day Cleanup - April 22nd</li>
            <li>Sustainable Living Workshop - May 15th</li>
            <li>Community Garden Planting Day - June 5th</li>
            <li>Green Energy Fair - July 10th</li>
          </ul>
          <p>Stay tuned for more events and activities!</p>
        </div>
        <div className="col-lg-6">
          <h2>Get Involved</h2>
          <p>There are many ways you can participate and contribute to our sustainable living community:</p>
          <ul>
            <li>Volunteer for community clean-up and gardening events</li>
            <li>Attend workshops and educational seminars</li>
            <li>Join our advocacy efforts for environmental policies</li>
            <li>Share your ideas and initiatives for a greener community</li>
            <li>Support local sustainable businesses and initiatives</li>
          </ul>
          <p>Your involvement makes a difference!</p>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <h2>Contact Us</h2>
          <p>Have questions or want to get involved? Feel free to reach out to us:</p>
          <ul>
            <li>Email: <a href="mailto:info@sustainablecommunity.com">info@sustainablecommunity.com</a></li>
            <li>Phone: 123-456-7890</li>
            <li>Address: 123 Green Street, EcoCity, Earth</li>
          </ul>
        </div>
      </div>
    </div>
    </div>
  );
}

export default About;
