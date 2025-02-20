import Header from '../components/Header'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Card from '../components/Card';

function Dashboard() {
    const menuItems = [
        {
            title: 'Medical Chatbot',
            description: 'Interact with the chatbot for medical advice or knowledge',
            link: '/messages',
        },
        {
            title: 'Knowledge Database',
            description: 'Medical Knowledgebase with information on diseases, lab tests and symptoms',
            link: '/knowledgebase',
        },
        {
            title: 'Patient Records',
            description: 'Access and manage patient information. (Medical History, Lab Results, etc.)',
            link: '/patient-records',
        },
        {
            title: 'Lab Order',
            description: 'Access and manage patient information.',
            link: '/lab-order',
        },
    ]

    return(
       <div className = 'page-container'>
            <Header />
            <div className = 'dashboard-container'>
                <Navbar />
                <div className = 'dashboard-content'>
                <h1>Welcome to the Dashboard!</h1>
                    <div className = 'card-grid-container'>
                        <div className = 'card-grid'>
                            {menuItems.map((item, index) => (
                                <Card
                                    key = {index}
                                    title = {item.title}
                                    description = {item.description}
                                    image = {item.image}
                                    link = {item.link}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
       </div> 
    );
}

export default Dashboard;