import React, { useState,useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'; 

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import backgroundImage from './Mainbg1.jpg';
function Main2() {
    const { communityId } = useParams();
     // Extract communityId from URL parameters
    const [members, setMembers] = useState([]);
    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        join_date: '',
        address: '',
        phone_no: ''
    });

    const [isFormVisible, setIsFormVisible] = useState(false);
    const [editingMember, setEditingMember] = useState(null);
    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    

        // Inside your component
const fetchMembers = async () => {
    try {
        const response = await axios.get(`http://localhost:8081/main2/${communityId}`);
        setMembers(response.data);
    } catch (error) {
        console.error('Error fetching community members:', error);
    }
};

useEffect(() => {
    const fetchMembers = async () => {
        try {
            const response = await axios.get(`http://localhost:8081/main2/${communityId}`);
            setMembers(response.data);
        } catch (error) {
            console.error('Error fetching community members:', error);
        }
    };

    // Fetch members when communityId changes
    if (communityId) {
        fetchMembers();
    }
}, [communityId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!communityId) {
                console.error('Community ID is undefined');
                return;
            }

            const response = await axios.post(`http://localhost:8081/main2/${communityId}`, formData);
            console.log(response.data);

            
            
            // Reset the form after successful submission
            setFormData({
                fname: '',
                lname: '',
                join_date: '',
                address: '',
                phone_no: ''
            });

            // Hide the form after submission
            setIsFormVisible(false);
            fetchMembers();
            const updatedResponse = await axios.get('http://localhost:8081/main2');
            setMembers(updatedResponse.data);
            
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const handleDeleteMember = async (memberId) => {
        try {
            if (!memberId) {
                console.error('Member ID is undefined');
                return;
            }
            // Send DELETE request to the backend
            await axios.delete(`http://localhost:8081/main2/${communityId}/${memberId}`);
    
            // Refresh the member list after deletion
            await fetchMembers();
        } catch (error) {
            // Handle errors
        }
    };
    
    const handleEditMember = async (memberId) => {
        try {
            // Fetch member details for editing
            const memberResponse = await axios.get(`http://localhost:8081/main2/${communityId}/${memberId}`);
            const memberToEdit = memberResponse.data;
                // Assuming joinDate is a Date object
            const formattedJoinDate =  memberToEdit.join_date ? memberToEdit.join_date.split('T')[0] : ''; // Extracts the date part in YYYY-MM-DD format

// Now you can use formattedJoinDate in your SQL query

            // Populate the form with member details
            setFormData({
                fname: memberToEdit.FNAME || '',
                lname: memberToEdit.LNAME || '',
                join_date: formattedJoinDate || '',
                address: memberToEdit.ADDRESS || '',
                phone_no: memberToEdit.PHONE_NO || ''
            });
            
            // Set the member being edited
            setEditingMember(memberToEdit);
        } catch (error) {
            console.error('Error editing member:', error);
        }
    };
    
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            if (!communityId || !editingMember) {
                console.error('Community ID or editing member is undefined');
                return;
            }
            
        // Convert the date format to 'YYYY-MM-DD'
        const formattedJoinDate = formData.join_date ? new Date(formData.join_date).toISOString().split('T')[0] : '';
    
            const response = await axios.put(`http://localhost:8081/main2/${communityId}/${editingMember.MEMBER_ID}`, {...formData,
            join_date: formattedJoinDate // Update the join_date with the formatted value
        });
            console.log(response.data);
    
            // Reset the form after successful submission
            setFormData({
                fname: '',
                lname: '',
                join_date: '',
                address: '',
                phone_no: ''
            });
    
            // Hide the form after submission
            setEditingMember(null);
    
            // Refresh the member list after updating
            fetchMembers();
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };
    
    
    
    return (

        
        <div className="container-xxl position-relative p-0 py-3" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'top', minHeight: '100vh' }}>
                {/* Navbar & Hero Start */}
            
                <nav className="navbar navbar-expand-lg navbar-dark  navbar-fixed-top px-4 px-lg-5 py-3 py-lg-0">
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
                <br></br>
                {/* Navbar & Hero End */}
            
            <div className='container text-primary-emphasis'>
            <h3>Member Details of Community ID: {communityId}</h3>
            <br />

            <h2>Community Members</h2>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Full Name</th>
                        <th>Address</th>
                        <th>Join Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {members.map((member, index) => (
                        <tr key={index}>
                            <td>{member.full_name}</td>
                            <td>{member.ADDRESS}</td>
                            <td>{member.formatted_join_date}</td>
                            <td >
                            <button onClick={() => handleDeleteMember(member.MEMBER_ID)} className='btn btn-dark'>Delete</button>
            
                            <button onClick={()=>handleEditMember(member.MEMBER_ID)} className='btn btn-dark'>Edit</button><br/>
                        </td>           
                        
                        </tr>
                    ))}
                </tbody>
            </table>
                <button className='  btn display-2 btn-dark' onClick={() => setIsFormVisible(!isFormVisible)}>Add Member </button>
                { isFormVisible &&
                <form onSubmit={handleSubmit} >
                <div className='form1 display-6'>Enter the Member Details: </div> <br/>
                 <div className='mb-3'>
                    <label htmlFor="memberName"><strong>First Name</strong></label>
                    <input type="text" name="fname" className='form-control rounded-0' value={formData.fname} onChange={handleChange} placeholder="First Name" />
                    </div>
                    <div className='mb-3'>
                    <label htmlFor="memberName"><strong>Last Name</strong></label>
                    <input type="text" name="lname" className='form-control rounded-0'  value={formData.lname} onChange={handleChange} placeholder="Last Name" />
                    </div>
                    <div className='mb-3'>
                    <label htmlFor="joindate"><strong>Join Date</strong></label>
                    <input type="date" name="join_date" className='form-control rounded-0'  value={formData.join_date} onChange={handleChange} />
                    </div>
                    <div className='mb-3'>
                    <label htmlFor="address"><strong>Address</strong></label>
                    <input type="text" name="address" className='form-control rounded-0' value={formData.address} onChange={handleChange} placeholder="Address" />
                    </div>
                    <div className='mb-3'>
                    <label htmlFor="phoneno"><strong>Phone Number</strong></label>
                    <input type="text" name="phone_no" className='form-control rounded-0' value={formData.phone_no} onChange={handleChange} placeholder="Phone Number" />
                    </div>
                    {communityId && <button type="submit" className="btn btn-dark form-control rounded-0">Submit</button>}
                    {!communityId && <p>Please select a community first</p>}
                
                </form>
            }
            {editingMember && (
                <form onSubmit={handleUpdate}>
                    <div className='form1 display-6'>Edit Member Details: </div> <br/>
                    <div className='mb-3'>
                    <label htmlFor="memberName"><strong>First Name</strong></label>
                    <input type="text" name="fname" className='form-control rounded-0' value={formData.fname || editingMember.fname} onChange={handleChange} placeholder={editingMember.fname} />
                    </div>
                    <div className='mb-3'>
                    <label htmlFor="memberName"><strong>Last Name</strong></label>
                    <input type="text" name="lname" className='form-control rounded-0' value={formData.lname || editingMember.lname} onChange={handleChange} placeholder={editingMember.lname} /></div>
                    <div className='mb-3'>
                    <label htmlFor="joindate"><strong>Join Date</strong></label>
                    <input type="date" name="join_date" className='form-control rounded-0' value={formData.join_date || editingMember.join_date} onChange={handleChange} placeholder={editingMember.join_date  } /></div>
                    <div className='mb-3'>
                    <label htmlFor="address"><strong>Address</strong></label>
                    <input type="text" name="address" className='form-control rounded-0' value={formData.address || editingMember.address} onChange={handleChange} placeholder={editingMember.address} /></div>
                    <div className='mb-3'>
                    <label htmlFor="address"><strong>Phone no</strong></label>
                    <input type="text" name="phone_no" className='form-control rounded-0' value={formData.phone_no || editingMember.phone_no} onChange={handleChange} placeholder={editingMember.phone_no} /></div>
                    {communityId && <button type="submit" className="btn btn-dark form-control rounded-0">Update</button>}
                    {!communityId && <p>Please select a community first</p>}
                </form>
            )}
            
            </div>
            </div>

    )
    
}

export default Main2;
