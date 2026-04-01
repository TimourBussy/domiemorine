import { Paragraph } from "./Paragraph";
import { Title } from "./Title";

export function TitleAndParagraph({title, paragraph}: {title: string; paragraph: string}) {
  return (
    <section className="flex flex-col gap-6">
      <Title level={2}>{title}</Title>
      <Paragraph>{paragraph}</Paragraph>
    </section>
  )
}
