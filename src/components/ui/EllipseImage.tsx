import Image from 'next/image'
import { cn } from '@/lib/utils'

type EllipseImageProps = {
  src: string
  alt: string
  width: number
  height?: number
  className?: string
  priority?: boolean
}

/** Circular portrait crop focused on the head/face. */
export function EllipseImage({
  src,
  alt,
  width,
  className,
  priority,
}: EllipseImageProps) {
  return (
    <div
      className={cn('relative shrink-0 overflow-hidden rounded-full mask-circle', className)}
      style={{ width, height: width }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={`${width}px`}
        priority={priority}
        className="object-cover"
        style={{ objectPosition: '50% 12%' }}
      />
    </div>
  )
}
