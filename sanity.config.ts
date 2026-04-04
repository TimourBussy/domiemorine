import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './sanity/schemaTypes'
import {DATASET, PROJECT_ID} from './sanity/settings'

export default defineConfig({
  name: 'default',
  title: 'domiemorine',

  projectId: PROJECT_ID,
  dataset: DATASET,

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Settings')
              .child(S.document().schemaType('settings').documentId('settings')),
            S.divider(),
            S.documentTypeListItem('page').title('Pages'),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
