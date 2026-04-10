import {defineField, defineType} from 'sanity'
import {spacingFields} from './spacing'

export default defineType({
  name: 'button',
  title: 'Button',
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      title: 'Text *',
      type: 'object',
      fields: [
        {name: 'FR', title: 'Français', type: 'string', validation: (rule) => rule.required()},
        {name: 'EN', title: 'English', type: 'string', validation: (rule) => rule.required()},
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'link',
      title: 'Link *',
      type: 'reference',
      to: [{type: 'page'}],
      validation: (rule) => rule.required(),
    }),
    ...spacingFields,
  ],
  preview: {
    select: {
      fr: 'text.FR',
      en: 'text.EN',
      linkTitle: 'link.title',
    },
    prepare({fr, en, linkTitle}) {
      return {
        title: `${fr || ''} / ${en || ''}`.trim(),
        subtitle: linkTitle && `To: ${linkTitle.FR || ''} / ${linkTitle.EN || ''}`.trim(),
      }
    },
  },
})
