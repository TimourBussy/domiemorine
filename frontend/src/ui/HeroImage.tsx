export function HeroImage({src, alt}: {src: string; alt: string}) {
  return (
    <img
      src={src}
      alt={alt}
      className="top-0 left-0 w-full h-[75vh] object-cover"
    />
  )
}
