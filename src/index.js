#!/usr/bin/env node

const program = require('commander');

program
  .version(require('../package.json').version)
  .description(
    'Docnator is a CLI for generate documentation with gitbook and jsdocs',
  )
  .command('build <target> <extension>')
  .alias('b')
  .action((target, extension) => {
    console.log('this is the source files directory %s', target);
    console.log('this is the extensions %s', extension);
  });

program
  .command('server')
  .alias('s')
  .action(() => {
    console.log('listen the localhost:8080 motherfucker B(');
  });

program.parse(process.argv);
