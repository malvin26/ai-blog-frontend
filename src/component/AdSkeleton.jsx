const AdSkeleton = ({ size = "banner" }) => {
  return (
    <div className="w-full flex justify-center my-4">
      <div
        className={`
          w-full max-w-5xl bg-gray-200 animate-pulse rounded-xl
          ${size === "banner" ? "h-24 md:h-28" : ""}
          ${size === "square" ? "h-40 md:h-48" : ""}
          ${size === "large" ? "h-32 md:h-40" : ""}
        `}
      />
    </div>
  );
};

export default AdSkeleton;