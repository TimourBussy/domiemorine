import {defineField, defineType} from 'sanity'
import {spacingFields} from './spacing'

export default defineType({
  name: 'img',
  title: 'Image',
  type: 'object',
  fields: [
    defineField({
      name: 'src',
      title: 'Source *',
      type: 'image',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Alternative Text',
      type: 'object',
      fields: [
        {name: 'FR', title: 'Français', type: 'text'},
        {name: 'EN', title: 'English', type: 'text'},
      ],
    }),
    defineField({
      name: 'dimensionType',
      title: ' ',
      type: 'string',
      initialValue: 'width',
      options: {
        list: [
          {title: 'Width', value: 'width'},
          {title: 'Height', value: 'height'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'dimension',
      title: 'Value (px)',
      type: 'number',
      validation: (rule) => rule.min(0),
    }),
    ...spacingFields,
  ],
  preview: {
    select: {
      alt: 'alt',
      media: 'src',
    },
    prepare({alt, media}) {
      return {
        title: alt?.FR || alt?.EN || 'Image',
        media,
      }
    }
  },
})
