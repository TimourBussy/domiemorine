import {createClient} from '@sanity/client'
import {DATASET, PROJECT_ID} from '../../sanity/settings'

const sanityClient = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  useCdn: import.meta.env.PROD,
  apiVersion: '2026-03-28',
})

export default sanityClient
