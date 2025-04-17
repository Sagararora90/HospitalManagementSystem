export default function Chat() {
  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Messages</h1>
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-4">
            {/* Chat list */}
            <div className="border-r dark:border-gray-700">
              <div className="p-4">
                <input
                  type="text"
                  placeholder="Search messages..."
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div className="divide-y dark:divide-gray-700">
                <div className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                  <h3 className="font-medium text-gray-900 dark:text-white">Alice Smith</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Thanks for the help!</p>
                </div>
                <div className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                  <h3 className="font-medium text-gray-900 dark:text-white">Bob Johnson</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">When can we meet?</p>
                </div>
              </div>
            </div>

            {/* Chat window */}
            <div className="col-span-3 flex flex-col h-[600px]">
              <div className="flex-1 p-4 overflow-y-auto">
                <div className="space-y-4">
                  <div className="flex justify-end">
                    <div className="bg-indigo-600 text-white rounded-lg px-4 py-2 max-w-md">
                      Hi, I saw your Python tutoring task!
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg px-4 py-2 max-w-md">
                      Hello! Yes, I'm available tomorrow at 3 PM.
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-t dark:border-gray-700 p-4">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    className="flex-1 px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}