import React from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="w-full bg-gray-900 text-white py-4 mt-auto">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between">
        <h2 className="text-lg font-semibold">Copyright &copy; {currentYear}</h2>
        <div className="mt-2 sm:mt-0 text-sm text-gray-400">
          {/* Add additional footer links/info here if needed */}
          Powered by Capstone Project
        </div>
      </div>
    </footer>
  );
}

export default Footer