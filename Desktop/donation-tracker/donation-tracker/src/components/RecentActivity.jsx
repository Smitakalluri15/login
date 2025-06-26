export default function RecentActivity({ activities = [] }) {
    return (
      <div className="mt-12">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Recent Activity</h3>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6">
            <div className="space-y-4">
              {activities.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-900 dark:text-white">
                      <span className="font-medium">{activity.count}</span> {activity.type.toLowerCase()} donations{" "}
                      {activity.action}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
  