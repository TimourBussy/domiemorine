import { defineField, defineType } from 'sanity'
import { spacingFields } from './spacing'

export default defineType({
  name: 'title',
  title: 'Title',
  type: 'object',
  fields: [
    defineField({
      name: 'content',
      title: 'Title *',
      type: 'object',
      fields: [
        { name: 'FR', title: 'Français', type: 'string' },
        { name: 'EN', title: 'English', type: 'string' }
      ],
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'level',
      title: 'Level *',
      type: 'number',
      options: {
        list: [3, 4, 5, 6],
      },
      initialValue: 3,
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'colored',
      title: 'Colored',
      type: 'boolean',
      initialValue: false,
    }),
    ...spacingFields,
  ],
  preview: {
    select: {
      fr: 'content.FR',
      en: 'content.EN',
      level: 'level',
      colored: 'colored',
    },
    prepare({fr, en, level, colored}) {
      return {
        title: `${fr || en || ''} (H${level})`,
        subtitle: colored && 'Colored',
      }
    },
  },
})
