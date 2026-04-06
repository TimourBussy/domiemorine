import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'ensembles',
  title: 'Ensembles',
  type: 'object',
  fields: [
    defineField({
      name: 'placeholder',
      type: 'string',
      hidden: true,
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Ensembles'}
    },
  },
})
