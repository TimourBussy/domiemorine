import {Card} from './Card'

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
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((card, index) => (
        <Card key={index} title={card.title} paragraph={card.paragraph} to={card.to} />
      ))}
    </section>
  )
}
