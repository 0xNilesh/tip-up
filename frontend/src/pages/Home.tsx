import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br p-5 from-purple-500 to-pink-600 text-white dark:from-gray-800 dark:to-black">
      <h1 className="text-5xl font-bold mb-6 text-center text-white dark:text-gray-200">
        Tip Your Favorite Creator
      </h1>
      <p className="text-lg text-center max-w-2xl mb-10 text-white/90 dark:text-gray-400">
        Empower creators by sending crypto tips to your favorite social media
        stars. No wallet? No problem! Creators can claim their tips once they
        set up their crypto wallet.
      </p>

      <Link
        to="/login"
        className="bg-white text-pink-600 px-8 py-3 rounded-full shadow-lg hover:bg-gray-200 transition dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
      >
        Start Tipping Now
      </Link>

      <div className="mt-12">
        <h2 className="text-3xl font-semibold mb-4 text-white dark:text-gray-200">
          How it Works
        </h2>
        <ul className="text-center space-y-4">
          <li className="text-white/90 dark:text-gray-400">
            💸 <strong>Send tips</strong> to any social media user, even if they
            don't have a wallet yet.
          </li>
          <li className="text-white/90 dark:text-gray-400">
            🎁 <strong>Creators claim</strong> their funds once they set up a
            wallet.
          </li>
          <li className="text-white/90 dark:text-gray-400">
            🚀 <strong>Easy and secure</strong> way to show your support with
            cryptocurrency.
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Home;
