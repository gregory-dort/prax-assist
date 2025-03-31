import Navbar from "../components/Navbar";
import { useState } from "react";

const LabResults = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const results = [
        {
           id: 1,
           patientName: "John Doe",
           testName: "Glucose",
           result: "5.8 mmol/L",
           date: "2025-03-20",
        },
        {
            id: 2,
            patientName: "Jane Smith",
            testName: "HbA1C",
            result: "6.2%",
            referenceRange: "4.0 - 5.6%",
            date: "2025-03-28"
        },
        {
            id: 3,
            patientName: "Emily Davis",
            testName: "Creatinine",
            result: "82 µmol/L",
            referenceRange: "45 - 90 µmol/L",
            date: "2025-03-28"
        }
    ];

    const filteredResults = results.filter((entry) => 
        entry.patientName.toLowerCase().includes(searchQuery.toLowerCase())
    );       

    return(
        <div className="min-h-screen bg-gray-50 text-gray-800">
        <Navbar />
        <div className="max-w-5xl mx-auto p-6">
            <h1 className="text-2xl font-bold text-center mb-6">Lab Results</h1>

            <input
                type="text"
                placeholder="Enter patient name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full mb-4 p-2 border border-gray-300 rounded-md"
            />

            {filteredResults.length > 0 ? (
                <table className="w-full border-collapse border border-gray-300">
                    <thead className="bg-sky-100">
                        <tr>
                            <th className="border border-gray-300 p-2 text-left">Patient Name</th>
                            <th className="border border-gray-300 p-2 text-left">Test</th>
                            <th className="border border-gray-300 p-2 text-left">Result</th>
                            <th className="border border-gray-300 p-2 text-left">Reference Range</th>
                            <th className="border border-gray-300 p-2 text-left">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredResults.map((entry) => (
                            <tr key={entry.id} className="hover:bg-blue-100">
                                <td className="border border-gray-300 p-2">{entry.patientName}</td>
                                <td className="border border-gray-300 p-2">{entry.testName}</td>
                                <td className="border border-gray-300 p-2">{entry.result}</td>
                                <td className="border border-gray-300 p-2">{entry.referenceRange}</td>
                                <td className="border border-gray-300 p-2">{entry.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-center text-gray-600">No results found for that name.</p>
            )}
        </div>
    </div>
    );
};

export default LabResults;