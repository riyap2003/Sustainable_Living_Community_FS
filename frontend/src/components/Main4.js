import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons'; // Import appropriate icon
import backgroundImage from './Mainbg1.jpg';

function Main4() {
    // State variables to manage sustainable initiatives data and form input
    const [initiatives, setInitiatives] = useState([]);
    const [sustainablePractice, setSustainablePractice] = useState('');
    const [budget, setBudget] = useState('');
    const [goals, setGoals] = useState('');
    const [fetchError, setFetchError] = useState('');

    // Function to fetch sustainable initiatives data from the database
    const fetchInitiatives = async () => {
        try {
            const response = await axios.get('http://localhost:8081/main4');
            setInitiatives(response.data);
            setFetchError('');
        } catch (error) {
            setFetchError('Error fetching data from the server');
        }
    };

    // Fetch sustainable initiatives when the component mounts
    useEffect(() => {
        fetchInitiatives();
    }, []);

    // Function to handle form submission and add a new sustainable initiative
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // Send POST request to add sustainable initiative
            await axios.post('http://localhost:8081/main4', {
                sustainablePractice,
                budget,
                goals
            });

            // Clear form inputs
            setSustainablePractice('');
            setBudget('');
            setGoals('');

            // Fetch updated sustainable initiatives data
            fetchInitiatives();
        } catch (error) {
            console.error('Error adding sustainable initiative:', error);
        }
    };

    return (
        <div className="container-xxl position-relative p-0" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'top', minHeight: '100vh' }}>
            {/* Navbar & Hero Start */}
            <nav className="navbar navbar-expand-lg navbar-dark navbar-fixed-top px-4 px-lg-5 py-3 py-lg-0">
                <h1 className="text-dark display-5 fw-bold" style={{ fontFamily: 'Times New Roman, serif'}}>
                    <FontAwesomeIcon icon={faUsers} />EcoHive
                </h1>  
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                    <span className="fa fa-bars"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarCollapse">
                    <Link to="/main3" className="btn btn-dark py-2 px-4 text-light">Back</Link>
                </div>
            </nav>
            {/* Navbar & Hero End */}

            <div className="container  text-primary-emphasis">
                <h2>Add Sustainable Initiative</h2>
                {/* Your form and other content go here */}
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="sustainablePractice"><strong>Sustainable Practice</strong></label>
                        <input
                            type="text"
                            placeholder='Enter Sustainable Practice'
                            value={sustainablePractice}
                            onChange={(e) => setSustainablePractice(e.target.value)}
                            className='form-control rounded-0'
                            required
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="budget"><strong>Budget</strong></label>
                        <input
                            type="text"
                            placeholder='Enter Budget'
                            value={budget}
                            onChange={(e) => setBudget(e.target.value)}
                            className='form-control rounded-0'
                            required
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="goals"><strong>Goals</strong></label>
                        <input
                            type="text"
                            placeholder='Enter Goals'
                            value={goals}
                            onChange={(e) => setGoals(e.target.value)}
                            className='form-control rounded-0'
                            required
                        />
                    </div>
                    <button type='submit' className='btn btn-dark w-100 rounded-0'>Add Sustainable Initiative</button>
                </form>

                <div className="container">
                    <h2>Sustainable Initiatives</h2>
                    {fetchError && <div className="alert alert-danger">{fetchError}</div>}
                    <table className="table" style={{ borderCollapse: 'collapse' }}>
                        <thead>
                            {/* Table header with columns: ID, Sustainable Practice, Budget, Goals, and Action */}
                            <tr>
                                <th >ID</th>
                                <th >Sustainable Practice</th>
                                <th >Budget</th>
                                <th >Goals</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Table body with rows for each sustainable initiative */}
                            {initiatives.map((initiative) => (
                                <tr key={initiative.S_ID}>
                                    <td >{initiative.S_ID}</td>
                                    {/* Display sustainable practice, budget, and goals */}
                                    <td >{initiative.SUSTAINABLE_PRACTICE}</td>
                                    <td >{initiative.BUDGET}</td>
                                    <td >{initiative.GOALS}</td>
                                    
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Main4;
