import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Account = () => {

    const [users, setData] = useState([]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchUsers = async () => {
  
        try {
          const response = await axios.get('http://localhost:3000/users');
        //   console.log(response);
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
        first_name: firstName,
        last_name: lastName,
        email: email,
        contact: contact,
        password: password
      }
  
      axios.post('http://localhost:3000/user', userObj)
        .then(response => { console.log(response)
            navigate('/login')
        })
        .catch(() => console.log('Error in creating a new user'))
    }
    
    return (
    <>
        {/* {'Create a form and make a function to handle submission of form'} */}
        <div className="flex flex-col items-center mt-12 bg-gray-100 p-6 rounded-lg shadow-lg max-w-md mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
            {users?.map(user => {
                return (
                <div key={user._id}>
                <h3>{`${user.first_name} ${user.last_name}`}</h3>
                </div>
            )})}
            <form onSubmit={handleSubmit}>
                <label htmlFor="">First Name:
                <input 
                    type="text"
                    value={firstName}
                    placeholder="Enter your First Name"
                    // onChange={handleOnChange}
                    onChange={e => setFirstName(e.target.value)}
                    required
                    className="text-1xl font-semibold mb-4"
                />
                <br />
                </label>
                <label htmlFor="">Last Name:
                <input 
                    type="text" 
                    value={lastName}
                    placeholder="Enter your Last Name"
                    onChange={e => setLastName(e.target.value)}
                    required
                    className="text-1xl font-semibold mb-4"
                />
                </label>
                <br />
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
                <label htmlFor="">Contact No.:
                <input 
                    type="number" 
                    value={contact}
                    placeholder="Enter your Mobile No."
                    onChange={e => setContact(e.target.value)}
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
                <button 
                    type="submit"
                    className="bg-green-500 hover:bg-green-600 text-white text-lg px-6 py-3 rounded-lg shadow-md transition-all mt-4 justify-items-center"
                >Sign Up
                </button>
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

export default Account;