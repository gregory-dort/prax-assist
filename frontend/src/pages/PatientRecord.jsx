import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

const PatientRecords = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        // Sample patient data (Replace with API call)
        const patientData = [
            { id: 1, name: "John Doe", age: 45, height: "5'9\"", weight: "170 lbs", lastVisit: "March 10, 2025" },
            { id: 2, name: "Jane Smith", age: 30, height: "5'6\"", weight: "140 lbs", lastVisit: "March 8, 2025" },
            { id: 3, name: "Robert Brown", age: 50, height: "6'0\"", weight: "190 lbs", lastVisit: "March 12, 2025" },
            { id: 4, name: "Emily Davis", age: 28, height: "5'5\"", weight: "130 lbs", lastVisit: "March 14, 2025" },
            { id: 5, name: "Michael Johnson", age: 40, height: "5'11\"", weight: "180 lbs", lastVisit: "March 15, 2025" }
        ];

        // Sort patients alphabetically by name
        const sortedPatients = patientData.sort((a, b) => a.name.localeCompare(b.name));
        setPatients(sortedPatients);
    }, []);

    // Filter patients based on search query
    const filteredPatients = patients.filter((patient) =>
        patient.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />
            <div className="container mx-auto p-6">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">📁 Patient Records</h1>

                {/* Search Bar */}
                <input
                    type="text"
                    placeholder="Search by patient name..."
                    className="w-full p-2 border border-blue-300 rounded-md mb-4 text-gray-800"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />

                {/* Patient List */}
                {filteredPatients.length > 0 ? (
                    <ul className="space-y-3">
                        {filteredPatients.map((patient) => (
                            <li
                                key={patient.id}
                                className="p-4 bg-sky-100 rounded-md shadow-md cursor-pointer hover:bg-blue-300"
                                onClick={() => setSelectedPatient(patient)}
                            >
                                <h2 className="text-lg font-semibold text-gray-800">{patient.name}</h2>
                                <p className="text-sm text-gray-600">Last Visit: {patient.lastVisit}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-800 text-center">No patient records found.</p>
                )}

                {/* Detailed View */}
                {selectedPatient && (
                    <div className="mt-6 p-4 border border-gray-300 rounded-md bg-white shadow-md">
                        <h2 className="text-xl font-bold text-gray-800">{selectedPatient.name}</h2>
                        <p className="text-gray-700"><strong>Age:</strong> {selectedPatient.age}</p>
                        <p className="text-gray-700"><strong>Height:</strong> {selectedPatient.height}</p>
                        <p className="text-gray-700"><strong>Weight:</strong> {selectedPatient.weight}</p>
                        <p className="text-gray-700"><strong>Last Visit:</strong> {selectedPatient.lastVisit}</p>
                        <button
                            onClick={() => setSelectedPatient(null)}
                            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                        >
                            Close
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PatientRecords;