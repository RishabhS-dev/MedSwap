export function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-card p-5 animate-pulse">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="h-5 bg-gray-200 rounded-full w-3/5 mb-2" />
          <div className="h-3.5 bg-gray-100 rounded-full w-2/5" />
        </div>
        <div className="h-7 w-16 bg-gray-100 rounded-full ml-2" />
      </div>
      <div className="flex gap-2 mb-3">
        <div className="h-6 w-24 bg-gray-100 rounded-full" />
        <div className="h-6 w-20 bg-gray-100 rounded-full" />
      </div>
      <div className="h-3.5 bg-gray-100 rounded-full w-2/5 mb-4" />
      <div className="h-4 bg-gray-100 rounded-full w-1/3" />
    </div>
  );
}

export function SkeletonLine({ width = 'w-full', height = 'h-4' }) {
  return <div className={`${height} ${width} bg-gray-200 rounded-full animate-pulse`} />;
}

export function SkeletonBlock({ className = '' }) {
  return <div className={`bg-gray-200 rounded-xl animate-pulse ${className}`} />;
}