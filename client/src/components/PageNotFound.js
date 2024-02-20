import React from 'react'

export const PageNotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">404 - Not Found</h1>
        <p className="text-gray-600">Oops!😔 The page you're looking for doesn't exist.</p>
        {/* <img
          src="https://example.com/your-image-url.jpg"
          alt="404 Illustration"
          className="mt-8 max-w-full h-auto"
        /> */}
      </div>
    </div>
  )
}
