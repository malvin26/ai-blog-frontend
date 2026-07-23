import { useEffect, useState } from "react";
import AdSkeleton from "./AdSkeleton";

const AdBox = ({
  size = "banner",
  position = "inline",
  adSlotId = "",
  adClient = "ca-pub-1544169214358008",
  isAdEnabled = true, // 🔥 toggle for production
}) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!isAdEnabled) return;

    try {
      // push adsense load
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      setLoaded(true);
    } catch (err) {
      console.log("AdSense not ready yet");
    }
  }, [isAdEnabled]);

  return (
    <div className="w-full flex justify-center my-5">
      <div className="w-full max-w-5xl">

        {/* 🔥 BEFORE APPROVAL → Skeleton */}
        {!isAdEnabled && <AdSkeleton size={size} />}

        {/* 🔥 AFTER APPROVAL → REAL AD */}
        {isAdEnabled && (
          <div
            className={`
              w-full overflow-hidden rounded-xl border border-gray-200 bg-white
              ${size === "banner" ? "h-24 md:h-28" : ""}
              ${size === "square" ? "h-40 md:h-48" : ""}
              ${size === "large" ? "h-32 md:h-40" : ""}
            `}
          >
            <ins
              className="adsbygoogle"
              style={{ display: "block", width: "100%", height: "100%" }}
              data-ad-client={adClient}
              data-ad-slot={adSlotId}
              data-ad-format="auto"
              data-full-width-responsive="true"
            />
          </div>
        )}

        {/* label (dev only) */}
        {!isAdEnabled && (
          <p className="text-center text-xs text-gray-400 mt-1">
            Ad Placeholder ({position})
          </p>
        )}
      </div>
    </div>
  );
};

export default AdBox;