import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import NotificationBoard from '../components/NotificationBoard';
import prImage from '../assets/patient-records.png';
import kbImage from '../assets/knowledge-database.png';
import cbImage from '../assets/chatbot.png';
import lrImage from '../assets/lab-results.png'
import loImage from '../assets/lab-order.png';

function Dashboard() {
    const menuItems = [
        {
            title: 'Medical Chatbot',
            image: cbImage,
            description: 'Interact with the chatbot for medical advice or knowledge',
            link: '/messages',
        },
        {
            title: 'Knowledge Database',
            image: kbImage,
            description: 'Medical Knowledgebase with information on diseases, lab tests and symptoms',
            link: '/knowledgebase',
        },
        {
            title: 'Patient Records',
            image: prImage,
            description: 'Access and manage patient information. (Medical History, Lab Results, etc.)',
            link: '/patient-records',
        },
        {
            title: 'Lab Results',
            image: lrImage,
            description: 'View patient lab test results',
            link: '/lab-results',
        },
        {
            title: 'Lab Order',
            image: loImage,
            description: 'Order tests to be performed for patients and view test results',
            link: '/lab-order',
        },
    ]

    return(
       <div className = 'min-h-screen flex flex-col bg-gray-50'>
            {/* Navbar */}
            <Navbar />
            
            {/* Main Content */}
            <div className = 'flex-1 flex flex-col items-center p-6 pt-24'>

                {/* Notification Booard Section */}
                <NotificationBoard />

                {/* Welcome Message */}
                <h1 className = "text-3xl font-bold text-gray-800 text-center mb-10 mt-10">
                    Welcome to the PraxAssist Dashboard!
                </h1>

                {/* Cards Grid */}
                <div className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl'>
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

            {/* Footer */}
            <Footer />
       </div> 
    );
}

export default Dashboard;