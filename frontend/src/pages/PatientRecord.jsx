import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

const PatientRecords = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [patients, setPatients] = useState([]);
    const [minAge, setMinAge] = useState("");
    const [maxAge, setMaxAge] = useState("");

    useEffect(() => {
        const patientData = [
            { id: 1, name: "John Doe", age: 45, height: "5'9\"", weight: "170 lbs", lastVisit: "March 10, 2025" },
            { id: 2, name: "Jane Smith", age: 30, height: "5'6\"", weight: "140 lbs", lastVisit: "March 8, 2025" },
            { id: 3, name: "Robert Brown", age: 50, height: "6'0\"", weight: "190 lbs", lastVisit: "March 12, 2025" },
            { id: 4, name: "Emily Davis", age: 28, height: "5'5\"", weight: "130 lbs", lastVisit: "March 14, 2025" },
            { id: 5, name: "Michael Johnson", age: 40, height: "5'11\"", weight: "180 lbs", lastVisit: "March 15, 2025" },
            { id: 6, name: "Angela Moore", age: 32, height: "5'4\"", weight: "125 lbs", lastVisit: "March 16, 2025" },
            { id: 7, name: "Brian Clark", age: 38, height: "5'10\"", weight: "175 lbs", lastVisit: "March 11, 2025" },
            { id: 8, name: "Carlos Martinez", age: 60, height: "5'8\"", weight: "165 lbs", lastVisit: "March 13, 2025" },
            { id: 9, name: "Diana Roberts", age: 35, height: "5'7\"", weight: "150 lbs", lastVisit: "March 17, 2025" },
            { id: 10, name: "Eric Lee", age: 29, height: "6'1\"", weight: "195 lbs", lastVisit: "March 18, 2025" },
            { id: 11, name: "Fatima Ali", age: 41, height: "5'5\"", weight: "145 lbs", lastVisit: "March 19, 2025" },
            { id: 12, name: "George Nguyen", age: 55, height: "5'9\"", weight: "160 lbs", lastVisit: "March 20, 2025" },
            { id: 13, name: "Hannah White", age: 26, height: "5'6\"", weight: "135 lbs", lastVisit: "March 21, 2025" },
            { id: 14, name: "Isaac Green", age: 36, height: "5'10\"", weight: "172 lbs", lastVisit: "March 22, 2025" },
            { id: 15, name: "Jessica Turner", age: 33, height: "5'4\"", weight: "138 lbs", lastVisit: "March 23, 2025" },
            { id: 16, name: "Kevin Wright", age: 48, height: "6'2\"", weight: "200 lbs", lastVisit: "March 24, 2025" },
            { id: 17, name: "Laura King", age: 39, height: "5'7\"", weight: "160 lbs", lastVisit: "March 25, 2025" },
            { id: 18, name: "Malik Scott", age: 27, height: "6'0\"", weight: "185 lbs", lastVisit: "March 26, 2025" },
            { id: 19, name: "Nina Patel", age: 42, height: "5'3\"", weight: "128 lbs", lastVisit: "March 27, 2025" },
            { id: 20, name: "Omar Wilson", age: 52, height: "5'11\"", weight: "178 lbs", lastVisit: "March 28, 2025" }
        ];

        const sortedPatients = patientData.sort((a, b) => a.name.localeCompare(b.name));
        setPatients(sortedPatients);
    }, []);

    const filteredPatients = patients.filter((patient) => {
        const matchesName = patient.name.toLowerCase().includes(searchQuery.toLowerCase());
        const withinMinAge = minAge === "" || patient.age >= parseInt(minAge);
        const withinMaxAge = maxAge === "" || patient.age <= parseInt(maxAge);
        return matchesName && withinMinAge && withinMaxAge;
    });

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

                {/* Filter Controls */}
                <div className="mb-4 flex flex-wrap gap-4">
                    <div>
                        <label className="text-sm text-gray-700">Min Age:</label>
                        <input
                            type="number"
                            className="ml-2 p-1 border rounded"
                            value={minAge}
                            onChange={(e) => setMinAge(e.target.value)}
                            placeholder="e.g. 30"
                        />
                    </div>
                    <div>
                        <label className="text-sm text-gray-700">Max Age:</label>
                        <input
                            type="number"
                            className="ml-2 p-1 border rounded"
                            value={maxAge}
                            onChange={(e) => setMaxAge(e.target.value)}
                            placeholder="e.g. 50"
                        />
                    </div>
                </div>

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