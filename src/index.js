#!/usr/bin/env node

const program = require('commander');

import { serverDocs } from './serverDocs';
import { buildDocs } from './buildDocs';

program
  .version(require('../package.json').version)
  .description(
    'Docnator is a CLI for generate documentation with gitbook and jsdocs',
  )
  .command('build <target> <extension>')
  .alias('b')
  .action(buildDocs);

program
  .command('server')
  .alias('s')
  .action(serverDocs);

program.parse(process.argv);
