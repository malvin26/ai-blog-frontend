const AdSlot = ({ size = "banner", position = "inline" }) => {
  return (
    <div className="w-full flex justify-center my-4">

      {/* Responsive container */}
      <div
        className={`
          w-full
          max-w-5xl
          rounded-xl
          border border-dashed border-gray-300
          bg-gray-50
          flex items-center justify-center
          text-gray-400 text-sm
          overflow-hidden
          ${size === "banner" ? "h-24 md:h-28" : ""}
          ${size === "square" ? "h-40 md:h-48" : ""}
          ${size === "large" ? "h-32 md:h-40" : ""}
        `}
      >
        Ad Space ({position})
      </div>
    </div>
  );
};

export default AdSlot;