export default function DocumentList() {
  const messages = Array(12)
    .fill(1)
    .map((value, index) => ({
      id: index + 1,
      subject: "Velit placeat sit ducimus non sed",
      title: "Gloria Roberston ",
      time: "1d ago",
      datetime: "2021-01-27T16:35",
    }));

  return (
    <ul className="divide-y divide-gray-200 overflow-y-auto h-full">
      {messages.map((message) => (
        <li
          key={message.id}
          className="relative bg-white py-5 px-4 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 cursor-pointer"
        >
          <div className="flex justify-between space-x-3">
            <div className="min-w-0 flex-1">
              <span className="block focus:outline-none">
                <span className="absolute inset-0" aria-hidden="true" />
                <p className="text-sm font-medium text-gray-900 text-nobreak">
                  {message.title}
                </p>
                <p className="text-sm text-gray-500 truncate">
                  {message.subject}
                </p>
              </span>
            </div>
            <time
              dateTime={message.datetime}
              className="flex-shrink-0 whitespace-nowrap text-sm text-gray-500"
            >
              {message.time}
            </time>
          </div>
        </li>
      ))}
    </ul>
  );
}
