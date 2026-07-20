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
        <div className="absolute inset-0 flex items-center">
          <div className="px-4 sm:px-8 md:px-12 lg:px-16 max-w-xl">

            {/* Badge */}
            <span className="inline-block bg-red-600 text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-lg">
              Sponsored By
            </span>

            {/* Title */}
            <h2 className="mt-3 text-white font-extrabold leading-tight text-xl sm:text-3xl md:text-5xl lg:text-6xl drop-shadow-lg">
              Waqia Sobji Ghor
            </h2>

            {/* Description */}
            <p className="mt-3 text-white text-xs sm:text-sm md:text-lg leading-relaxed drop-shadow-md">
              Fresh Vegetables Daily
              <br />
              Farm To Home • 100% Fresh • Clean • Healthy
            </p>

            {/* Button */}
            <a
              href="https://www.youtube.com/@WaqiaSobjiGhor"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-red-600 px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm md:text-base font-semibold text-white shadow-lg transition-all duration-300 hover:bg-red-700 hover:scale-105"
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