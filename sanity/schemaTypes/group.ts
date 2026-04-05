import {defineField, defineType} from 'sanity'
import {MARGIN_CLASSES} from '../../frontend/src/ui/Group'

const MARGIN_VALUES = [4, 8, 12, 16, 20, 24]

export default defineType({
  name: 'group',
  title: 'Group',
  type: 'object',
  fields: [
    defineField({
      name: 'blocks',
      title: 'Blocks',
      type: 'array',
      of: [{type: 'title'}, {type: 'paragraph'}, {type: 'cardMenu'}, {type: 'socialLinks'}],
    }),
    defineField({
      name: 'marginTop',
      title: 'Margin Top',
      type: 'number',
      options: {
        list: MARGIN_VALUES,
      },
    }),
    defineField({
      name: 'marginRight',
      title: 'Margin Right',
      type: 'number',
      options: {
        list: MARGIN_VALUES,
      },
    }),
    defineField({
      name: 'marginBottom',
      title: 'Margin Bottom',
      type: 'number',
      options: {
        list: MARGIN_VALUES,
      },
    }),
    defineField({
      name: 'marginLeft',
      title: 'Margin Left',
      type: 'number',
      options: {
        list: MARGIN_VALUES,
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
