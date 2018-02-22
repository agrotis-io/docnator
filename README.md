# DOCNATOR
> ||| :no_entry_sign: in progress, docnator still are in development. |||

<p align="center">
    <span>
        <img alt="latest release" src="https://img.shields.io/github/release/agrotis-io/docnator/all.svg?style=flat-square">
    </span>
    <span>
        <img alt="travis ci build status" src="https://img.shields.io/travis/agrotis-io/docnator/master.svg?style=flat-square">
    </span>
    <span>
        <img alt="percentage of code coverage by tests" src="https://img.shields.io/codecov/c/github/agrotis-io/docnator/master.svg?style=flat-square">
    </span>
    <span>
        <img alt="minimum node version" src="https://img.shields.io/node/v/docnator.svg?style=flat-square">
    </span>
    <span>
        <img alt="code style: prettier" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square">
    </span>
    <span>
        <img alt="semantic release" src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square">
    </span>
</p>

docnator is a CLI for generate the documentation of your javascript project, take your [jsdocs](http://usejsdoc.org/), transform in markdown files, and use [gitbook](https://www.gitbook.com/) template.

![docnator logomark](images/docnator.jpg)

## Instalation

### Global
> global instalation for use in any project with jsdocs.

```shell
# yarn
$ yarn global add docnator

# npm
$ npm install docnator --global
```

**Usage** 
```shell
$ docnator build
```

### Local
> local instalation for the especific project

```shell
# yarn
$ yarn add docnator

# npm
$ npm install docnator
```

**Usage** 
```shell
$ node_modules/docnator/bin/docnator.js build
# you can create a script in your package.json
# ex: "docnator:build": "node_modules/docnator/bin/docnator.js build"
```

## Commands

### build
> comand for generate the documentation.
```shell
$ docnator build [target] [extension]
# ex: docnator server lib js
``` 
|arg|description|required|default value|
|---|-----------|--------|-------------|
|target| source files directory | false | src |
|extension| define the exclusive extension file | false | js, jsx |

### server
> create a local server with gitbook for your documentations
```shell
$ docnator server
```

## Motivation

Docnator has be created to use jsdocs in javascript documentation with gitbook for developers reference. This frameworks are most easy to use and bring great help for developer community.
