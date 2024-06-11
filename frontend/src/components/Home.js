import React,{ useState } from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from './Home1.jpg';
import side1 from './about1.jpg'
import side2 from './about2.jpg'
import side3 from './about3.jpg'
import { Facebook, Twitter, Instagram } from 'react-bootstrap-icons'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers} from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import side4 from './c1.jpg'


// Now you can use these icons in your component

import axios from 'axios';


function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
});

const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
};

const handleSubmit = async (event) => {
    event.preventDefault();

    try {
        await axios.post('http://localhost:8081/home', formData);
        console.log('Feedback data sent successfully');
        setFormData({ name: '', email: '', subject: '', message: '' });
        // Optionally, you can show a success message to the user
    } catch (error) {
        console.error('Error sending feedback data:', error);
        // Optionally, you can show an error message to the user
    }
  }
  return (
    <div className="container-xxl">
    
      {/* Navbar & Hero Start */}
      <div className="container-xxl position-relative p-0">
      <div  style={{backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'top' }} >
      <nav className="navbar navbar-expand-lg navbar-dark  navbar-fixed-top px-4 px-lg-5 py-3 py-lg-0">
      <h1 className="text-dark display-5 fw-bold" style={{ fontFamily: 'Times New Roman, serif'}}><FontAwesomeIcon icon={faUsers} />EcoHive</h1>  
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
            <span className="fa fa-bars"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <div className="navbar-nav ms-auto py-0 pe-4">
            <a href="#home " className="nav-item nav-link  fw-bold text-primary-emphasis">Home</a>
            <a href="#about" className="nav-item nav-link  fw-bold text-primary-emphasis">About</a> {/* Modified anchor tag */}
            <a href="#service" className="nav-item nav-link  fw-bold text-primary-emphasis">Service</a> {/* Modified anchor tag */}
            <a href="#contact" className="nav-item nav-link  fw-bold text-primary-emphasis">Contact</a> 
            </div>
            <Link to="/login" className="btn btn-dark   py-2 px-4 text-light">Login</Link>
          </div>
        </nav>
        <div className="container-xxl py-5 mb-5"  >
        <div className="container my-5 py-5">
          <div className="row align-items-center g-5">
            <div className="col-lg-6 text-center text-lg-start">
              <h1 className="display-2 text-primary-emphasis  slideInLeft" style={{ fontFamily: 'Times New Roman, serif'}}>Sustainable  <br className="d-md-none"/>Living Community</h1>
              <p className="text-black  display-7 font-italic animated slideInLeft mb-4 pb-2">In the heart of our sustainable community, we paint <br/> 
              tomorrow's canvas with the brushstrokes of conscious <br/>
              living and environmental harmony.</p>
              <Link to="/main3" className="btn btn-dark py-sm-3 px-sm-5 me-3 animated slideInLeft">Get Started</Link>
            </div>
            <div className="col-lg-6 text-center text-lg-end overflow-hidden">
              <img className="img-fluid d-none d-lg-block" src="" alt="" />
            </div>
          </div>
        </div>
      </div>
      </div>
      </div>
      {/* Navbar & Hero End */}
       {/* About */}
       <div>
       <div id="about" className="container-xxl py-5">
         <div className="container">
           <div className="row g-5 align-items-center">
             <div className="col-lg-6">
               <div className="row g-3">
                 <div className="col-6 text-start">
                   <img className="img-fluid rounded w-100 wow zoomIn" data-wow-delay="0.1s" src={side1} alt="" />
                 </div>
                 <div className="col-6 text-start">
                   <img className="img-fluid rounded w-75 wow zoomIn" data-wow-delay="0.3s" src={side2} style={{ marginTop: "25%" }} alt="" />
                 </div>
                 <div className="col-6 text-end">
                   <img className="img-fluid rounded w-75 wow zoomIn" data-wow-delay="0.5s" src={side3} alt="" />
                 </div>
                 <div className="col-6 text-end">
                   <img className="img-fluid rounded w-100 wow zoomIn" data-wow-delay="0.7s" src="img/about-4.jpg" alt="" />
                 </div>
               </div>
             </div>
             <div className="col-lg-6">
               <h5 className="section-title ff-secondary text-start text-dark fw-normal">About Sustainable Living Community</h5>
               <h1 className="mb-4 text-primary-emphasis">Welcome to <i className="fa fa-utensils text-primary me-2"></i>Sustainable Living Community</h1>
               <p className="mb-4">Welcome to our sustainable living community!</p>
               <p className="mb-4">At our community, we are committed to promoting sustainable practices and creating a more eco-friendly environment for everyone.</p>
               <div className="row g-4 mb-4">
                 <div className="col-sm-6">
                   <div className="d-flex align-items-center border-start border-5 border-dark px-3">
                     <h1 className="flex-shrink-0 display-5 text-primary-emphasis mb-0" data-toggle="counter-up">15</h1>
                     <div className="ps-4">
                       <p className="mb-0">Years of</p>
                       <h6 className="text-uppercase text-primary-emphasis mb-0">Experience</h6>
                     </div>
                   </div>
                 </div>
                 <div className="col-sm-6">
                   <div className="d-flex align-items-center border-start border-5 border-dark px-3">
                     <h1 className="flex-shrink-0 display-5 text-primary-emphasis mb-0" data-toggle="counter-up">50</h1>
                     <div className="ps-4">
                       <p className="mb-0">Active</p>
                       <h6 className="text-uppercase text-primary-emphasis mb-0">Members</h6>
                     </div>
                   </div>
                 </div>
               </div>
               <Link to="/about" className="btn btn-dark py-3 px-5 mt-2" href="#read-more">Read More</Link>
             </div>
           </div>
         </div>
       </div>
     </div>
     {/* About */}
    {/* About*/}

   {/* Team Start */}
<div>
<div id="service" className="container-xxl pt-5 pb-3">
  <div className="container">
    <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
      <h5 className="section-title ff-secondary text-center text-dark fw-normal">Community Members</h5>
      <h1 className="mb-5 text-primary-emphasis">Community  Contributors</h1>
    </div>
    <div className="row g-4">
      {/* Member 1 */}
      <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
        <div className="team-item text-center rounded overflow-hidden">
          <div className="rounded-circle overflow-hidden m-4">
            <img className="img-fluid team-img" src={side4} alt="" width="200" height="200" />
          </div>
          <h5 className="mb-0">Full Name</h5>
          <small>Designation</small>
          <div className="d-flex justify-content-center mt-3">
            {/* Social media buttons */}
            <a className="btn btn-square btn-dark mx-1" href="">
                          <FontAwesomeIcon icon={faFacebook} />
                      </a>
                      <a className="btn btn-square btn-dark mx-1" href="">
                          <FontAwesomeIcon icon={faTwitter} />
                      </a>
                      <a className="btn btn-square btn-dark mx-1" href="">
                          <FontAwesomeIcon icon={faInstagram} />
                      </a>
          </div>
        </div>
      </div>
      {/* Member 2 */}
      <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
        <div className="team-item text-center rounded overflow-hidden">
          <div className="rounded-circle overflow-hidden m-4">
            <img className="img-fluid team-img" src={side4} alt="" width="200" height="200" />
          </div>
          <h5 className="mb-0">Full Name</h5>
          <small>Designation</small>
          <div className="d-flex justify-content-center mt-3">
            {/* Social media buttons */}
            <a className="btn btn-square btn-dark mx-1" href="">
                          <FontAwesomeIcon icon={faFacebook} />
                      </a>
                      <a className="btn btn-square btn-dark mx-1" href="">
                          <FontAwesomeIcon icon={faTwitter} />
                      </a>
                      <a className="btn btn-square btn-dark mx-1" href="">
                          <FontAwesomeIcon icon={faInstagram} />
                      </a>
          </div>
        </div>
      </div>
      {/* Member 3 */}
      <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
        <div className="team-item text-center rounded overflow-hidden">
          <div className="rounded-circle overflow-hidden m-4">
            <img className="img-fluid team-img" src={side4} alt="" width="200" height="200" />
          </div>
          <h5 className="mb-0">Full Name</h5>
          <small>Designation</small>
          <div className="d-flex justify-content-center mt-3">
            {/* Social media buttons */}
            <a className="btn btn-square btn-dark mx-1" href="">
                          <FontAwesomeIcon icon={faFacebook} />
                      </a>
                      <a className="btn btn-square btn-dark mx-1" href="">
                          <FontAwesomeIcon icon={faTwitter} />
                      </a>
                      <a className="btn btn-square btn-dark mx-1" href="">
                          <FontAwesomeIcon icon={faInstagram} />
                      </a>
          </div>
        </div>
      </div>
      {/* Member 4 */}
      <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.7s">
        <div className="team-item text-center rounded overflow-hidden">
          <div className="rounded-circle overflow-hidden m-4">
            <img className="img-fluid team-img" src={side4} alt="" width="200" height="200" />
          </div>
          <h5 className="mb-0">Full Name</h5>
          <small>Designation</small>
          <div className="d-flex justify-content-center mt-3">
            {/* Social media buttons */}
            <a className="btn btn-square btn-dark mx-1" href="">
                          <FontAwesomeIcon icon={faFacebook} />
                      </a>
                      <a className="btn btn-square btn-dark mx-1" href="">
                          <FontAwesomeIcon icon={faTwitter} />
                      </a>
                      <a className="btn btn-square btn-dark mx-1" href="">
                          <FontAwesomeIcon icon={faInstagram} />
                      </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
{/* Team End */}


      {/* Testimonial Start */}
      <div id ="contact" className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
        <div className="container">
          <div className="text-center">
            <h5 className="section-title ff-secondary text-center text-dark fw-normal">Testimonial</h5>
            <h1 className="mb-5 text-primary-emphasis">Our Clients Say!!!</h1>
          </div>
          <div className="owl-carousel testimonial-carousel">
            <div className="testimonial-item bg-transparent border rounded p-4">
              <i className="fa fa-quote-left fa-2x text-primary mb-3"></i>
              <p>As a client, I've had the pleasure of attending several events organized by our community members. Each event has been thoughtfully planned and executed, showcasing the passion and creativity of our members</p>
              <div className="d-flex align-items-center">
                <div className="ps-3">
                  <h5 className="mb-1 text-primary-emphasis">Emily Green</h5>
                  <small>Environmental Consultant</small>
                </div>
              </div>
            </div>
            <div className="testimonial-item bg-transparent border rounded p-4">
              <i className="fa fa-quote-left fa-2x text-primary mb-3"></i>
              <p>The dedication of our community members shines through in the quality of events they organize. It's inspiring to see how their efforts continue to strengthen the bonds within our community</p>
              <div className="d-flex align-items-center">
                <div className="ps-3">
                  <h5 className="mb-1 text-primary-emphasis">Maria Garcia</h5>
                  <small>Nonprofit Director </small>
                </div>
              </div>
            </div>
            <div className="testimonial-item bg-transparent border rounded p-4">
              <i className="fa fa-quote-left fa-2x text-primary mb-3"></i>
              <p>The positive feedback from attendees speaks volumes about the impact of our community's work. The events organized by our members have become integral to the fabric of our neighborhood, fostering a sense of unity and connection</p>
              <div className="d-flex align-items-center">
                <div className="ps-3">
                  <h5 className="mb-1 text-primary-emphasis">Dr. Lisa Chen</h5>
                  <small> Public Health Professional </small>
                </div>
              </div>
            </div>
            <div className="testimonial-item bg-transparent border rounded p-4">
              <i className="fa fa-quote-left fa-2x text-primary mb-3"></i>
              <p>I've been consistently impressed by the caliber of events our community members put together. It's evident they deeply care about fostering connections and creating memorable moments for everyone involved</p>
              <div className="d-flex align-items-center">
                <div className="ps-3">
                  <h5 className="mb-1 text-primary-emphasis">Sarah Johnson</h5>
                  <small>Urban Planner </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Testimonial End */}

      {/* Contact Start */}
      <div className='container'>
            <h5 className="section-title ff-secondary text-primary-emphasis fw-normal">Contact Us</h5>
            <h1>Get In Touch</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control form-control-lg border-dark w-50"
                        placeholder="Your Name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="email"
                        className="form-control form-control-lg border-dark w-50"
                        placeholder="Your Email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control form-control-lg border-dark w-50"
                        placeholder="Subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <textarea
                        className="form-control form-control-lg border-dark w-50"
                        rows="4"
                        placeholder="Your Message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                    ></textarea>
                </div>
                <div>
                    <button type="submit" className="btn btn-dark btn-lg px-5">Send Message</button>
                </div>
            </form>
        </div>
      {/* Contact End */}
    <br/>
      {/* Footer Start */}
      <footer className="container-xxl bg-dark text-white text-center py-4">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
              <a className="navbar-brand p-0" href="index.html">
                <h2 className="text-primary-emphasis m-0"><i className="fa fa-utensils me-3"></i>EcoHive </h2>
                {/* <img src="img/logo-white.png" alt="Logo"> */}
              </a>
            </div>
            <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="ff-secondary mb-4">Services</h5>
            <ul className="list-unstyled mb-0">
              <li className="mb-2"><a className="text-white" href="">Community Garden</a></li>
              <li className="mb-2"><a className="text-white" href="">Recycling Program</a></li>
              <li className="mb-2"><a className="text-white" href="">Educational Workshops</a></li>
              <li className="mb-2"><a className="text-white" href="">Green Transportation Services</a></li>
              <li className="mb-2"><a className="text-white" href="">Energy Efficiency Consultations</a></li>
            </ul>
            
            </div>
            <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
              <h5 className="ff-secondary mb-4">Support</h5>
              <ul className="list-unstyled mb-0">
                <li className="mb-2"><a className="text-white" href="">Terms of Service</a></li>
                <li className="mb-2"><a className="text-white" href="">Privacy Policy</a></li>
                <li className="mb-2"><a className="text-white" href="">Contact Us</a></li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-6">
              <h5 className="ff-secondary mb-4">Social Media</h5>
              <form className="mb-3">
                <div className="mb-3">
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <Facebook size={30} color="#3b5998" /> {/* Facebook icon */}
                <span style={{ marginRight: '10px' }}></span>
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                <Twitter size={30} color="#1da1f2" /> {/* Twitter icon */}
                <span style={{ marginRight: '10px' }}></span>
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <Instagram size={30} color="#c32aa3" /> {/* Instagram icon */}
                <span style={{ marginRight: '10px' }}></span>
            </a>
               </div>
    
              </form>
            </div>
          </div>
          <div className="border-top mt-4 border-light"></div>
          <div className="row justify-content-between align-items-center mt-4">
            <div className="col-lg-4 text-center text-lg-start">
              <p className="mb-lg-0">© 2024 Company Name. All Rights Reserved.</p>
            </div>
      
          </div>
        </div>
      </footer>
      {/* Footer End */}
    </div>
  );
}

export default Home;