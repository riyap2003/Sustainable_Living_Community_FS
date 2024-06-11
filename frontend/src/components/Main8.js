import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import backgroundImage from './Mainbg1.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';

function Main8() {
  const [eventID, setEventID] = useState('');
  const [participantName, setParticipantName] = useState('');
  const [events, setEvents] = useState([]);
  const [minBudget, setMinBudget] = useState('');
  const [maxBudget, setMaxBudget] = useState('');
  const [initiatives, setInitiatives] = useState([]);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);
  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:8081/events/all');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8081/main8', {
        eventID: eventID,
        participantName: participantName
      });
      // Reset form fields after successful submission if needed
      setEventID('');
      setParticipantName('');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit1 = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8081/get-sustainable-initiatives', {
        minBudget: minBudget,
        maxBudget: maxBudget
      });
  
      // Check if the response data is an array and not empty
      if (Array.isArray(response.data) && response.data.length > 0) {
        // Set initiatives state with the correct data
        setInitiatives(response.data[0]);
        setError('');
        setSearched(true); // Set searched to true after successful search
      } else {
        setError('No sustainable initiatives found.'); // Display error if no data received
      }
    } catch (error) {
      console.error('Error fetching initiatives:', error);
      setError('Error fetching initiatives. Please try again.');
    }
  };
  
  

  return (
    <div className='container-xxl py-3' style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'top', minHeight: '100vh' }}>
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
      <h2>Participants Register for Events</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="eventIdSelect" className="form-label"><strong>Event ID:</strong></label>
            <select
              className='form-control'
              value={eventID}
              onChange={(e) => setEventID(e.target.value)}
              required
            >
            <option value="">Select Event ID</option>
            {events
              .filter(event => event.STATUS === 'Upcoming') // Filter events with status "completed"
              .map(event => (
                <option key={event.EVENT_ID} value={event.EVENT_ID}>
                  {event.E_NAME}    
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="participantNameInput" className="form-label"><strong>Participant Name:</strong></label>
            <input
              type="text"
              className='form-control'
              id="participantNameInput"
              value={participantName}
              onChange={(e) => setParticipantName(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-dark">Submit</button>
        </form>
        <br />
        <div>
          <h3>Search Sustainable Initiatives by Budget Range</h3>
          <form onSubmit={handleSubmit1}>
            <div className="mb-3">
              <label htmlFor="minBudgetInput" className="form-label"><strong>Min Budget:</strong></label>
              <input
                type="number"
                className='form-control'
                id="minBudgetInput"
                value={minBudget}
                onChange={(e) => setMinBudget(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="maxBudgetInput" className="form-label"><strong>Max Budget:</strong></label>
              <input
                type="number"
                className='form-control'
                id="maxBudgetInput"
                value={maxBudget}
                onChange={(e) => setMaxBudget(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-dark">Search</button>
          </form>
        </div>
        <br />
        {searched && (  
        <div>
        
          <h3>Sustainable Initiatives</h3>
          <table className="table table-striped">
          {error && <p>Error: {error}</p>}
          <thead>
            <tr>
              <th scope="col">Sustainable Practice</th>
              <th scope="col">Budget</th>
              <th scope="col">Goals</th>
            </tr>
          </thead>
          <tbody>
            {initiatives.map((initiative, index) => (
              <tr key={index}>
                <td>{initiative.SUSTAINABLE_PRACTICE}</td>
                <td>{initiative.BUDGET}</td>
                <td>{initiative.GOALS}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        )}
      </div>
    </div>
  );
}

export default Main8;
