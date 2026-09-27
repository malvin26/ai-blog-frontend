const AdSkeleton = ({ size = "banner" }) => {
  return (
    <div className="w-full flex justify-center my-4">
      <div
        className="
          w-full
          max-w-5xl
          aspect-video
          bg-gray-200
          animate-pulse
          rounded-xl
        "
      />
    </div>
  );
};

export default AdSkeleton;