import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'object',
      fields: [
        {name: 'fr_FR', title: 'Français', type: 'string'},
        {name: 'en_GB', title: 'English', type: 'string'},
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'displayTitle',
      title: 'Display page title',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
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
      name: 'body',
      type: 'array',
      of: [{type: 'block'}, {type: 'titleAndParagraph'}, {type: 'cardMenu'}],
    }),
  ],
  preview: {
    select: {
      en: 'title.en_GB',
      fr: 'title.fr_FR',
      media: 'heroImage',
    },
    prepare({en, fr, media}) {
      return {
        title: `${fr || 'Pas de titre français'} / ${en || 'No English title'}`,
        media,
      }
    },
  },
})
