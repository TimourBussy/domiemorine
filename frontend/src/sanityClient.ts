import { createClient } from '@sanity/client';

const sanityClient = createClient({
  projectId: 'sedrvse1',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2026-03-28',
});

export default sanityClient;
