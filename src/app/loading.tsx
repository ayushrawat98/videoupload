export default function Loading() {
  return (
    <>
      <div className="grid grid-cols-1 gap-6 px-4 py-6 max-w-[600px] mx-auto">
        <article className="p-4  shadow-lg rounded-md animate-pulse">
          <div className="w-full h-48 bg-gray-700 rounded-sm mb-3" />

          <div className="h-5 bg-gray-700 rounded w-3/4 mb-2" />
          <div className="h-4 bg-gray-700 rounded w-full" />
        </article>
        <article className="p-4  shadow-lg rounded-md animate-pulse">
          <div className="w-full h-48 bg-gray-700 rounded-sm mb-3" />

          <div className="h-5 bg-gray-700 rounded w-3/4 mb-2" />
          <div className="h-4 bg-gray-700 rounded w-full" />
        </article>
        <article className="p-4  shadow-lg rounded-md animate-pulse">
          <div className="w-full h-48 bg-gray-700 rounded-sm mb-3" />

          <div className="h-5 bg-gray-700 rounded w-3/4 mb-2" />
          <div className="h-4 bg-gray-700 rounded w-full" />
        </article>
      </div>
    </>
  );
}
