"use client"

import { ReactNode } from "react";

type Header = {
  content: ReactNode; // Text, icon, or any JSX content
  align?: "left" | "center" | "right"; // Optional alignment
};

type TableProps<T> = {
  headers: Header[]; // Array of header names or JSX elements
  data: any; // Array of data items
  renderRow: (item: T, index: number) => ReactNode; // Custom render function for table rows
  className?: string; // Custom render function for table rows
};

const GenericTable = <T,>({
  headers,
  data,
  renderRow,
  className,
}: TableProps<T>) => {
  return (
    <div
      // style={{ maxHeight: "220px" }}
      className={`overflow-x-auto  overflow-y-scroll min-h-[20vh] max-h-[50vh] scrollbar-hidden ${className}`}
    >
      <table className="min-w-full table-auto tablingTable bg-white ">
        <thead className="text-left z-[0] sticky top-0 bg-[#E1E7EE] rounded-[10px] ">
          <tr className=" h-14 text-base  ">
            {headers?.map((header, index) => (
              <th
                key={index}
                className="py-5 px-6 border-b text-base font-semibold  text-nowrap"
              >
                {header?.content}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white ">
          {data?.map((item:any, index:number) => renderRow(item, index))}
        </tbody>
      </table>
    </div>
  );
};

export default GenericTable;
