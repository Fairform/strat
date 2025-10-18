import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const stats = [
    { name: 'Total Properties', value: '0', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4', change: '+0%', changeType: 'neutral' },
    { name: 'Total Units', value: '0', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', change: '+0%', changeType: 'neutral' },
    { name: 'Occupied Units', value: '0', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z', change: '0%', changeType: 'neutral' },
    { name: 'Monthly Revenue', value: '$0', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', change: '+0%', changeType: 'neutral' },
  ]

  const recentActivity = [
    {
      type: 'info',
      title: 'Welcome to Atrio!',
      description: 'Get started by adding your first property.',
      time: 'Just now',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user?.user_metadata?.name?.split(' ')[0] || 'there'}!
        </h1>
        <p className="mt-2 text-gray-600">
          Here&apos;s what&apos;s happening with your portfolio today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 bg-[#C4733A]/10 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-[#C4733A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                </svg>
              </div>
              <span className={`text-sm font-medium ${
                stat.changeType === 'positive' ? 'text-green-600' :
                stat.changeType === 'negative' ? 'text-red-600' :
                'text-gray-500'
              }`}>
                {stat.change}
              </span>
            </div>
            <p className="mt-4 text-sm font-medium text-gray-600">{stat.name}</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    activity.type === 'success' ? 'bg-green-100' :
                    activity.type === 'warning' ? 'bg-yellow-100' :
                    activity.type === 'error' ? 'bg-red-100' :
                    'bg-blue-100'
                  }`}>
                    <svg className={`w-5 h-5 ${
                      activity.type === 'success' ? 'text-green-600' :
                      activity.type === 'warning' ? 'text-yellow-600' :
                      activity.type === 'error' ? 'text-red-600' :
                      'text-blue-600'
                    }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                    <p className="text-sm text-gray-500">{activity.description}</p>
                    <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
          </div>
          <div className="p-6 space-y-3">
            <Link
              href="/dashboard/properties?action=add"
              className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-[#C4733A] hover:bg-[#C4733A]/5 transition-all group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[#C4733A]/10 rounded-lg flex items-center justify-center group-hover:bg-[#C4733A]/20 transition-colors">
                  <svg className="w-5 h-5 text-[#C4733A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-900">Add Property</span>
              </div>
              <svg className="w-5 h-5 text-gray-400 group-hover:text-[#C4733A] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>

            <Link
              href="/dashboard/properties"
              className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-[#C4733A] hover:bg-[#C4733A]/5 transition-all group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[#C4733A]/10 rounded-lg flex items-center justify-center group-hover:bg-[#C4733A]/20 transition-colors">
                  <svg className="w-5 h-5 text-[#C4733A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-900">View Reports</span>
              </div>
              <svg className="w-5 h-5 text-gray-400 group-hover:text-[#C4733A] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>

            <Link
              href="/dashboard/settings"
              className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-[#C4733A] hover:bg-[#C4733A]/5 transition-all group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[#C4733A]/10 rounded-lg flex items-center justify-center group-hover:bg-[#C4733A]/20 transition-colors">
                  <svg className="w-5 h-5 text-[#C4733A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-900">Manage Settings</span>
              </div>
              <svg className="w-5 h-5 text-gray-400 group-hover:text-[#C4733A] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Getting Started */}
      <div className="bg-gradient-to-br from-[#C4733A] to-[#A05D2E] rounded-xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-4">Getting Started with Atrio</h2>
        <p className="text-white/90 mb-6">
          Follow these steps to make the most of your build-to-rent management platform.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mb-3">
              <span className="text-lg font-bold">1</span>
            </div>
            <h3 className="font-semibold mb-2">Add Your Properties</h3>
            <p className="text-sm text-white/80">
              Start by adding your build-to-rent properties and units to the platform.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mb-3">
              <span className="text-lg font-bold">2</span>
            </div>
            <h3 className="font-semibold mb-2">Track Occupancy</h3>
            <p className="text-sm text-white/80">
              Monitor unit occupancy, leases, and tenant information in real-time.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mb-3">
              <span className="text-lg font-bold">3</span>
            </div>
            <h3 className="font-semibold mb-2">Analyze Performance</h3>
            <p className="text-sm text-white/80">
              View detailed analytics and reports on your portfolio performance.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
