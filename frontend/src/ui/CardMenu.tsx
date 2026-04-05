import {LinkCard} from './LinkCard'

export function CardMenu({
  cards,
  className,
}: {
  cards: {
    title: string
    paragraph: string
    to: string
  }[]
  className?: string
}) {
  return (
    <article className={`grid grid-cols-1 2xl:grid-cols-3 gap-6 ${className || ''}`}>
      {cards.map((card, index) => (
        <LinkCard key={index} title={card.title} paragraph={card.paragraph} to={card.to} />
      ))}
    </article>
  )
}
