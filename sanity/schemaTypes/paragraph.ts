import { defineField, defineType } from 'sanity'
import { spacingFields } from './spacing'

export default defineType({
  name: 'paragraph',
  title: 'Paragraph',
  type: 'object',
  fields: [
    defineField({
      name: 'content',
      title: 'Paragraph *',
      type: 'object',
      fields: [
        { name: 'FR', title: 'Français', type: 'text' },
        { name: 'EN', title: 'English', type: 'text' },
      ],
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'size',
      title: 'Size *',
      type: 'string',
      options: {
        list: [
          { title: 'Small', value: 'small' },
          { title: 'Large', value: 'large' },
        ],
      },
      initialValue: 'small',
      validation: (rule) => rule.required()
    }),
    ...spacingFields,
  ],
  preview: {
    select: {
      fr: 'content.FR',
      en: 'content.EN',
      size: 'size',
    },
    prepare({fr, en, size}) {
      const text = fr || en || 'Empty paragraph'
      const preview = text.length > 50 ? `${text.substring(0, 50)}...` : text
      return {
        title: preview,
        subtitle: `Size: ${size}`,
      }
    },
  },
})
