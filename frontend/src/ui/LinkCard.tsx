import {Paragraph} from './Paragraph'
import {Title} from './Title'

export function LinkCard({title, paragraph, to}: {title: string; paragraph: string; to: string}) {
  return (
    <a
      href={to}
      className="flex flex-col gap-4 p-8 rounded-lg shadow-md group hover:shadow-lg transition-all"
    >
      <Title level={6} colored>
        {title}
      </Title>
      <Paragraph>{paragraph}</Paragraph>
    </a>
  )
}
