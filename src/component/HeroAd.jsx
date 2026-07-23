const HeroAd = () => {
  return (
    <section className="mb-8">
      <div className="relative overflow-hidden rounded-2xl">

        {/* Banner Image */}
        <img
          src="/image/hero-banner.jpg"
          alt="Waqia Sobji Ghor"
          className="w-full h-[180px] sm:h-[250px] md:h-[350px] lg:h-[450px] object-cover"
        />

        {/* Light Overlay */}
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-between py-4 sm:py-6 md:py-8 lg:py-10">

          {/* Badge - top */}
          <div className="px-4 sm:px-8 md:px-12 lg:px-16">
            <span className="inline-block bg-red-600 text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-lg">
              Sponsored By
            </span>
          </div>

          {/* Button - bottom */}
          <div className="px-4 sm:px-8 md:px-12 lg:px-16">
            <a
              href="https://www.youtube.com/@WaqiaSobjiGhor"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 w-fit rounded-full bg-red-600 px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm md:text-base font-semibold text-white shadow-lg transition-all duration-300 hover:bg-red-700 hover:scale-105"
            >
              ▶ Visit YouTube Channel
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroAd;