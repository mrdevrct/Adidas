// import { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";

// export default function Pagination({ items, itemCount, pathname, currentPage, setPage }) {
//   const { page } = useParams();
//   const [pageCount, setPageCount] = useState(null);

//   useEffect(() => {
//     const pagesNumbers = Math.ceil(items.length / itemCount);
//     setPageCount(pagesNumbers);
//   }, [items, itemCount]);

//   return (
//     <div className="flex justify-center space-x-1 dark:text-gray-100">
//       {Array(pageCount)
//         .fill(0)
//         .map((_, index) => (
//             <button
//               type="button"
//               className={`inline-flex items-center justify-center w-8 h-8 text-sm border rounded shadow-md ${
//                 index + 1 === Number(currentPage) ? 'bg-green' : 'dark:bg-gray-900 dark:border-gray-800'
//               }`}
//               onClick={() => setPage(index + 1)}
//             >
//               {index + 1}
//             </button>
//         ))}
//     </div>
//   );
// }