export default function StatsOverview({ donationCategories = [] }) {
    const totalDonations = donationCategories.reduce(
      (total, category) => total + category.count,
      0
    )
  
    const averageDonations =
      donationCategories.length > 0
        ? Math.round(totalDonations / donationCategories.length)
        : 0
  
    return (
      <div className="mb-8 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {totalDonations}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Total Donations
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">
              {donationCategories.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Categories
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
              {averageDonations}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Avg per Category
            </div>
          </div>
        </div>
      </div>
    )
  }
  