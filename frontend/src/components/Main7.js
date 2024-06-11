import React, { useState, useEffect } from 'react';
import axios from 'axios';
import backgroundImage from './Mainbg1.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function Main7() {
  const [formData, setFormData] = useState({
    COMMUNITY_ID: '',
    RATING: '',
    DESCRIPTIONS: ''
  });
  const [communityId, setCommunityId] = useState('');
  const [communities, setCommunities] = useState([]); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Include the selected community ID in the form data
      const feedbackData = {
        ...formData,
        COMMUNITY_ID: communityId // Set the selected community ID
      };
      await axios.post('http://localhost:8081/main7', feedbackData);
      alert('Feedback submitted successfully!');
      // Clear form after submission
      setFormData({
        COMMUNITY_ID: '',
        RATING: '',
        DESCRIPTIONS: ''
      });
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Error submitting feedback. Please try again later.');
    }
  };

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const response = await axios.get('http://localhost:8081/main1');
        setCommunities(response.data);
      } catch (error) {
        console.error('Error fetching communities:', error);
        // Handle error as needed
      }
    };
    fetchCommunities();
  }, []);

  return (
    <div className='container-xxl' style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'top', minHeight: '100vh' }}>
      {/* Navbar & Hero Start */}
      <nav className="navbar navbar-expand-lg navbar-dark navbar-fixed-top px-4 px-lg-5 py-3 py-lg-0">
        <h1 className="text-dark display-5 fw-bold" style={{ fontFamily: 'Times New Roman, serif' }}>
          <FontAwesomeIcon icon={faUsers} />EcoHive
        </h1>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
          <span className="fa fa-bars"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarCollapse">
          <Link to="/main3" className="btn btn-dark py-2 px-4 text-light">Back</Link>
        </div>
      </nav>
      <br />
      <div className='container text-primary-emphasis'>
        <h2>Feedback Form</h2>
        <form onSubmit={handleSubmit} className="feedback-form">
          <div className="form-group">
            <label><strong>Community:</strong></label>
            <select className='form-control' value={communityId} onChange={(e) => setCommunityId(e.target.value)} required>
              <option value="">Select Community</option>
              {communities.map(community => (
                  <option key={community.COMMUNITY_ID} value={community.COMMUNITY_ID}>{community.COMMUNITY_NAME}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label><strong>Rating:</strong></label>
            <input type="number" className="form-control" name="RATING" value={formData.RATING} onChange={handleChange} min="1" max="5" required />
          </div>
          <div className="form-group">
            <label><strong>Descriptions:</strong></label>
            <textarea className="form-control" name="DESCRIPTIONS" value={formData.DESCRIPTIONS} onChange={handleChange} required />
          </div>
          <br/>
          <button type="submit" className="btn btn-dark">Submit Feedback</button>
        </form>
      </div>
    </div>
  );
}

export default Main7;
