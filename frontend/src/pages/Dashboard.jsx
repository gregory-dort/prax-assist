import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import NotificationBoard from '../components/NotificationBoard';

function Dashboard() {
    const menuItems = [
        {
            title: 'Medical Chatbot',
            image: {},
            description: 'Interact with the chatbot for medical advice or knowledge',
            link: '/messages',
        },
        {
            title: 'Knowledge Database',
            image: {},
            description: 'Medical Knowledgebase with information on diseases, lab tests and symptoms',
            link: '/knowledgebase',
        },
        {
            title: 'Patient Records',
            image: {},
            description: 'Access and manage patient information. (Medical History, Lab Results, etc.)',
            link: '/patient-records',
        },
        {
            title: 'Lab Order',
            image: {},
            description: 'Access and manage patient information.',
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