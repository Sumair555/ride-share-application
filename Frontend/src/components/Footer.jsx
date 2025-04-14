import React from 'react';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white mt-auto">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <p className="text-center text-skin-text-base-2 text-sm">
          © {currentYear} SRM Ride Share. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer; 
