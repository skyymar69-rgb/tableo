import React from 'react';
import { MenuUpload, MenuPreview, QRGenerator } from './components';

const Onboarding = () => {
    return (
        <div>
            <h1>S6.1 Onboarding Page</h1>
            <MenuUpload />
            <MenuPreview />
            <QRGenerator />
        </div>
    );
};

export default Onboarding;