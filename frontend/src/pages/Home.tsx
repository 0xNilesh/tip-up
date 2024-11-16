import React from 'react'

function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-500 to-indigo-700 text-white">
      <h1 className="text-5xl font-bold mb-4">Welcome to My App</h1>
      <p className="text-xl mb-8">
        Explore amazing features with a beautiful UI
      </p>
      <a
        href="/app/demo/username/johndoe"
        className="bg-white text-indigo-600 px-6 py-3 rounded-full shadow hover:bg-gray-200 transition"
      >
        Get Started
      </a>
    </div>
  )
}

export default Home
