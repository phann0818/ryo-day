"use client"

import Link from "next/link"
import { useYears } from "@/hooks/use-years"

export default function HomePage() {
  const { years, loading: yearsLoading } = useYears()

  return (
    <div className="min-h-screen w-full relative overflow-hidden flex flex-col" style={{ backgroundColor: "#259957" }}>
      {/* Header */}
      <header className="relative z-10 w-full flex-shrink-0 h-16 sm:h-20 md:h-24">
        <div
          className="relative h-full flex items-center px-2 sm:px-4 md:px-6 w-full"
          style={{
            backgroundImage: "url('/header.png')",
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <h1 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-black text-left tracking-wider pixel-font">
            letters to ryo
          </h1>
        </div>
      </header>

      <main className="relative z-10 flex-1 flex flex-col px-2 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-4">
        {/* Main Content Card */}
        <div className="relative flex-shrink-0 mx-auto w-full max-w-4xl lg:max-w-5xl xl:max-w-6xl mb-1 sm:mb-2">
          <div
            className="relative w-full shadow-lg border-2"
            style={{
              backgroundColor: "#f1e4a9",
              borderColor: "rgba(217, 119, 6, 0.4)",
              minHeight: "50vh",
              maxHeight: "65vh",
            }}
          >
            <div className="relative z-10 h-full flex flex-col justify-between p-3 sm:p-4 md:p-6 lg:p-8">
              {/* Title with Icons */}
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div className="flex items-center justify-center flex-shrink-0">
                  <img
                    src="/clover_icon_1.png"
                    alt="Clover icon"
                    className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 object-contain"
                    loading="eager"
                    style={{
                      imageRendering: "pixelated",
                      imageRendering: "-moz-crisp-edges",
                      imageRendering: "crisp-edges",
                    }}
                  />
                </div>
                <div className="flex-1 flex justify-center px-2 sm:px-4">
                  <div className="text-center">
                    <img
                      src="/logo_text.png"
                      alt="リョウへの手紙"
                      className="h-6 sm:h-8 md:h-10 lg:h-12 xl:h-16 object-contain max-w-full mx-auto"
                      loading="eager"
                      style={{
                        imageRendering: "pixelated",
                        imageRendering: "-moz-crisp-edges",
                        imageRendering: "crisp-edges",
                      }}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-center flex-shrink-0">
                  <img
                    src="/seal_icon_1.png"
                    alt="Seal icon"
                    className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 object-contain"
                    loading="eager"
                    style={{
                      imageRendering: "pixelated",
                      imageRendering: "-moz-crisp-edges",
                      imageRendering: "crisp-edges",
                    }}
                  />
                </div>
              </div>

              {/* Description Text */}
              <div className="text-black text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed mb-4 sm:mb-6 pixel-font text-center max-w-full mx-auto flex-1 flex flex-col justify-center">
                <p className="mb-2 sm:mb-4">
                  ベトナムのWishzenは、このウェブサイトを通じて、NCT
                  WISHのメンバーであるリョウに私たちはの願いを届けたいと思っています。
                  私たちはの願いを通じて、リョウがさらに強く、健康に成長し、NCT
                  WISHと共に素晴らしいアイドルになることを願っています。
                </p>
                <p className="text-green-800">
                  Vietnamese Wishzen would like to use this website to send our heartfelt wishes to Ryo, a member of NCT
                  WISH. Through our messages, we hope Ryo will grow stronger, healthier, and become an amazing idol
                  alongside NCT WISH.
                </p>
              </div>

              {/* Year Navigation - Fixed positioning */}
              <div className="w-full flex justify-center">
                {yearsLoading ? (
                  <div className="text-center">
                    <div className="inline-block animate-pulse bg-green-600 text-white px-3 sm:px-4 md:px-6 py-2 sm:py-3 border-2 sm:border-4 border-green-800">
                      <span className="pixel-font text-xs sm:text-sm">Loading years...</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 flex-wrap max-w-full">
                    <button className="text-gray-600 hover:text-gray-800 text-lg sm:text-xl md:text-2xl font-bold flex-shrink-0">
                      ‹
                    </button>
                    {years.map((year, index) => (
                      <Link key={year} href={`/wishes/${year}`}>
                        <div
                          className="relative inline-block flex-shrink-0"
                          style={{
                            backgroundImage: "url('/button.png')",
                            backgroundSize: "contain",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                            width: "70px",
                            height: "28px",
                          }}
                        >
                          <button
                            className="w-full h-full bg-transparent text-white font-bold pixel-font text-xs sm:text-sm flex items-center justify-center"
                            style={{ background: "transparent", border: "none" }}
                          >
                            {year}
                          </button>
                        </div>
                      </Link>
                    ))}
                    <button className="text-gray-600 hover:text-gray-800 text-lg sm:text-xl md:text-2xl font-bold flex-shrink-0">
                      ›
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Ryo's Moment Section */}
        <div className="flex-shrink-0 w-full max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto py-1 sm:py-2 mb-1 sm:mb-2">
          <div className="flex items-center justify-center gap-2 sm:gap-4 md:gap-6 h-full">
            <div className="flex items-center justify-center flex-shrink-0">
              <img
                src="/clover_icon_1.png"
                alt="Clover icon"
                className="w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:w-12 lg:w-16 lg:w-16 object-contain"
                style={{
                  imageRendering: "pixelated",
                  imageRendering: "-moz-crisp-edges",
                  imageRendering: "crisp-edges",
                }}
              />
            </div>
            <h3 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-yellow-200 pixel-font text-center tracking-wider">
              Ryo's moment
            </h3>
            <div className="flex items-center justify-center flex-shrink-0">
              <img
                src="/seal_icon_1.png"
                alt="Seal icon"
                className="w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:w-12 lg:w-16 lg:w-16 object-contain"
                style={{
                  imageRendering: "pixelated",
                  imageRendering: "-moz-crisp-edges",
                  imageRendering: "crisp-edges",
                }}
              />
            </div>
          </div>
        </div>

        {/* Image Carousel Frame - Responsive height */}
        <div className="w-full max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto flex-1 min-h-0 -mt-2 sm:-mt-4">
          <div
            className="relative w-full h-full shadow-2xl"
            style={{
              backgroundImage: "url('/img_carousel_frame.png')",
              backgroundSize: "100% 100%",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              minHeight: "150px",
              maxHeight: "35vh",
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center p-2 sm:p-4 md:p-6">
              <div className="text-green-800 text-xs sm:text-sm md:text-base lg:text-lg font-bold pixel-font text-center">
                Image gallery will be displayed here
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full flex-shrink-0 h-12 sm:h-16 md:h-20">
        <div
          className="relative h-full flex items-center justify-end px-2 sm:px-4 md:px-6 w-full"
          style={{
            backgroundImage: "url('/footer.png')",
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <p className="text-xs sm:text-sm md:text-base text-black pixel-font font-bold">from Vietnamese fans</p>
        </div>
      </footer>
    </div>
  )
}
