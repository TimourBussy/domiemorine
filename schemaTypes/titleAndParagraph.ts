import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'titleAndParagraph',
  title: 'Title & Paragraph',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'object',
      fields: [
        { name: 'fr_FR', title: 'Français', type: 'string' },
        { name: 'en_GB', title: 'English', type: 'string' }
      ],
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'paragraph',
      title: 'Paragraph',
      type: 'object',
      fields: [
        { name: 'fr_FR', title: 'Français', type: 'text' },
        { name: 'en_GB', title: 'English', type: 'text' },
      ],
      validation: (rule) => rule.required()
    }),
  ],
})