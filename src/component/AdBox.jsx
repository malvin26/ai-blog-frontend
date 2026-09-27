import { useEffect, useState } from "react";
import AdSkeleton from "./AdSkeleton";

const AdBox = ({
  size = "banner",
  position = "inline",
  adSlotId = "",
  adClient = "ca-pub-1544169214358008",
  isAdEnabled = true,
}) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!isAdEnabled) return;

    const loadAd = () => {
      try {
        if (window.adsbygoogle) {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          setLoaded(true);
        }
      } catch (err) {
        console.log("AdSense not ready yet:", err);
      }
    };

    const timer = setTimeout(loadAd, 300);

    return () => clearTimeout(timer);
  }, [isAdEnabled, adSlotId]);

  return (
    <div className="w-full flex justify-center my-5 px-0">
      <div className="w-full max-w-5xl">

        {/* =========================================
            BEFORE ADSENSE APPROVAL
        ========================================== */}
        {!isAdEnabled && (
          <>
            <AdSkeleton size={size} />

            <p className="text-center text-xs text-gray-400 mt-1">
              Ad Placeholder ({position})
            </p>
          </>
        )}

        {/* =========================================
            FIXED 16:9 ADSENSE CONTAINER
        ========================================== */}
        {isAdEnabled && (
          <div
            className="
              relative
              w-full
              aspect-[16/9]
              overflow-hidden
              rounded-xl
              border
              border-gray-200
              bg-white
            "
          >
            <ins
              className="adsbygoogle"
              style={{
                display: "block",
                width: "100%",
                height: "100%",
              }}
              data-ad-client={adClient}
              data-ad-slot={adSlotId}
              data-ad-format="auto"
              data-full-width-responsive="true"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdBox;