export function Paragraph({
  children,
}: {
  children: string
}) {
  return <p className="text-gray-700 text-lg text-center whitespace-pre-wrap">{children}</p>
}
