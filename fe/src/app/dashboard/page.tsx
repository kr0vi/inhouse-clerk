export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-transparent p-6 pt-28 sm:p-10 sm:pt-28">
      <div className="max-w-7xl mx-auto">
        <div className="md:flex md:items-center md:justify-between mb-8">
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:truncate sm:text-3xl sm:tracking-tight">
              Welcome back, User
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Here is what is happening with your projects today.
            </p>
          </div>
          <div className="mt-4 flex md:ml-4 md:mt-0">
            <button
              type="button"
              className="inline-flex items-center rounded-md bg-white dark:bg-zinc-900 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
            >
              Export
            </button>
            <button
              type="button"
              className="ml-3 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors shadow-indigo-600/20 hover:shadow-indigo-600/40"
            >
              New Project
            </button>
          </div>
        </div>

        {/* Stats */}
        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3 mb-8">
          {[
            { name: "Total Revenue", stat: "$71,897", change: "12%" },
            { name: "Active Projects", stat: "43", change: "5%" },
            { name: "New Clients", stat: "24", change: "18%" },
          ].map((item) => (
            <div
              key={item.name}
              className="overflow-hidden rounded-xl bg-white dark:bg-zinc-900 px-4 py-5 shadow-sm border border-gray-100 dark:border-zinc-800 sm:p-6 transition-all hover:shadow-md"
            >
              <dt className="truncate text-sm font-medium text-gray-500 dark:text-gray-400">
                {item.name}
              </dt>
              <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
                {item.stat}
              </dd>
              <dd className="mt-2 text-sm text-green-600 font-medium">
                +{item.change} from last month
              </dd>
            </div>
          ))}
        </dl>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-zinc-900 shadow-sm border border-gray-100 dark:border-zinc-800 rounded-xl overflow-hidden">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-100 dark:border-zinc-800 flex justify-between items-center">
            <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
              Recent Activity
            </h3>
            <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
              View all
            </button>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-zinc-800">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="px-4 py-4 sm:px-6 hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400 truncate">
                    Invoice #{1000 + i} generated
                  </p>
                  <div className="ml-2 flex-shrink-0 flex">
                    <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      Completed
                    </p>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      Standard Plan Subscription
                    </p>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
                    <p>
                      Generated on <time dateTime="2026-04-05">April {5 - i}, 2026</time>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
