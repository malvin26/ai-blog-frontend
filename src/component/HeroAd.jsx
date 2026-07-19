const HeroAd = () => {
  return (
    <section className="mb-8">
      <div className="relative overflow-hidden rounded-2xl shadow-xl">

        {/* Banner */}
        <img
          src="/image/hero-banner.jpg"
          alt="Waqia Sobji Ghor"
          className="
            w-full
            h-auto
            block
            select-none
            transition-transform
            duration-700
            hover:scale-105
          "
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/15 to-black/10"></div>

        {/* Content */}
        <div
          className="
            absolute
            inset-0
            flex
            items-center
            px-3
            sm:px-6
            md:px-10
            lg:px-14
          "
        >
          {/* Glass Card */}
          <div
            className="
              max-w-[90%]
              sm:max-w-md
              md:max-w-lg
              rounded-2xl
              bg-black/10
              backdrop-blur-[4px]
              border
              border-white/15
              p-3
              sm:p-5
              md:p-7
              shadow-xl
            "
          >
            <span
              className="
                inline-block
                rounded-full
                bg-red-600/90
                px-3
                py-1
                text-[10px]
                sm:text-xs
                font-semibold
                uppercase
                tracking-wider
                text-white
              "
            >
              Sponsored By
            </span>

            <h2
              className="
                mt-3
                text-white
                font-extrabold
                leading-tight
                drop-shadow-2xl
                text-lg
                sm:text-2xl
                md:text-4xl
                lg:text-5xl
              "
            >
              Waqia Sobji Ghor
            </h2>

            <p
              className="
                mt-2
                text-white/95
                leading-relaxed
                drop-shadow-lg
                text-xs
                sm:text-sm
                md:text-base
              "
            >
              Fresh Vegetables Daily <br />
              Farm To Home • 100% Fresh • Clean • Healthy
            </p>

            <a
              href="https://www.youtube.com/@WaqiaSobjiGhor"
              target="_blank"
              rel="noopener noreferrer"
              className="
                mt-5
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-red-600
                px-4
                py-2
                sm:px-6
                sm:py-3
                text-xs
                sm:text-sm
                md:text-base
                font-bold
                text-white
                shadow-lg
                transition-all
                duration-300
                hover:bg-red-700
                hover:scale-105
              "
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