import { useParams } from 'react-router-dom'

function AppDetails() {
  const { app, username } = useParams()

  return (
    <div className="flex flex-col items-center justify-center h-screen text-gray-800 dark:text-white">
      <h1 className="text-4xl font-bold">App: {app}</h1>
      <p className="text-2xl mt-4">Hello, {username}!</p>
      <a
        href="/"
        className="mt-8 px-6 py-3 bg-indigo-500 text-white rounded-lg shadow hover:bg-indigo-400 transition"
      >
        Back to Home
      </a>
    </div>
  )
}

export default AppDetails
