// JSON snapshots exposed as a module: createRequire works in plain Node (for
// local testing) and esbuild inlines the require()d JSON when bundling the
// Netlify function.
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

export const SNAPSHOT_ARCHIVE = require('./blog-archive.json');
export const SNAPSHOT_POSTS = require('./posts-cache.json');
