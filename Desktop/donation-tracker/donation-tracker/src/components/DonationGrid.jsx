export default function DonationGrid({ donationCategories }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
      {donationCategories.map((category) => (
        <div
          key={category.id}
          className={`${category.color} rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border cursor-pointer transform hover:scale-105`}
        >
          <div className="p-6">
            {/* Icon */}
            <div className="text-4xl mb-4">{category.icon}</div>

            {/* Title */}
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {category.title}
            </h3>

            {/* Count */}
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {category.count} donations
            </p>

            {/* Progress */}
            <div className="mt-4">
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                <span>Progress</span>
                <span>{Math.round((category.count / 250) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                  style={{ width: `${Math.min((category.count / 250) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
