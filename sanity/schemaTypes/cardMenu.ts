import {defineField, defineType} from 'sanity'
import { spacingFields } from './spacing'

export default defineType({
  name: 'cardMenu',
  title: 'Card Menu',
  type: 'object',
  fields: [
    defineField({
      name: 'cards',
      title: 'Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title *',
              type: 'object',
              fields: [
                {name: 'FR', title: 'Français', type: 'string'},
                {name: 'EN', title: 'English', type: 'string'},
              ],
              validation: (rule) => rule.required(),
            },
            {
              name: 'description',
              title: 'Description *',
              type: 'object',
              fields: [
                {name: 'FR', title: 'Français', type: 'text'},
                {name: 'EN', title: 'English', type: 'text'},
              ],
            },
            {
              name: 'destinationPage',
              title: 'Destination Page',
              type: 'reference',
              to: [{type: 'page'}],
            },
          ],
        },
      ],
    }),
    ...spacingFields,
  ],
  preview: {
    select: {
      cards: 'cards',
    },
    prepare({cards}) {
      return {
        title: `Card Menu`,
        subtitle: `${cards?.length || 0} card${cards?.length !== 1 ? 's' : ''}`,
      }
    },
  },
})
