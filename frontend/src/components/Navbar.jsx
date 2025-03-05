import { Link } from 'react-router-dom';
import Logout from './Logout';
import Profile from './Profile';
import Logo from '../assets/praxassist-logo.jpg';
import DefaultAvatar from '../assets/default-avatar.jpg';

const Navbar = () => {
    return (
        <div className = "navbar bg-blue-500 shadow-md px-6 items-center justify-center sticky top-0 left-0 w-full z-50">
            {/* Logo and Text */}
            <div className = "flex-none flex items-center space-x-2">
                <Link to = "/dashboard" className = "text-xl font-bold text-white flex items-center">
                    <img src = {Logo} alt = "PraxAssist Logo" className = "h-12 w-auto"/>
                    <span className = "ml-2">PraxAssist</span>
                </Link>
            </div>
            {/* Navbar Text */}
            <div className = "flex-1 text-center">
                <span className = "text-white text-3xl font-bold p-4">Providing A Best Effort For Our Patients! </span>
            </div>

            {/* Desktop Navigation */}
            <div className = "hidden md:flex gap-4">
                <div className = "dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-circle avatar">
                            <div className="w-12 rounded-full">
                                <img src={DefaultAvatar} alt="User Avatar" />
                            </div>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-8 z-10 p-2 shadow bg-sky-100 rounded-box w-52">
                        <li><Profile /></li>
                        <li><Link to = "/settings" className = "text-gray-800">Settings</Link></li>
                        <li><Logout /></li>
                    </ul>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className = "dropdown md:hidden">
                <label tabIndex={0} className = "btn btn-square btn-ghost">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block w-6 h-6 stroke-current"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                </label>
                <ul tabIndex = {0} className = "menu menu-sm dropdown-content mt-8 z-10 p-2 shadow bg-sky-100 rounded-box w-52">
                    <li><Profile /></li>
                    <li><Link to = "/settings" className = "text-gray-800">Settings</Link></li>
                    <li><Logout /></li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;