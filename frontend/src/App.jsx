import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login'
import Logout from './components/Logout';
import CreateAccount from './components/CreateAccount'; 
import Dashboard from './pages/Dashboard';
import Chatbot from './pages/Chatbot';
import KnowledgeBase from './pages/KnowledgeBase';
import PatientRecords from './pages/PatientRecord';
import LabOrder from './pages/LabOrder';
import './styles/index.css'

function App() {

  return (
    <Router>
      <Routes>
        <Route path = "/" element = {<Login />} />
        <Route path = "/create-account" element = {<CreateAccount />} />
        <Route path = "/dashboard" element = {<Dashboard />}/>
        <Route path = "/messages" element = {<Chatbot />}/>
        <Route path = "/knowledgebase" element = {<KnowledgeBase />}/>
        <Route path = "/patient-records" element = {<PatientRecords />}/>
        <Route path = "/lab-order" element = {<LabOrder />}/>
        <Route path = "/logout" element = {<Logout />}/>
        <Route path = "*" element = {<Navigate to = "/" />} />
      </Routes>
    </Router>
  )
}

export default App
