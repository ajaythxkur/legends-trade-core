'use client'

import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "./ui/button";

interface PaginationProps {
  offset: number;
  setOffset: Dispatch<SetStateAction<number>>
  total: number;
  loading: boolean
}
export default function Pagination({ offset, setOffset, total, loading }: PaginationProps) {
  return (
    <>
      {
        total !== offset + 1 &&
        <div className="mt-4 text-center">
          <Button onClick={() => setOffset(offset + 1)} disabled={loading}>{loading ? 'fetching..' : 'View more'}</Button>
        </div>
      }
    </>
  )
}



// import React from "react";

// interface PaginationProps {
//   total: number;
//   limit: number;
//   offset: number;
//   onPageChange: (newOffset: number) => void;
// }

// const Pagination: React.FC<PaginationProps> = ({ total, limit, offset, onPageChange }) => {
//   const currentPage = Math.floor(offset / limit) + 1;
//   const totalPages = Math.ceil(total / limit);

//   const handlePrev = () => {
//     if (currentPage > 1) {
//       onPageChange((currentPage - 2) * limit);
//     }
//   };

//   const handleNext = () => {
//     if (currentPage < totalPages) {
//       onPageChange(currentPage * limit);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center gap-4 mt-6">
//       <button
//         onClick={handlePrev}
//         disabled={currentPage === 1}
//         className="px-3 py-1 rounded-md border border-gray-300 disabled:opacity-50"
//       >
//         Prev
//       </button>

//       <span className="text-sm">
//         {currentPage} of {totalPages}
//       </span>

//       <button
//         onClick={handleNext}
//         disabled={currentPage === totalPages}
//         className="px-3 py-1 rounded-md border border-gray-300 disabled:opacity-50"
//       >
//         Next
//       </button>
//     </div>
//   );
// };

// export default Pagination;
