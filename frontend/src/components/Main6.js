import React, { useState, useEffect } from 'react';
import axios from 'axios';
import backgroundImage from './Mainbg1.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap'; 

function Main6() {
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventTheme, setEventTheme] = useState('');
    const [communityId, setCommunityId] = useState('');
    const [status, setStatus] = useState('');
    const [newStatus, setNewStatus] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [communities, setCommunities] = useState([]);
    const [events, setEvents] = useState([]);   
    const [eventId, setEventId] = useState('');

    const handleShow = (eventId) => {
        setEventId(eventId);
        setShowModal(true);
      };

      const handleClose = () => {
        setShowModal(false);
        setEventId('');
        setNewStatus('');
      };
    const fetchCommunities = async () => {
        try {
            const response = await axios.get('http://localhost:8081/main1');
            setCommunities(response.data);
        } catch (error) {
            console.error('Error fetching communities:', error);
            // Handle error as needed
        }
    };
    
    useEffect(() => {
        // Fetch events and communities when the component mounts
        fetchCommunities();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await axios.get('http://localhost:8081/events/all');
            setEvents(response.data);
        } catch (error) {
            console.error('Error fetching events:', error);
            // Handle error as needed
        }
    };

    useEffect(() => {
        // Fetch events and communities when the component mounts
        fetchCommunities();
        fetchEvents();
    }, []);

    const handleEventSubmit = async (event) => {
        event.preventDefault();

        try {
            await axios.post('http://localhost:8081/main6', {
                eventName,
                eventDate,
                eventTheme,
                communityId,
                status // assuming you have set up state for status
            });

            // Clear form inputs after submission
            setEventName('');
            setEventDate('');
            setEventTheme('');
            setCommunityId('');
            setStatus(''); // Reset status to 'Pending'

   
        } catch (error) {
            console.error('Error adding event:', error);
          
        }
    };

    const handleUpdateStatus = async () => {
        try {
            await axios.put(`http://localhost:8081/main8/${eventId}`, { newStatus });
            // Fetch updated events data after updating status
            const response = await axios.get('http://localhost:8081/events/all');
            setEvents(response.data);
            // Close modal
            handleClose();
            // Optionally, you can show a success message to the user
            alert('Event status updated successfully');
        } catch (error) {
            console.error('Error updating event status:', error);
            alert('Error updating event status');
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
                    <h2>Add Event</h2>
                    <form onSubmit={handleEventSubmit} >
                        <div>
                            <label><strong>Event Name:</strong></label>
                            <input className='form-control' type="text" value={eventName} onChange={(e) => setEventName(e.target.value)} required />
                        </div>
                        <div>
                            <label><strong>Event Date:</strong></label>
                            <input className='form-control' type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} required />
                        </div>
                        <div>
                            <label><strong>Event Theme:</strong></label>
                            <input className='form-control' type="text" value={eventTheme} onChange={(e) => setEventTheme(e.target.value)} required />
                        </div>
                        <div>
                            <label><strong>Community:</strong></label>
                            <select className='form-control' value={communityId} onChange={(e) => setCommunityId(e.target.value)} required>
                                <option value="">Select Community</option>
                                {communities.map(community => (
                                    <option key={community.COMMUNITY_ID} value={community.COMMUNITY_ID}>{community.COMMUNITY_NAME}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label><strong>Status:</strong></label>
                            <select className='form-control' value={status} onChange={(e) => setStatus(e.target.value)} required>
                            <option value=""></option>
                                <option value="Upcoming">Upcoming</option>
                                <option value="Completed">Completed</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                        </div>
                        <br />
                        <button className='form-control btn btn-dark' type="submit">Add Event</button>
                    </form>
                </div>
                <div className='container text-primary-emphasis'>
                <h2>Events</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Event Name</th>
                            <th>Date</th>
                            <th>Theme</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.map(event => (
                            <tr key={event.EVENT_ID}>
                                <td>{event.E_NAME}</td>
                                <td>{new Date(event.DATE).toLocaleDateString('en-GB')}</td>
                                <td>{event.THEME}</td>
                                <td>{event.STATUS}</td>
                                <td>
                                <button className="btn btn-dark"
                                 onClick={() => handleShow(event.EVENT_ID)}>Update</button>
                              </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
                <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Update Event Status</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <label htmlFor="newStatus">New Status:</label>
                <select
                id="newStatus"
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                required
              >
                <option value="">Select Status</option>
                <option value="Upcoming">Upcoming</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Completed">Completed</option>
                {/* Add more options as needed */}
              </select>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                  <Button variant="primary" onClick={handleUpdateStatus}>Update</Button>
                </Modal.Footer>
              </Modal>
            </div>
        </div>
        
    );
}

export default Main6;
