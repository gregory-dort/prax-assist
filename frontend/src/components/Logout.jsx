import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await fetch("/api/logout", 
            {
                method: "POST",
                credentials: "include", // Makes sure that cookies / session tokens are included
            });

            const data = await response.json();
            if(response.ok) {
                alert(data.message || "Logged out successfully");
                navigate("/login"); // redirect to login page
            } else {
                alert(data.error || "Logout failed");
            }
        } catch (error) {
            console.error("Logout error:", error);
            alert("An error occurred while logging out. Please try again");
        }
    };

    return <button onClick={handleLogout} className = "text-gray-800">Logout</button>;
};

export default Logout;