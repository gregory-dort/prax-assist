import { useState } from "react";
import Navbar from "../components/Navbar";

const LabOrderForm = () => {
    const [formData, setFormData] = useState({
        patientName: "",
        dateOfBirth: "",
        ohipNumber: "",
        clinicianName: "",
        tests: {
            glucose: false,
            hba1c: false,
            creatinine: false,
            urinalysis: false,
        },
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === "checkbox") {
            setFormData((prev) => ({
                ...prev,
                tests: {
                    ...prev.tests,
                    [name]: checked,
                },
            }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800">
            <Navbar />
            <div className="max-w-4xl mx-auto p-6">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    PraxAssist Lab Requisition Form
                </h1>

                <form onSubmit={handleSubmit} className="bg-white border border-gray-300 p-6 rounded-md shadow-md text-gray-800">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-black">Patient Name</label>
                            <input
                                type="text"
                                name="patientName"
                                value={formData.patientName}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-gray-800"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-black">Date of Birth</label>
                            <input
                                type="date"
                                name="dateOfBirth"
                                value={formData.dateOfBirth}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-gray-800"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-black">OHIP Number</label>
                            <input
                                type="text"
                                name="ohipNumber"
                                value={formData.ohipNumber}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-gray-800"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-black">Clinician Name</label>
                            <input
                                type="text"
                                name="clinicianName"
                                value={formData.clinicianName}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-gray-800"
                            />
                        </div>
                    </div>

                    <fieldset className="border border-gray-300 p-4 rounded-md mb-4">
                        <legend className="text-sm font-semibold text-black">Select Tests</legend>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                            <label className="flex items-center text-black">
                                <input
                                    type="checkbox"
                                    name="glucose"
                                    checked={formData.tests.glucose}
                                    onChange={handleChange}
                                    className="mr-2"
                                />
                                Glucose
                            </label>
                            <label className="flex items-center text-gray-800">
                                <input
                                    type="checkbox"
                                    name="hba1c"
                                    checked={formData.tests.hba1c}
                                    onChange={handleChange}
                                    className="mr-2"
                                />
                                HbA1C
                            </label>
                            <label className="flex items-center text-gray-800">
                                <input
                                    type="checkbox"
                                    name="creatinine"
                                    checked={formData.tests.creatinine}
                                    onChange={handleChange}
                                    className="mr-2"
                                />
                                Creatinine
                            </label>
                            <label className="flex items-center text-gray-800">
                                <input
                                    type="checkbox"
                                    name="urinalysis"
                                    checked={formData.tests.urinalysis}
                                    onChange={handleChange}
                                    className="mr-2"
                                />
                                Urinalysis
                            </label>
                        </div>
                    </fieldset>

                    <button
                        type="submit"
                        className="bg-sky-100 text-gray-800 px-4 py-2 rounded hover:bg-blue-400"
                    >
                        Submit Lab Order
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LabOrderForm;