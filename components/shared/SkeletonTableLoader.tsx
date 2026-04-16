interface SkeletonTableLoaderProps {
  rows?: number;
  columns?: number;
}

const SkeletonTableLoader = ({ rows = 6, columns = 5 }: SkeletonTableLoaderProps) => {
  // Column widths cycle for variety
  const colWidths = ["w-32", "w-40", "w-24", "w-20", "w-28"];

  return (
    <div className="animate-pulse">
      {/* Header row */}
      <div className="flex items-center gap-6 px-5 py-3.5 bg-gray-50 border-b border-gray-100">
        {Array.from({ length: columns }).map((_, i) => (
          <div key={i} className={`h-3 rounded-full bg-gray-200 ${colWidths[i % colWidths.length]}`} />
        ))}
      </div>

      {/* Data rows */}
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-6 px-5 py-4 border-b border-gray-50 last:border-0"
        >
          {/* First column: avatar + text */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-9 h-9 rounded-full bg-gray-200 shrink-0" />
            <div className="flex flex-col gap-1.5">
              <div className={`h-3 rounded-full bg-gray-200 ${i % 3 === 0 ? "w-28" : i % 3 === 1 ? "w-24" : "w-32"}`} />
              <div className="h-2.5 w-16 rounded-full bg-gray-100" />
            </div>
          </div>

          {/* Remaining columns */}
          {Array.from({ length: columns - 1 }).map((_, j) => (
            <div
              key={j}
              className={`h-3 rounded-full bg-gray-200 shrink-0
                ${j === columns - 2
                  ? "w-16"
                  : (i + j) % 3 === 0
                    ? "w-36"
                    : (i + j) % 3 === 1
                      ? "w-28"
                      : "w-32"
                }`}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default SkeletonTableLoader;
