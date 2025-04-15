import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './components/Login'
import Logout from './components/Logout';
import CreateAccount from './components/CreateAccount'; 
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import AdminDashboard from './pages/AdminDashboard';
import Chatbot from './pages/Chatbot';
import KnowledgeBase from './pages/KnowledgeBase';
import PatientRecords from './pages/PatientRecord';
import LabOrder from './pages/LabOrder';
import LabResults from './pages/LabResults';
import './styles/index.css'

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/api/current-user", {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => setUser(data.user))
      .catch(err => console.error(err));
  }, []);

  return (
    <Router>
      <Routes>
        <Route path = "/" element = {<Login />} />
        <Route path = "/create-account" element = {<CreateAccount />} />

        {/* Admin Routes */}
        <Route 
        path = "/admin"
        element = {
          <ProtectedRoute user = {user} role = "admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
        />
        
        <Route path = "/dashboard" element = {<Dashboard />}/>
        <Route path = "/messages" element = {<Chatbot />}/>
        <Route path = "/knowledgebase" element = {<KnowledgeBase />}/>
        <Route path = "/patient-records" element = {<PatientRecords />}/>
        <Route path = "/lab-order" element = {<LabOrder />}/>
        <Route path = "/lab-results" element = {<LabResults />}/>
        <Route path = "/logout" element = {<Logout />}/>
        <Route path = "*" element = {<Navigate to = "/" />} />
      </Routes>
    </Router>
  )
}

export default App
