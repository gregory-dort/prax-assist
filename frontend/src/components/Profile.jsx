import { useState } from 'react';

const Profile = () => {
    const [name, setName] = useState("John Doe");
    //const [email, setEmail] = useState("johndoe@example.com");
    const [profilePic, setProfilePic] = useState("");

    // Profile Picture Upload
    const handlePicChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfilePic(URL.createObjectURL(file));
        }
    };

    return (
        <div>
            {/* Button to open Modal */}
            <button
            className = "btn bg-sky-100 text-gray-800"
            onClick = {() => document.getElementById("profile-modal").showModal()}
            >
                Edit Profile
            </button>

            {/* Modal */}
            <dialog id = "profile-modal" className = "modal">
                <div className = "modal-box">
                    {/* Modal Header with Close Button */}
                    <div className = "flex justify-between items-center mb-4">
                        <h3 className = "font-bold text-lg">Edit Profile</h3>
                        <button className = "btn btn-circle" onClick = {() => document.getElementById("profile-modal").close()}>
                            X
                        </button>
                    </div>

                    {/* Profile Picture Upload */}
                    <div className = "flex flex-col items-center mb-4">
                        {profilePic ? (
                            <img src = {profilePic} alt = "Profile" className = "w-24 h-24 rounded-full border"/>
                        ) : (
                            <div className = "w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
                                <span className = "text-gray-800">No Image</span>
                            </div>
                        )}
                        <input type = "file" accept = "image/*" className = "mt-2 file-input file-input-bordered w-full max-w-xs" onChange = {handlePicChange}/>
                    </div>

                    {/* Name Input */}
                    <div className = "form-control mb-4">
                        <label className = "label">Name</label>
                        <input type = "text" className = "input input-bordered" value = {name} onChange = {(e) => setName(e.target.value)}/>
                    </div>

                    {/* Modal Actions */}
                    <div className = "modal-action">
                        <button className = "btn bg-white text-gray-800" onClick = {() => document.getElementById("profile-modal").close()}>
                            Close
                        </button>
                        <button className = "btn bg-green-400 text-white" onClick = {() => alert("Changes Saved!")}>
                            Save Changes
                        </button>
                    </div>

                </div>
            </dialog>
        </div>
    );
};

export default Profile;