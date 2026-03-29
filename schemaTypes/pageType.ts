import {defineField, defineType} from 'sanity'

export const pageType = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'object',
      fields: [
        { name: 'fr_FR', title: 'Français', type: 'string' },
        { name: 'en_GB', title: 'English', type: 'string' },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroImage',
      type: 'image',
    }),
    defineField({
      name: 'body',
      type: 'array',
      of: [
        {type: 'block'},
        {type: 'titleAndParagraph' },
      ],
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
      };
    },
  }
})