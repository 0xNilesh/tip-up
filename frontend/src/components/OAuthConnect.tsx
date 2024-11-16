// components/OAuthConnect.tsx
import { useAuth0 } from '@auth0/auth0-react'

const OAuthConnect: React.FC = () => {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0()

  return (
    <div className="flex items-center space-x-4">
      {!isAuthenticated ? (
        <button
          className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-200"
          onClick={() => loginWithRedirect()}
        >
          Login
        </button>
      ) : (
        <div className="flex items-center space-x-3">
          {user && (
            <>
              <img
                src={user.picture}
                alt="Profile"
                className="w-10 h-10 rounded-full shadow-md"
              />
              <span className="font-medium">{user.name}</span>
            </>
          )}
          <button
            className="px-6 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition-colors duration-200"
            onClick={() => logout()}
          >
            Log out
          </button>
        </div>
      )}
    </div>
  )
}

export default OAuthConnect
