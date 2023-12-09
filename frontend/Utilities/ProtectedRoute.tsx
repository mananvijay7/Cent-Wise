import { Outlet, Navigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import axios from 'axios';


const ProtectedRoute: React.FC = (props) => {

    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        const checkAuth = async () => {
        try {
            const response = await axios.get('/api');
            setIsAuthenticated(response.data.isAuthenticated);
        } catch (error) {
            // Handle error, perhaps redirect to login page
            setIsAuthenticated(false);
        }
        };
        checkAuth();
    }, []);

    if (isAuthenticated === null) {
        return (
          <div>
            <h1>Loading...</h1>
          </div>
        );
      }

    if (!isAuthenticated) {
        <Navigate to="/api/user/signin" />
    }else{
        return (
            <Outlet {...props} />
        );
    }
}

export default ProtectedRoute;


