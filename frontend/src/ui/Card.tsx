import {Paragraph} from './Paragraph'
import {Title} from './Title'

export function Card({title, paragraph, to}: {title: string; paragraph: string; to: string}) {
  return (
    <a
      href={to}
      className="flex flex-col gap-4 p-6 rounded-lg shadow-md transition-shadow"
    >
      <Title level={3} colored>{title}</Title>
      <Paragraph>{paragraph}</Paragraph>
    </a>
  )
}
