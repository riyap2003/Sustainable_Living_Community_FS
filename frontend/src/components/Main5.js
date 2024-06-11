import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import backgroundImage from './Mainbg1.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';

function Main5() {
    const [members, setMembers] = useState([]);
    const [initiatives, setInitiatives] = useState([]);
    const [initiativesview,setInitiativesview] = useState([]);
    const [selectedMemberId, setSelectedMemberId] = useState('');
    const [selectedInitiativeId, setSelectedInitiativeId] = useState('');

    // Fetch member and initiative data
    const fetchMembers = async () => {
        try {
            const response = await axios.get('http://localhost:8081/members/all');
            setMembers(response.data);
        } catch (error) {
            console.error('Error fetching member details:', error);
        }
    };

    const fetchInitiatives = async () => {
        try {
            const response = await axios.get('http://localhost:8081/main4/initiatives');
            setInitiatives(response.data);
        } catch (error) {
            console.error('Error fetching initiative details:', error);
        }
    };

    useEffect(() => {
        fetchMembers();
        fetchInitiatives();
    }, []);

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await axios.post('http://localhost:8081/main5', {
                memberId: selectedMemberId,
                initiativeId: selectedInitiativeId
            });

            // Clear form inputs after submission
            setSelectedMemberId('');
            setSelectedInitiativeId('');

            // Fetch updated data if needed
            fetchInitiativesview();
        } catch (error) {
            console.error('Error adding member sustainable initiative:', error);
        }
    };

    // Fetch member sustainable initiatives
    const fetchInitiativesview = async () => {
        try {
            const response = await axios.get('http://localhost:8081/member_sustainable_initiatives');
            setInitiativesview(response.data);
        } catch (error) {
            console.error('Error fetching member sustainable initiatives:', error);
        }
    };

    useEffect(() => {
        fetchInitiativesview();
    }, []);


    return (
        <div className='container-xxl py-3' style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'top', minHeight: '100vh' }}>
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
            <div className="container text-primary-emphasis">
                <h2>Add Member Sustainable Initiative</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="member"><strong>Select Member:</strong></label>
                        <select
                            value={selectedMemberId}
                            onChange={(e) => setSelectedMemberId(e.target.value)}
                            className='form-control'
                            required
                        >
                            <option value="">Select Member</option>
                            {members.map(member => (
                                <option key={member.MEMBER_ID} value={member.MEMBER_ID}>{member.full_name}</option>
                            ))}
                        </select>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="initiative"><strong>Select Sustainable Initiative:</strong></label>
                        <select
                            value={selectedInitiativeId}
                            onChange={(e) => setSelectedInitiativeId(e.target.value)}
                            className='form-control'
                            required
                        >
                            <option value="">Select Initiative</option>
                            {initiatives.map(initiative => (
                                <option key={initiative.S_ID} value={initiative.S_ID}>{initiative.SUSTAINABLE_PRACTICE}</option>
                            ))}
                        </select>
                    </div>
                    <button type='submit' className='btn btn-dark'>Add Member Sustainable Initiative</button>
                </form>
                <div className="container">
                    <h2>Member Sustainable Initiatives</h2>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Member</th>
                                <th>Community</th>
                                <th>Sustainable Practice</th>
                            </tr>
                        </thead>
                        <tbody>
                            {initiativesview.map((initiative, index) => (
                                <tr key={`${initiative.fname || 'fallback'}_${initiative.lname || 'fallback'}_${index}`}>
                                <td>{initiative.fname} {initiative.lname}</td>
                                <td>{initiative.community_name}</td>
                                <td>{initiative.member_sustainable_initiative}</td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Main5;
