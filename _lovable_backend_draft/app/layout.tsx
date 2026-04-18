import React from 'react';

// Metadata for the application
export const metadata = {
  title: 'Your App Title',
  description: 'A brief description of your app',
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <head>
        {/* Add any specific meta tags or links here */}
      </head>
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;