export default async function MasterTable({
  title,
  apiEndpoint,
  columns,
  link,
}) {
  const fetchData = async () => {
    try {
      const response = await fetch(apiEndpoint);
      const result = await response.json();

      if (!response.ok) throw new Error(`Error: ${response.status}`);

      return result;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  };

  const data = await fetchData();
  console.log("🚀 ~ data:", data);

  return (
    <div className="p-2 border rounded-md shadow-sm">
      <h3 className="text-center text-lg p-2">{title}</h3>
      <div className="relative overflow-x-auto">
        <table className="w-full mb-4 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {columns.map((col, index) => (
                <th key={index} scope="col" className="px-6 py-3">
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((item, index) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
                key={index}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {index + 1}
                </th>
                {columns.map((col, colIndex) => {
                  if (colIndex !== 0) {
                    return (
                      <td key={colIndex} className="px-6 py-4">
                        {col.render ? col.render(item) : item[col.key]}
                      </td>
                    );
                  }
                })}
              </tr>
            ))}
          </tbody>
        </table>
        {link && (
          <a href={link} className="ms-2 text-sm text-blue-500 hover:underline">
            See More
          </a>
        )}
      </div>
    </div>
  );
}
