import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [donations, setDonations] = useState([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [newDonation, setNewDonation] = useState({
    name: '',
    amount: '',
    category: 'One-time',
    date: new Date().toISOString().split('T')[0]
  })

  // Load sample data on component mount
  useEffect(() => {
    const sampleDonations = [
      { id: 1, name: 'John Doe', amount: 150, date: '2024-01-15', category: 'Monthly' },
      { id: 2, name: 'Jane Smith', amount: 75, date: '2024-01-14', category: 'One-time' },
      { id: 3, name: 'Mike Johnson', amount: 200, date: '2024-01-13', category: 'Monthly' },
      { id: 4, name: 'Sarah Wilson', amount: 50, date: '2024-01-12', category: 'One-time' },
    ]
    setDonations(sampleDonations)
  }, [])

  const totalDonations = donations.reduce((sum, donation) => sum + donation.amount, 0)
  const monthlyDonations = donations.filter(d => d.category === 'Monthly').reduce((sum, d) => sum + d.amount, 0)
  const oneTimeDonations = donations.filter(d => d.category === 'One-time').reduce((sum, d) => sum + d.amount, 0)

  const handleAddDonation = (e) => {
    e.preventDefault()
    if (!newDonation.name || !newDonation.amount) return

    const donation = {
      id: Date.now(),
      name: newDonation.name,
      amount: parseFloat(newDonation.amount),
      date: newDonation.date,
      category: newDonation.category
    }

    setDonations([donation, ...donations])
    setNewDonation({
      name: '',
      amount: '',
      category: 'One-time',
      date: new Date().toISOString().split('T')[0]
    })
    setShowAddForm(false)
  }

  const handleDeleteDonation = (id) => {
    setDonations(donations.filter(d => d.id !== id))
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewDonation(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header */}
      <header className={`border-b ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">Donation Tracker</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  darkMode 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                + Add Donation
              </button>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg transition-colors ${
                  darkMode 
                    ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400' 
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-600'
                }`}
              >
                {darkMode ? '☀️' : '🌙'}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Add Donation Form */}
      {showAddForm && (
        <div className={`border-b ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <form onSubmit={handleAddDonation} className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <input
                type="text"
                name="name"
                value={newDonation.name}
                onChange={handleInputChange}
                placeholder="Donor Name"
                className={`p-3 rounded-lg border ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
                required
              />
              <input
                type="number"
                name="amount"
                value={newDonation.amount}
                onChange={handleInputChange}
                placeholder="Amount ($)"
                min="0"
                step="0.01"
                className={`p-3 rounded-lg border ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
                required
              />
              <select
                name="category"
                value={newDonation.category}
                onChange={handleInputChange}
                className={`p-3 rounded-lg border ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              >
                <option value="One-time">One-time</option>
                <option value="Monthly">Monthly</option>
              </select>
              <input
                type="date"
                name="date"
                value={newDonation.date}
                onChange={handleInputChange}
                className={`p-3 rounded-lg border ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              />
              <div className="md:col-span-4 flex space-x-3">
                <button
                  type="submit"
                  className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                >
                  Save Donation
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className={`px-6 py-3 rounded-lg transition-colors ${
                    darkMode 
                      ? 'bg-gray-600 hover:bg-gray-500 text-white' 
                      : 'bg-gray-300 hover:bg-gray-400 text-gray-700'
                  }`}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className={`p-6 rounded-xl shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div className="ml-4">
                <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total Donations</p>
                <p className="text-2xl font-bold text-green-600">${totalDonations.toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div className={`p-6 rounded-xl shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Monthly Donations</p>
                <p className="text-2xl font-bold text-blue-600">${monthlyDonations.toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div className={`p-6 rounded-xl shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div className="ml-4">
                <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>One-time Donations</p>
                <p className="text-2xl font-bold text-purple-600">${oneTimeDonations.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Donations Card */}
        <div className={`rounded-xl shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold">Recent Donations ({donations.length})</h2>
          </div>
          <div className="p-6">
            {donations.length === 0 ? (
              <div className="text-center py-8">
                <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>No donations yet. Add your first donation!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {donations.map((donation) => (
                  <div key={donation.id} className={`flex items-center justify-between p-4 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'} transition-colors`}>
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        donation.category === 'Monthly' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'
                      }`}>
                        {donation.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium">{donation.name}</p>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {new Date(donation.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="font-bold text-green-600">${donation.amount.toFixed(2)}</p>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          donation.category === 'Monthly' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-purple-100 text-purple-800'
                        }`}>
                          {donation.category}
                        </span>
                      </div>
                      <button
                        onClick={() => handleDeleteDonation(donation.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          darkMode 
                            ? 'text-red-400 hover:bg-red-900' 
                            : 'text-red-600 hover:bg-red-100'
                        }`}
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions Card */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className={`p-6 rounded-xl shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button 
                onClick={() => setShowAddForm(!showAddForm)}
                className={`w-full p-3 rounded-lg text-left transition-colors ${
                  darkMode 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-blue-50 hover:bg-blue-100 text-blue-700'
                }`}
              >
                + Add New Donation
              </button>
              <button className={`w-full p-3 rounded-lg text-left transition-colors ${
                darkMode 
                  ? 'bg-green-600 hover:bg-green-700 text-white' 
                  : 'bg-green-50 hover:bg-green-100 text-green-700'
              }`}>
                📊 Generate Report
              </button>
              <button className={`w-full p-3 rounded-lg text-left transition-colors ${
                darkMode 
                  ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                  : 'bg-purple-50 hover:bg-purple-100 text-purple-700'
              }`}>
                ⚙️ Settings
              </button>
            </div>
          </div>

          <div className={`p-6 rounded-xl shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h3 className="text-lg font-semibold mb-4">Donation Goals</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Monthly Goal</span>
                  <span>${monthlyDonations.toFixed(2)}/$500</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${Math.min((monthlyDonations / 500) * 100, 100)}%` }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Annual Goal</span>
                  <span>${totalDonations.toFixed(2)}/$5000</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: `${Math.min((totalDonations / 5000) * 100, 100)}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App