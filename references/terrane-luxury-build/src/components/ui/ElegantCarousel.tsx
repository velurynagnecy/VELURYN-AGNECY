import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'

interface SlideData {
  title: string
  subtitle: string
  description: string
  slug: string
  imageUrl: string
  alt: string
}

const SLIDES: SlideData[] = [
  {
    title: 'Cantilever Crest',
    subtitle: 'Trousdale Estates · $2.4M',
    description:
      'A 1974 hillside residence stripped to its steel frame and rebuilt around a 68-foot cantilevered zero-edge pool.',
    slug: 'cantilever-crest-residence',
    imageUrl: '/images/lalu-pool.jpg',
    alt: 'Cantilever Crest minimalist infinity pool at twilight',
  },
  {
    title: 'Canyon Horizon',
    subtitle: 'Emerald Bay · $640K',
    description:
      'Three-sided knife-edge basin engineered to sit flush with the Pacific horizon, paired with a sunken basalt fire lounge.',
    slug: 'canyon-horizon-terrace',
    imageUrl: '/images/dining-terrace.jpg',
    alt: 'Canyon Horizon indoor-outdoor dining terrace',
  },
  {
    title: 'Monolith Kitchen',
    subtitle: 'St. Helena · $410K',
    description:
      'Two bearing walls replaced with a concealed steel beam to unite the culinary wing around a 14-foot Taj Mahal quartzite slab.',
    slug: 'monolith-kitchen-scullery',
    imageUrl: '/images/kitchen-remodel.jpg',
    alt: 'Monolith Kitchen Taj Mahal quartzite waterfall island',
  },
  {
    title: 'Westlake Pavilion',
    subtitle: 'Westlake Hills · $890K',
    description:
      'Structural steel and glass living expansion erasing the threshold between the great room and the hillside pool deck.',
    slug: 'westlake-glass-pavilion',
    imageUrl: '/images/glass-living.jpg',
    alt: 'Westlake Glass Pavilion living room',
  },
]

export function ElegantCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  const SLIDE_DURATION = 5500

  const goToSlide = useCallback(
    (index: number) => {
      if (isTransitioning || index === currentIndex) return
      setIsTransitioning(true)
      setProgress(0)
      setTimeout(() => {
        setCurrentIndex(index)
        setTimeout(() => setIsTransitioning(false), 60)
      }, 260)
    },
    [isTransitioning, currentIndex],
  )

  const goNext = useCallback(() => {
    goToSlide((currentIndex + 1) % SLIDES.length)
  }, [currentIndex, goToSlide])

  const goPrev = useCallback(() => {
    goToSlide((currentIndex - 1 + SLIDES.length) % SLIDES.length)
  }, [currentIndex, goToSlide])

  useEffect(() => {
    if (isPaused) return
    const pId = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + 100 / (SLIDE_DURATION / 50)))
    }, 50)
    const sId = setInterval(goNext, SLIDE_DURATION)
    return () => {
      clearInterval(pId)
      clearInterval(sId)
    }
  }, [currentIndex, isPaused, goNext])

  const currentSlide = SLIDES[currentIndex]

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={(e) => {
        touchStartX.current = e.targetTouches[0].clientX
      }}
      onTouchMove={(e) => {
        touchEndX.current = e.targetTouches[0].clientX
      }}
      onTouchEnd={() => {
        const diff = touchStartX.current - touchEndX.current
        if (Math.abs(diff) > 50) {
          if (diff > 0) goNext()
          else goPrev()
        }
      }}
      className="relative overflow-hidden rounded-[22px] border border-[#0A1112]/10 bg-[#E9ECEA] p-6 sm:p-10 lg:p-12"
    >
      <div className="grid items-center gap-10 lg:grid-cols-12">
        {/* Left: Editorial Content */}
        <div
          className={`transition-opacity duration-300 lg:col-span-5 ${
            isTransitioning ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <div className="text-[13px] tracking-[0.18em] text-[#1B5E63] uppercase">
            {String(currentIndex + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')} ·{' '}
            {currentSlide.subtitle}
          </div>

          <h3 className="mt-4 font-serif text-4xl leading-[1.06] font-light tracking-[-0.02em] text-[#0A1112] sm:text-5xl">
            {currentSlide.title}
          </h3>

          <p className="mt-4 text-sm leading-relaxed text-[#0A1112]/75">
            {currentSlide.description}
          </p>

          <div className="mt-8 flex items-center gap-4">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous project"
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-[#0A1112]/25 text-[#0A1112] transition-colors hover:bg-[#0A1112] hover:text-[#F2F4F3]"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next project"
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-[#0A1112]/25 text-[#0A1112] transition-colors hover:bg-[#0A1112] hover:text-[#F2F4F3]"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
            <Link
              to={`/projects/${currentSlide.slug}`}
              className="ml-2 inline-block rounded-full border border-[#0A1112] px-6 py-2.5 text-[12px] tracking-[0.16em] text-[#0A1112] uppercase transition-colors hover:bg-[#0A1112] hover:text-[#F2F4F3]"
            >
              Open Dossier
            </Link>
          </div>
        </div>

        {/* Right: Ken Burns Image Frame */}
        <div className="lg:col-span-7">
          <div className="relative aspect-[16/10] overflow-hidden rounded-[20px] bg-[#0A1112]">
            <img
              key={currentSlide.imageUrl}
              src={currentSlide.imageUrl}
              alt={currentSlide.alt}
              loading="lazy"
              width={1400}
              height={875}
              className={`h-full w-full object-cover transition-all duration-700 ${
                isTransitioning ? 'scale-105 opacity-0' : 'scale-100 opacity-100'
              }`}
            />
          </div>
        </div>
      </div>

      {/* Progress Indicators */}
      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {SLIDES.map((slide, index) => (
          <button
            key={slide.slug}
            type="button"
            onClick={() => goToSlide(index)}
            className="cursor-pointer text-left"
          >
            <div className="h-[2px] w-full overflow-hidden bg-[#0A1112]/15">
              <div
                className="h-full bg-[#1B5E63] transition-[width] duration-75"
                style={{
                  width:
                    index === currentIndex
                      ? `${progress}%`
                      : index < currentIndex
                        ? '100%'
                        : '0%',
                }}
              />
            </div>
            <div
              className={`mt-2.5 text-[12px] tracking-[0.06em] transition-colors ${
                index === currentIndex ? 'font-medium text-[#0A1112]' : 'text-[#0A1112]/55'
              }`}
            >
              {slide.title}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
