// updateVersion.js
import fs from 'fs';
import { version } from '../src/lib/utils/version.js';

const rootDir = process.cwd();
const manifest_file = 'manifest.webmanifest';

// Update the version in a.json
const jsonFile = `${rootDir}/public/${manifest_file}`;
const data = JSON.parse(fs.readFileSync(jsonFile));

data.b2g_features.version = version;

fs.writeFileSync(jsonFile, JSON.stringify(data, null, 4));
