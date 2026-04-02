import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'socialLinks',
  title: 'Social Links',
  type: 'object',
  fields: [
    defineField({
      name: 'links',
      title: 'Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'network',
              title: 'Network',
              type: 'string',
              options: {
                list: [
                  {title: 'Custom', value: 'custom'},
                ],
                layout: 'dropdown',
              },
              initialValue: 'custom',
            },
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
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (rule) => rule.required(),
            },
          ],
          preview: {
            select: {
              name: 'name',
              icon: 'icon',
            },
            prepare({name, icon}) {
              return {
                title: name,
                subtitle: icon,
              }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      links: 'links',
    },
    prepare({links}) {
      return {
        title: 'Social Links',
        subtitle: `${links?.length || 0} link${links?.length !== 1 ? 's' : ''}`,
      }
    },
  },
})
