import { defineField } from 'sanity'

export const spacingFields = [
  defineField({
    name: 'marginTop',
    title: 'Margin Top',
    type: 'number',
    options: {
      list: [4, 8, 12, 16, 20, 24],
    },
  }),
  defineField({
    name: 'marginRight',
    title: 'Margin Right',
    type: 'number',
    options: {
      list: [4, 8, 12, 16, 20, 24],
    },
  }),
  defineField({
    name: 'marginBottom',
    title: 'Margin Bottom',
    type: 'number',
    options: {
      list: [4, 8, 12, 16, 20, 24],
    },
  }),
  defineField({
    name: 'marginLeft',
    title: 'Margin Left',
    type: 'number',
    options: {
      list: [4, 8, 12, 16, 20, 24],
    },
  }),
]
