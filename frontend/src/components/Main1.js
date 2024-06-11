import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import backgroundImage from './Mainbg1.jpg';
function Main1() {
    // State variables to manage community data and form input
    const [communities, setCommunities] = useState([]);
    const [communityName, setCommunityName] = useState('');
    const [foundingDate, setFoundingDate] = useState('');
    const [location, setLocation] = useState('');
    const [fetchError, setFetchError] = useState('');

    // Function to fetch community data from the database
    const fetchCommunities = async () => {
        try {
            const response = await axios.get('http://localhost:8081/main1');
            setCommunities(response.data);
            setFetchError('');
        } catch (error) {
            setFetchError('Error fetching data from the server');
        }
    };

    // Fetch communities when the component mounts
    useEffect(() => {
        fetchCommunities();
    }, []);

    // Function to handle form submission and add a new community
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // Send POST request to add community
            await axios.post('http://localhost:8081/main1', {
                communityName,
                foundingDate,
                location
            });

            // Clear form inputs
            setCommunityName('');
            setFoundingDate('');
            setLocation('');

            // Fetch updated community data
            fetchCommunities();
        } catch (error) {
            console.error('Error adding community:', error);
        }
    };

    const handleDeleteMember = async (communityId) => {
        try {
            if (!communityId) {
                console.error('Member ID is undefined');
                return;
            }
            // Send DELETE request to the backend
            await axios.delete(`http://localhost:8081/main1/${communityId}`);
    
            // Refresh the member list after deletion
            await fetchCommunities();
        } catch (error) {
            // Handle errors
        }
    };

    return (

        <div className="container-xxl position-relative p-0 py-3" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'top', minHeight: '100vh' }}>
    {/* Navbar & Hero Start */}
    <nav className="navbar navbar-expand-lg navbar-dark navbar-fixed-top px-4 px-lg-5 py-3 py-lg-0">
        <h1 className="text-dark display-5 fw-bold" style={{ fontFamily: 'Times New Roman, serif'}}>
            <FontAwesomeIcon icon={faUsers} />EcoHive
        </h1>  
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
            <span className="fa fa-bars"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarCollapse">
            <Link to="/home" className="btn btn-dark py-2 px-4 text-light">Back</Link>
        </div>
    </nav>
    {/* Navbar & Hero End */}

    <div className="container text-primary-emphasis">
        <h2>Add Community</h2>
        {/* Your form and other content go here */}
        <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor="communityName"><strong>Community Name</strong></label>
                    <input
                        type="text"
                        placeholder='Enter Community Name'
                        value={communityName}
                        onChange={(e) => setCommunityName(e.target.value)}
                        className='form-control rounded-0'
                        required
                    />
                </div>
                <div className='mb-3'>
                    <label htmlFor="foundingDate"><strong>Founding Date</strong></label>
                    <input
                        type="date"
                        value={foundingDate}
                        onChange={(e) => setFoundingDate(e.target.value)}
                        className='form-control rounded-0'
                        required
                    />
                </div>
                <div className='mb-3'>
                    <label htmlFor="location"><strong>Location</strong></label>
                    <input
                        type="text"
                        placeholder='Enter Location'
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className='form-control rounded-0'
                        required
                    />
                </div>
                <button type='submit' className='btn btn-dark w-100 rounded-0'>Add Community</button>
            </form>

            <div className="mt-4">
                <h2>Communities</h2>
                {fetchError && <div className="alert alert-danger">{fetchError}</div>}
                <table className="table table-striped text-primary-emphasis">
    <thead>
        <tr>
            <th>Name</th>
            <th>Founding Date</th>
            <th>Location</th>
            <th>Action</th>
        </tr>
    </thead>
    <tbody>
        {communities.map((community) => (
            <tr key={community.COMMUNITY_ID}>
                <td>{community.COMMUNITY_NAME}</td>
                <td>{community.FOUNDING_DATE}</td>
                <td>{community.LOCATION}</td>
                <td>
                    <Link to={`/main2/${community.COMMUNITY_ID}`} className="btn btn-dark mr-2">Enter</Link> 

                    <button onClick={() => handleDeleteMember(community.COMMUNITY_ID)} className='btn btn-dark'>Delete</button>
                </td>
            </tr>
        ))}
    </tbody>
</table>

            </div>
    </div>
</div>
    );
}

export default Main1;
