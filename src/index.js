#!/usr/bin/env node

const program = require('commander');

import { buildDocs } from './buildDocs';
import { writeSummary } from './writeSummary';

program
  .version(require('../package.json').version)
  .description(
    'Docnator is a CLI for generate documentation with gitbook and jsdocs',
  )
  .arguments('<target> [summaryPath] [extension]')
  .action((target, summaryPath, extension) => {
    buildDocs(target, extension)
      .then(resp => writeSummary(resp, summaryPath))
      .then(() => console.log('docnator finish'))
      .catch(e => console.log(e));
  });

program.on('--help', () => {
  const help = `

  Example: docnator src

  arguments:

  - target: file source repository, is required.
  - summaryPath: path of SUMMARY.md file, optional
  - extension: extension file sources, optional
`;
  console.log(help);
});

program.parse(process.argv);
