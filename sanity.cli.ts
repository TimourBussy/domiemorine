import {defineCliConfig} from 'sanity/cli'
import {DATASET, PROJECT_ID} from './sanity/settings'

export default defineCliConfig({
  api: {
    projectId: PROJECT_ID,
    dataset: DATASET,
  },
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  },
})
