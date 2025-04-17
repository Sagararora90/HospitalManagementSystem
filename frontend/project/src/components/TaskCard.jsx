import { Clock, Tag, User } from 'lucide-react';

export default function TaskCard({ task }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{task.title}</h3>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          task.status === 'Open' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
          task.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
          'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
        }`}>
          {task.status}
        </span>
      </div>
      
      <p className="text-gray-600 dark:text-gray-300 mb-4">{task.description}</p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {task.skills.map((skill, index) => (
          <span 
            key={index}
            className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-md text-sm flex items-center"
          >
            <Tag className="w-4 h-4 mr-1" />
            {skill}
          </span>
        ))}
      </div>
      
      <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
        <div className="flex items-center">
          <User className="w-4 h-4 mr-1" />
          <span>{task.author}</span>
        </div>
      </div>
    </div>
  );
}