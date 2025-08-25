import React from 'react'

const NotFound = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-[70vh] w-full px-4 py-8 bg-gray-50">
      <h1 className="text-6xl font-extrabold text-blue-600 mb-4">404</h1>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Page Not Found</h2>
      <p className="text-gray-500 mb-6">Sorry, the page you are looking for does not exist.</p>
      <a href="/" className="inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors font-medium">Go Home</a>
    </main>
  );
}

export default NotFound