import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import '../styles/index.css'

const Card = ({ title, description, image, link}) => {
    const navigate = useNavigate();

    return(
        <div className = "card"
             role = "button"
             tabIndex = "0"
             onClick = {() => navigate(link)}
             onKeyDown = {(e) => e.key === 'Enter' && navigate(link)}
        >
           {image && <img src = {image} alt = {title} className = "card-image" />}
           <div className = "card-content">
            <h2 className = "card-title">{title}</h2>
            <p className = "card-description">{description}</p>
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