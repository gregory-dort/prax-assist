import { useState } from 'react';

const NotificationBoard = () => {
    const [notifications, setNotifications] = useState([
        { id: 1, message: "New patient record updated.", time: "2 mins ago"},
        { id: 2, message: "New results are available.", time: "15 mins ago"},
    ]);

    const dismissNotification = (id) => {
        setNotifications(notifications.filter((notif) => notif.id !== id));
    };

    return(
       <div className = "card bg-gradient-to-b from-blue-400 to-sky-100 shadow-md rounded-lg p-6 w-full md:w-2/3 lg:w-1/2 mx-auto">
            <h2 className = "text-lg font-bold text-center text-gray-800 mb-2">🔔 Notifications</h2>

            {notifications.length > 0 ? (
                <ul className = "space-y-2">
                    {notifications.map((notif) => (
                        <li key = {notif.id} className = "p-3 bg-gray-100 rounded-md flex justify-between items-center hover:scale-105 transition-transform duration-200">
                            <div>
                                <span className = "text-gray-800">{notif.message}</span>
                                <p className = "text-sm text-gray-800">{notif.time}</p>
                            </div>
                            <button onClick={() => dismissNotification(notif.id)}
                            className = "btn btn-circle bg-gray-900 text-white text-lg flex items-center justify-center w-8 h-8 hover:scale-105 hover:shadow-xl transition-transform duration-200"
                            >
                                <span className = "text-bold">X</span>
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className = "text-gray-800 text-center py-4">No notifications available.</p>
            )}
       </div>
    );
};

export default NotificationBoard;