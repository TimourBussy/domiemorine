import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'group',
  title: 'Group',
  type: 'object',
  fields: [
    defineField({
      name: 'blocks',
      title: 'Blocks',
      type: 'array',
      of: [
        {type: 'title'},
        {type: 'paragraph'},
        {type: 'cardMenu'},
        {type: 'socialLinks'},
      ],
    }),
    defineField({
      name: 'marginTop',
      title: 'Margin Top',
      type: 'number',
      options: {
        list: [4, 8, 12, 16, 20, 24],
      },
    }),
    defineField({
      name: 'marginBottom',
      title: 'Margin Bottom',
      type: 'number',
      options: {
        list: [4, 8, 12, 16, 20, 24],
      },
    }),
  ],
  preview: {
    select: {
      blocks: 'blocks',
    },
    prepare({blocks}) {
      return {
        title: 'Group',
        subtitle: `${blocks?.length || 0} block${blocks?.length !== 1 ? 's' : ''}`,
      }
    },
  },
})
