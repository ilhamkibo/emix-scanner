"use client";
import React, { useEffect, useState } from "react";

export default function TableContainer({ title, api, link }) {
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch(`${api}`);
        const result = await response.json();
        console.log("🚀 ~ fetchData ~ result:", result);
        if (Array.isArray(result)) {
          setData(result);

          // Set headers dynamically from the keys of the first item
          if (result.length > 0) {
            setHeaders(Object.keys(result[0]));
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [api]);

  return (
    <div className="p-2 border rounded-md shadow-sm">
      <h3 className="text-center text-lg p-2">{title}</h3>

      <div className="relative overflow-x-auto">
        <table className="w-full mb-4 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {headers.map((header, index) => (
                <th scope="col" key={index} className="px-6 py-3">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((datum, index) => (
              <tr
                key={datum.id || index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
              >
                {headers.map((header, idx) => (
                  <td className="px-6 py-4" key={idx}>
                    <span>{datum[header]}</span>
                  </td>
                ))}
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
