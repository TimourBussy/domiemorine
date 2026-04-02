import {LinkCard} from './LinkCard'

export function CardMenu({
  cards,
}: {
  cards: {
    title: string
    paragraph: string
    to: string
  }[]
}) {
  return (
    <article className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((card, index) => (
        <LinkCard key={index} title={card.title} paragraph={card.paragraph} to={card.to} />
      ))}
    </article>
  )
}
