import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import dotenv from 'dotenv'

dotenv.config({path: '.env.local'})

export default defineConfig({
  name: 'default',
  title: 'domiemorine',

  projectId: process.env.VITE_SANITY_PROJECT_ID || '',
  dataset: process.env.VITE_SANITY_DATASET || '',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
