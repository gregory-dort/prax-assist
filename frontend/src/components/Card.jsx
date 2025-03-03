import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import '../styles/index.css'

const Card = ({ title, description, image, link}) => {
    const navigate = useNavigate();

    return(
        <div className = "card bg-sky-100 shadow-lg hover:shadow-xl transition-transform transform hover:scale-110 cursor-pointer"
             role = "button"
             tabIndex = "0"
             onClick = {() => navigate(link)}
             onKeyDown = {(e) => e.key === 'Enter' && navigate(link)}
        >
            {/* Image Section */}
            {image && (
                <figure>
                    <img src={image} alt={title} className="w-full h-full object-cover rounded-t-lg"/>
                </figure>
            )}

            {/* Card Content */}
           <div className = "card-body text-center p-6">
                <h2 className = "card-title w-full justify-center text-lg font-bold text-gray-800">{title}</h2>
                <p className = "text-gray-800">{description}</p>
           </div>
        </div>
    );
};

// Adding PropType Validation
Card.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string,
    link: PropTypes.string.isRequired
};

export default Card;