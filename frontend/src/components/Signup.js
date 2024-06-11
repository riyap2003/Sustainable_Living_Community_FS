import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Validation from './SignupValidation'
import axios from 'axios';
import backgroundImage from './Mainbg1.jpg';
function Signup() {
    const [values,SetValues] =useState({
        name:'',
        email: '',
        password:''
      })
      const navigate = useNavigate();
      const[errors,setErrors]=useState({})
      const handleInput=(event)=>{
        SetValues(prev=>({...prev,[event.target.name]:[event.target.value]}))
      }
      const handleSubmit = async (event) => {
        event.preventDefault();
        setErrors(Validation(values));
        if(errors.name ==="" && errors.email===""&& errors.password===""){
            axios.post('http://localhost:8081/signup', values)
            .then(res => {
                navigate('/login');
        })
        .catch(console.log(errors))
    }
}
  return (
    <div className='d-flex justify-content-center align-items-center bg-secondary vh-100'
    style={{
      backgroundImage: `url(${backgroundImage})`,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
            
  }}>
        <div className=' p-3 rounded w-25' style={{ position: 'absolute',
        width: '100%',
        height: '65%',
        backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
        <h2>Sign-Up</h2>
        <form action="" onSubmit={handleSubmit}>
            <div className='mb-3'>
                <label htmlFor="name"><strong>Name</strong></label>
                <input type="text   " placeholder='Enter Name' name='name' onChange={handleInput}  className='form-control rounded-0'/>
                {errors.name && <span className='text-danger'>{errors.name}</span>}
            </div>
            <div className='mb-3'>
                <label htmlFor="email"><strong>Email</strong></label>
                <input type="email" placeholder='Enter Email' name='email' onChange={handleInput}  className='form-control rounded-0'/>
                {errors.email && <span className='text-danger'>{errors.email}</span>}
            </div>
            <div className='mb-3'>
                <label htmlFor="password"><strong>Password</strong></label>
                <input type="password" placeholder='Enter Password' name='password' onChange={handleInput}  className='form-control rounded-0'/>
                {errors.password && <span className='text-danger'>{errors.password}</span>} 
            </div>
            <button type='submit' className='btn btn-success w-100 rounded-0'>Sign up</button>
            <p>You are agree to our terms and polices</p>
            <Link to="/" className='btn btn-dark border w-100  rounded-0 text-decoration-none'>Login</Link>
        </form>
        </div>
    </div>
  )
}

export default Signup
