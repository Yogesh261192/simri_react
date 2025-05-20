// components/ShimmerLoader.jsx
const ShimmerLoader = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-5 animate-pulse">
      <div className="container mx-auto px-4 py-6 mt-4 space-y-8">

        {/* Image Skeleton */}
        <div className="h-[400px] w-full bg-gray-200 rounded-lg shadow-md" />

        {/* Title + Price Skeleton */}
        <div className="space-y-3">
          <div className="h-8 bg-gray-200 rounded w-2/3" />
          <div className="h-6 bg-gray-200 rounded w-1/3" />
          <div className="h-6 bg-gray-200 rounded w-1/4" />
        </div>

        {/* Buttons Skeleton */}
        <div className="flex space-x-4 mt-6">
          <div className="h-12 w-32 bg-gray-200 rounded" />
          <div className="h-12 w-24 bg-gray-200 rounded" />
          <div className="h-12 w-24 bg-gray-200 rounded" />
        </div>

        {/* Sections Skeleton */}
        <div className="space-y-6">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="bg-white rounded-lg shadow-sm p-6 space-y-3">
              <div className="h-6 bg-gray-200 rounded w-1/2" />
              <div className="h-4 bg-gray-100 rounded w-full" />
              <div className="h-4 bg-gray-100 rounded w-3/4" />
              <div className="h-4 bg-gray-100 rounded w-2/4" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShimmerLoader;
