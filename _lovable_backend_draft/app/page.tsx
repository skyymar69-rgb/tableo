import React from 'react';
import './LandingPage.css'; // Assuming you will have some styles

const LandingPage = () => {
    return (
        <div className="landing-page">
            <header className="hero">
                <h1>Unlock the Future of Dining with Tableo</h1>
                <p>Transform your restaurant operations and elevate your customer experience with our powerful SaaS platform designed for modern dining.</p>
                <div className="cta-buttons">
                    <button className="cta primary">Get Started</button>
                    <button className="cta secondary">Learn More</button>
                </div>
            </header>
        </div>
    );
};

export default LandingPage;