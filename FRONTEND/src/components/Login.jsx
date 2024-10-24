import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";



const Login = () => {

    const [users, setData] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
    
          try {
            const response = await axios.get('http://localhost:3000/users');
            setData(response.data.users);
            
          } catch (error) {
            console.error("No Input");
          }
        }
    
        fetchUsers()
    
      }, [users])
    
      const handleSubmit = (e) => {
        e.preventDefault(); 
    
        const userObj = {
          email: email,
          password: password
        }
    
        axios.post('http://localhost:3000/login', userObj)
          .then(response => { 
            console.log(response)
            if(response.data ==="Success") {
              navigate('/')
            }
          })
          .catch(() => console.log('Error in creating a new user'))
      }

    return (
        <>
            {/* {'Create a form and make a function to handle submission of form'} */}
            <div className="flex flex-col items-center mt-12 bg-gray-100 p-6 rounded-lg shadow-lg max-w-md mx-auto">
            <h2 className="text-3xl font-semibold mb-4">Login</h2>
            <form onSubmit={handleSubmit}>
                    <label htmlFor="">Email:
                    <input 
                        type="email" 
                        value={email}
                        placeholder="Enter your Email"
                        onChange={e => setEmail(e.target.value)}
                        required
                        className="text-1xl font-semibold mb-4"
                    />
                    </label>
                    <br />
                    <label htmlFor="">Password:
                    <input 
                        type="password" 
                        value={password}
                        placeholder="Enter your Password"
                        onChange={e => setPassword(e.target.value)}
                        required
                        className="text-1xl font-semibold mb-4"
                    />
                    </label>
                    <br />
                    <Link to="/login"  
                        type="button"
                        className="bg-green-500 hover:bg-green-600 text-white text-lg px-6 py-3 rounded-lg shadow-md transition-all mt-4 justify-items-center"
                    >Login
                    </Link>
                </form>
            </div>
        </>
        )
}

export default Login;