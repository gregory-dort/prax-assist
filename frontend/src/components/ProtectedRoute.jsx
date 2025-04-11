import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const ProtectedRoute = ({ children, role, user }) => {
    if (!user) return <Navigate to = "/" />;
    if (role && user.role !== role) return <Navigate to = "/dashboard" />;
    return children;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
    role: PropTypes.string,
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        role: PropTypes.string.isRequired
    }),
};

export default ProtectedRoute;