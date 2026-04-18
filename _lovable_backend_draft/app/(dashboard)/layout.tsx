import React from 'react';
import { useAuth } from '../hooks/useAuth'; // Adjust the import based on your auth context path
import Sidebar from '../components/Sidebar'; // Adjust the import based on your component path
import Header from '../components/Header'; // Adjust the import based on your component path

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user } = useAuth();

    if (!user) {
        // Redirect to login page or show an error
        return <div>Please log in to access this page.</div>;
    }

    return (
        <div className="layout">
            <Header />
            <div className="content">
                <Sidebar />
                <main>{children}</main>
            </div>
        </div>
    );
};

export default Layout;