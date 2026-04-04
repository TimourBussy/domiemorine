import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'socialLinks',
  title: 'Social Links',
  type: 'object',
  fields: [
    defineField({
      name: 'size',
      title: 'Size',
      type: 'string',
      options: {
        list: [
          {title: 'Small', value: 'small'},
          {title: 'Medium', value: 'medium'},
          {title: 'Large', value: 'large'},
        ],
        layout: 'dropdown',
      },
      initialValue: 'medium',
    }),
    defineField({
      name: 'colored',
      title: 'Colored',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      size: 'size',
      colored: 'colored',
    },
    prepare({size, colored}) {
      return {
        title: 'Social Links',
        subtitle: `${size} ${colored ? '(Colored)' : ''}`.trim(),
      }
    },
  },
})
