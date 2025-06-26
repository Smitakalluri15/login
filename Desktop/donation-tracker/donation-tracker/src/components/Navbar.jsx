export default function Navbar({ darkMode, toggleDarkMode }) {
    return (
      <nav className="bg-white dark:bg-gray-800 shadow-lg border-b-2 border-blue-100 dark:border-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <span>🎁</span>
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Donation Tracker
              </span>
            </h1>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleDarkMode}
                className="p-3 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                {darkMode ? "☀️" : "🌙"}
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 text-white px-6 py-3 rounded-xl">
                ➕ Add
              </button>
            </div>
          </div>
        </div>
      </nav>
    );
  }
  