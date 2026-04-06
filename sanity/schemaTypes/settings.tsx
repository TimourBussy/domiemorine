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
      name: 'navigationMenu',
      title: 'Navigation Menu',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'menuItem',
          title: 'Menu Item',
          fields: [
            {
              name: 'page',
              title: 'Page *',
              type: 'reference',
              to: [{type: 'page'}],
              validation: (rule) => rule.required(),
            },
            {
              name: 'children',
              title: 'Submenu Items',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'submenuItem',
                  title: 'Page',
                  fields: [
                    {
                      name: 'page',
                      title: 'Page *',
                      type: 'reference',
                      to: [{type: 'page'}],
                      validation: (rule) => rule.required(),
                    },
                  ],
                  preview: {
                    select: {title: 'page.title'},
                    prepare(selection) {
                      return {
                        title:
                          [selection.title?.FR || '', selection.title?.EN || '']
                            .filter(Boolean)
                            .join(' / ') || 'Unnamed Page',
                      }
                    },
                  },
                },
                {
                  type: 'object',
                  name: 'ensemblesListItem',
                  title: 'Ensembles List',
                  fields: [
                    {
                      name: 'placeholder',
                      type: 'string',
                      hidden: true,
                    },
                  ],
                  preview: {
                    prepare() {
                      return {title: 'Ensembles List'}
                    },
                  },
                },
              ],
            },
          ],
          preview: {
            select: {
              title: 'page.title',
              child0: 'children[0]._type',
              child1: 'children[1]._type',
              child2: 'children[2]._type',
            },
            prepare(selection) {
              const childCount = [selection.child0, selection.child1, selection.child2].filter(
                Boolean,
              ).length
              return {
                title:
                  [selection.title?.FR || '', selection.title?.EN || '']
                    .filter(Boolean)
                    .join(' / ') || 'Unnamed Page',
                subtitle: childCount
                  ? `${childCount} submenu item${childCount > 1 ? 's' : ''}`
                  : ''
              }
            },
          },
        },
      ],
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
              title: 'Name *',
              type: 'string',
              validation: (rule) => rule.required(),
            },
            {
              name: 'icon',
              title: 'Icon *',
              type: 'string',
              validation: (rule) => rule.required(),
              components: {
                input: IconSelector,
              },
            },
            {
              name: 'url',
              title: 'URL *',
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
    defineField({
      name: 'ensembles',
      title: 'Ensembles',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'image',
              title: 'Image *',
              type: 'image',
              validation: (rule) => rule.required(),
            },
            {
              name: 'name',
              title: 'Name *',
              type: 'string',
              validation: (rule) => rule.required(),
            },
            {
              name: 'previewDesc',
              title: 'Preview Description',
              type: 'object',
              fields: [
                {
                  name: 'FR',
                  title: 'Français',
                  type: 'string',
                },
                {
                  name: 'EN',
                  title: 'English',
                  type: 'string',
                },
              ],
            },
            {
              name: 'slug',
              title: 'Slug *',
              type: 'slug',
              options: {
                source: (_doc: any, context: any) => context.parent?.name || '',
              },
              validation: (rule) => rule.required(),
            },
            {
              name: 'desc',
              title: 'Description',
              type: 'object',
              fields: [
                {
                  name: 'FR',
                  title: 'Français',
                  type: 'text',
                },
                {
                  name: 'EN',
                  title: 'English',
                  type: 'text',
                },
              ],
            },
            {
              name: 'socialMedias',
              title: 'Ensemble Social Medias',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'name',
                      title: 'Name *',
                      type: 'string',
                      validation: (rule) => rule.required(),
                    },
                    {
                      name: 'icon',
                      title: 'Icon *',
                      type: 'string',
                      validation: (rule) => rule.required(),
                      components: {
                        input: IconSelector,
                      },
                    },
                    {
                      name: 'url',
                      title: 'URL *',
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
            },
          ],
          preview: {
            select: {
              name: 'name',
              image: 'image',
              previewDesc: 'previewDesc',
            },
            prepare({name, image, previewDesc}) {
              return {
                title: name || 'Unnamed',
                subtitle: previewDesc?.FR || previewDesc?.EN || '',
                media: image,
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
