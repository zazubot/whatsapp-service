/**
 * ┌──────────────────────────────────────────────────────────────────────────────┐
 * │ limitations under the License.                                               │
 * │                                                                              │
 * ├──────────────────────────────────────────────────────────────────────────────┤
 * │ @important                                                                   │
 * │ For any future changes to the code in this file, it is recommended to        │
 * │ contain, together with the modification, the information of the developer    │
 * │ who changed it and the date of modification.                                 │
 * └──────────────────────────────────────────────────────────────────────────────┘
 */

import { Router } from 'express';
import { join } from 'path';
import YAML from 'yamljs';
import { readFileSync } from 'fs';
import { serve, setup } from 'swagger-ui-express';

const router = Router();

const yamlFile = readFileSync(join(process.cwd(), 'docs', 'swagger.yaml'), {
  encoding: 'utf8',
});

const json = YAML.parse(yamlFile);

if (process.env?.API_BACKEND) {
  json.servers[0].variables.prod_host.default = process.env?.API_BACKEND;
}

export const docsRouter = router.use(
  '/docs',
  serve,
  setup(json, {
    customSiteTitle: 'CodeChat Api V1',
    customCssUrl: '/css/dark-theme-swagger.css',
    customfavIcon: '/images/logo.png',
  }),
);
