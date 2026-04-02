import {defineField, defineType} from 'sanity'
import {IconSelector} from '../sanity/components/IconSelector'
import {SocialMediaPreview} from '../sanity/components/SocialMediaPreview'

export default defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      initialValue: 'Settings',
      hidden: true,
    }),
    defineField({
      name: 'socialMedias',
      title: 'Social Media Networks',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Name',
              type: 'string',
              validation: (rule) => rule.required(),
            },
            {
              name: 'icon',
              title: 'Icon',
              type: 'string',
              validation: (rule) => rule.required(),
              components: {
                input: IconSelector,
              },
            },
          ],
          preview: {
            select: {
              name: 'name',
              icon: 'icon',
            },
            component: SocialMediaPreview,
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({title}) {
      return {
        title: title || 'Settings',
      }
    },
  },
})
