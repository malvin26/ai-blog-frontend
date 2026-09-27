const AdSkeleton = ({ size = "banner" }) => {
  return (
    <div className="w-full flex justify-center my-4">
      <div
        className="
          w-full
          aspect-video
          max-w-5xl
          lg:w-[395px]
          lg:h-[221px]
          lg:aspect-auto
          bg-gray-200
          animate-pulse
          rounded-xl
        "
      />
    </div>
  );
};

export default AdSkeleton;