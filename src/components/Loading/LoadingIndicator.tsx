export default function LoadingIndicator({className} : {className: string}) {
  return (
    <div className={`flex items-center justify-center border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-500 dark:border-gray-400 ${className}`}>
      <div className="px-3 py-2 text-xl font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">
        loading...
      </div>
    </div>
  );
}
