import {defineField, defineType} from 'sanity'
import {DATASET, PROJECT_ID} from '../settings'

// Helper to fetch the page count from Sanity API
async function getNextPageOrder() {
  try {
    const response = await fetch(
      `https://${PROJECT_ID}.api.sanity.io/v2026-03-28/data/query/${DATASET}?query=${encodeURIComponent(`count(*[_type == "page"])`)}`,
    )
    const data = await response.json()

    if (data.result) {
      return data.result + 1
    }
    return 1
  } catch (error) {
    console.error('Error fetching page count:', error)
    return 1
  }
}

export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({
      name: 'order',
      title: 'Display order *',
      type: 'number',
      initialValue: () => getNextPageOrder(),
      validation: (rule) => rule.required().min(1).error('Display order must be at least 1'),
    }),
    defineField({
      name: 'title',
      title: 'Title *',
      type: 'object',
      fields: [
        {name: 'FR', title: 'Français', type: 'string'},
        {name: 'EN', title: 'English', type: 'string'},
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug *',
      type: 'object',
      fields: [
        {
          name: 'FR',
          title: 'Français',
          type: 'slug',
          options: {source: 'title.FR'},
          validation: (rule) => rule.required(),
        },
        {
          name: 'EN',
          title: 'English',
          type: 'slug',
          options: {source: 'title.EN'},
          validation: (rule) => rule.required(),
        },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroImage',
      type: 'object',
      fields: [
        {name: 'src', title: 'Source', type: 'image'},
        {name: 'altFr', title: 'Texte alternatif Français', type: 'string'},
        {name: 'altEn', title: 'Alternative text English', type: 'string'},
      ],
    }),
    defineField({
      name: 'displayTitle',
      title: 'Display page title',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'body',
      type: 'array',
      of: [
        {type: 'group'},
        {type: 'title'},
        {type: 'paragraph'},
        {type: 'cardMenu'},
        {type: 'socialLinks'},
      ],
    }),
  ],
  orderings: [
    {
      title: "Display Order",
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      en: 'title.EN',
      fr: 'title.FR',
      media: 'heroImage.src',
    },
    prepare({en, fr, media}) {
      return {
        title: `${fr || ''} / ${en || ''}`,
        media,
      }
    },
  },
})
