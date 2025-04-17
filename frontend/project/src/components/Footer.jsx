import { GraduationCap } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <GraduationCap className="h-8 w-8 text-indigo-600 dark:text-indigo-400 mr-2" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">MediSphere</span>
          </div>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
            <a href="/about" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              About
            </a>
            <a href="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              Privacy Policy
            </a>
            <a href="/terms" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              Terms of Service
            </a>
            <a href="/contact" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              Contact
            </a>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} MediSphere. All rights reserved.
        </div>
      </div>
    </footer>
  );
}