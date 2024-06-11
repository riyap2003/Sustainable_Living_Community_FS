import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import backgroundImage from './Mainbg1.jpg';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
function Main3() {
  return (
    <div className="container-xxl position-relative p-0 py-3" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'top', minHeight: '100vh' }}>
                {/* Navbar & Hero Start */}
            
                <nav className="navbar navbar-expand-lg navbar-dark  navbar-fixed-top px-4 px-lg-5 py-3 py-lg-0">
                    <div className="collapse navbar-collapse justify-content-end" id="navbarCollapse">
                    
                        <Link to="/home" className="btn btn-dark py-2 px-4 text-light">Back</Link>
                    </div>
                </nav>
                <br></br>
                {/* Navbar & Hero End */}
      <div className="container">
        <div className="text-center">
          <h1 className="mb-5 text-dark">What Our Sustainable Living Community Says!!!</h1>
        </div>
        <div>
        <div className="testimonial-item bg-transparent border rounded p-4">
          <i className="fa fa-quote-left fa-2x text-primary mb-3"></i>
          <p>Our community members have been actively engaged in promoting sustainability and fostering a sense of belonging. The initiatives they undertake truly make a difference in our lives.</p>
          <div className="ps-3">
            <Link to="/main1" className="text-decoration-none">
              <h5 className="mb-1 text-primary-emphasis">Community Details<FaArrowRight className="me-1" /></h5>
            </Link>
          </div>
        </div>
        <br />
        <div className="testimonial-item bg-transparent border rounded p-4">
          <i className="fa fa-quote-left fa-2x text-primary mb-3"></i>
          <p>The sustainable practices embraced by our community are inspiring. From recycling initiatives to eco-friendly events, our commitment to sustainability continues to grow stronger each day.</p>
          <div className="ps-3">
            <Link to="/main4" className="text-decoration-none">
              <h5 className="mb-1 text-primary-emphasis">Sustainable Initiatives <FaArrowRight className="me-1" /></h5>
            </Link>
          </div>
        </div>
        <br />
        <div className="testimonial-item bg-transparent border rounded p-4">
          <i className="fa fa-quote-left fa-2x text-primary mb-3"></i>
          <p>Our community engages in various sustainable practices aimed at minimizing our environmental footprint and promoting eco-friendly lifestyles. From composting and reducing single-use plastics to promoting renewable energy and sustainable transportation, our efforts are diverse and impactful.</p>
          <div className="ps-3">
            <Link to="/main5" className="text-decoration-none">
              <h5 className="mb-1 text-primary-emphasis">Practice conducted by Community<FaArrowRight className="me-1" /></h5>
            </Link>
          </div>
        </div>
        <br />
        <div className="testimonial-item bg-transparent border rounded p-4">
          <i className="fa fa-quote-left fa-2x text-primary mb-3"></i>
          <p>Events organized by our community bring us closer together and create unforgettable memories. The dedication and enthusiasm of our members make each event a remarkable experience.</p>
          <div className="ps-3">
            <Link to="/main6" className="text-decoration-none">
              <h5 className="mb-1 text-primary-emphasis">Events<FaArrowRight className="me-1" /></h5>
            </Link>
            </div>
          </div>
          <br />
          <div className="testimonial-item bg-transparent border rounded p-4">
          <i className="fa fa-quote-left fa-2x text-primary mb-3"></i>
          <p>This gives the details of the participants who participated in the event and gives the details of initiatives based on budget.</p>
          <div className="ps-3">
            <Link to="/main8" className="text-decoration-none">
              <h5 className="mb-1 text-primary-emphasis">Participants and Procedure Technique<FaArrowRight className="me-1" /></h5>
            </Link>
            </div>
          </div>
          <br />

          <div className="testimonial-item bg-transparent border rounded p-4">
          <i className="fa fa-quote-left fa-2x text-primary mb-3"></i>
          <p>Feedback mechanisms within our community ensure that our voices are heard and our concerns addressed. This open communication fosters transparency and trust among all members.</p>
          <div className="ps-3">
            <Link to="/main7" className="text-decoration-none">
              <h5 className="mb-1 text-primary-emphasis">Feedback<FaArrowRight className="me-1" /></h5>
            </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main3;
