import {defineField, defineType} from 'sanity'

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
              title: 'Title',
              type: 'object',
              fields: [
                {name: 'fr_FR', title: 'Français', type: 'string'},
                {name: 'en_GB', title: 'English', type: 'string'},
              ],
              validation: (rule) => rule.required(),
            },
            {
              name: 'description',
              title: 'Description',
              type: 'object',
              fields: [
                {name: 'fr_FR', title: 'Français', type: 'text'},
                {name: 'en_GB', title: 'English', type: 'text'},
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
  ],
})
