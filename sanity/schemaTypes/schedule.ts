import {defineType, defineField} from 'sanity'
import {spacingFields} from './spacing'

export default defineType({
  name: 'schedule',
  title: 'Schedule',
  type: 'object',
  fields: spacingFields,
  preview: {
    prepare() {
      return {title: 'Schedule'}
    },
  },
})
