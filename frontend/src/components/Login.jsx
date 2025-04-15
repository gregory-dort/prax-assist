import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import bgImage from '../assets/login-bg.jpeg';

function Login() {
    const[username, setUsername] = useState("");
    const[password, setPassword] = useState("");
    const navigate = useNavigate();

    // const handleLogin = async (e) => {

    //     e.preventDefault();
    
    //     try {
    //         const response = await fetch("/api/login", {
    //           method: "POST",
    //           credentials: "include",
    //           headers: { "Content-type": "application/json" },
    //           body: JSON.stringify({ username, password }), 
    //         });

    //         const data = await response.json();

    //         if (response.ok) {
    //           // get user session data
    //           const userRes = await fetch("/api/current-user", {
    //             credentials: "include"
    //           });

    //           const userData = await userRes.json();

    //           if (userData.user?.role === "admin") {
    //             navigate("/admin");
    //           } else {
    //             navigate("/dashboard");
    //           }
    //         } else {
    //           alert(data.error || "Login failed");
    //         }
    //     } catch (error) {
    //       console.error("Login error:", error);
    //       alert("An error occurred. Please try again.");
    //     }
    // };

    const handleLogin = async (e) => {
      e.preventDefault();
      console.log("HANDLE LOGIN CLICKED");
      try {
        console.log("HANDLE LOGIN TRIED");
        console.log("Username:", username, "Password:", password);
          const response = await fetch("/api/login", { //or /api/login when done testing.
              method: "POST",
              credentials: "include",
              headers: { "Content-type": "application/json" },
              body: JSON.stringify({ username, password }),
              });

          if (!response.ok) {
              const text = await response.text();
              console.error("Login error:", text);
              alert("Login failed");
              return;
          }

          if(response.headers.get("Content-Type").includes("application/json")){
              const data = await response.json();
              alert(data.message); // or navigate or any other logic.
              navigate("/dashboard");
          } else {
              const text = await response.text();
              alert(text);
          }

      } catch (error) {
          console.error("Login error:", error);
          alert("An error occurred. Please try again.");
      }
  };

  return (
    <div className ='relative h-screen w-full flex justify-center items-center'>
      {/* Background Image */}
      <div 
          className="absolute inset-0 bg-cover bg-center -z-10"
          style={{ backgroundImage: `url(${bgImage})`, zIndex: "-1" }}
      ></div>

      {/* Overlay to darken the background (optional) */}
      <div className="absolute inset-0 bg-black/50 -z-10"></div>

      {/* Login Card (Container) */}
      <div className = "relative z-10 card w-96 bg-white shadow-xl p-6 rounded-2xl">
        <h1 className = "text-2xl font-bold text-center text-gray-800 mb-4">Login</h1>
        <form onSubmit = {handleLogin} className = "flex flex-col gap-4">
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            className = "input input-bordered border-2 border-gray-300 focus:border-blue-400 focus:ring-blue-400 w-full rounded-lg"
          />
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className = "input input-bordered border-2 border-gray-300 focus:border-blue-400 focus:ring-blue-400 w-full rounded-lg"
          />
          <button type = "submit" className = "btn bg-sky-100 hover:bg-blue-400 text-gray-800 w-full rounded-lg">Login</button> 
        </form>
        <p className = "text-sm text-center text-gray-600 mt-4">
          Don&apos;t have an account yet? <Link to = "/create-account" className = "text-gray-800 hover:text-blue-400">Create one here</Link>
        </p>
      </div> 
    </div>
  );
};

export default Login;