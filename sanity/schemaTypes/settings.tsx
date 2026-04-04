import {defineField, defineType} from 'sanity'
import {IconSelector} from '../components/IconSelector'
import {getIcon} from '../lib/iconsRegistry'

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
            {
              name: 'url',
              title: 'URL',
              type: 'string',
              validation: (rule) => rule.required(),
            },
          ],
          preview: {
            select: {
              name: 'name',
              icon: 'icon',
              url: 'url',
            },
            prepare({name, icon, url}) {
              const IconComponent = icon ? getIcon(icon) : null
              return {
                title: name || 'Unnamed',
                subtitle: url,
                media: IconComponent && (() => <IconComponent />),
              }
            },
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
