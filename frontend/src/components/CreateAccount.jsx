import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import bgImage from '../assets/login-bg.jpeg'; 

function CreateAccount() {
    const[username, setUsername] = useState("");
    const[password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = { username, password };
        console.log("payload being sent: ", payload);

        try {
            const response = await fetch("http://localhost:5001/api/create-account", {
              method: "POST",
              headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (response.ok) {
              window.alert(data.message); // Shows an alert to say account created successfully
              navigate("/") // Navigates to login page
            } else {
              window.alert(data.error); // Shows error as an alert
            } 
        } catch (error) {
            console.error("Error:", error);
            window.alert("An error occurred. Please try again.")
        }
      };

  return (
    <div className = 'relative h-screen w-full flex justify-center items-center'>
      {/* Background Image */}
      <div 
          className="absolute inset-0 bg-cover bg-center -z-10"
          style={{ backgroundImage: `url(${bgImage})`, zIndex: "-1" }}
      ></div>

      {/* Overlay to darken the background (optional) */}
      <div className="absolute inset-0 bg-black/50 -z-10"></div>

      <div className = "relative z-10 card w-96 bg-white shadow-xl p-6 rounded-2xl">
        <h1 className = "text-2xl font-bold text-center mb-4">Create Account</h1>
        <form onSubmit = {handleSubmit} className = "flex flex-col gap-4">
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            className = "input input-bordered border-2 border-gray-300 focus:border-primary focus:ring-primary w-full rounded-lg"
          />
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className = "input input-bordered border-2 border-gray-300 focus:border-primary focus:ring-primary w-full rounded-lg"
          />
          <button type = "submit" className = "btn btn-primary hover:bg-blue-400 w-full rounded-lg">Create Account</button> 
        </form>
        <p className = "text-sm text-center mt-4">
          Already have an account? <Link to = "/Login"> Login Here! </Link>
        </p>
      </div>
    </div>
  );
};

export default CreateAccount;