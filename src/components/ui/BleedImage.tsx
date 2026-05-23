import Image from 'next/image'

type BleedImageProps = {
  src: string
  alt: string
  opacity?: number
  priority?: boolean
  className?: string
  height?: string
}

export function BleedImage({
  src,
  alt,
  opacity = 0.55,
  priority = false,
  className = '',
  height = 'h-64 md:h-96',
}: BleedImageProps) {
  return (
    <div className={`bleed-strip relative ${height} overflow-hidden image-cover ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="100vw"
        priority={priority}
        className="object-cover object-center"
        style={{ opacity }}
      />
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(26,28,36,0.3) 0%, rgba(26,28,36,0.7) 100%)',
        }}
      />
    </div>
  )
}
