## Questions
If you have questions, please open the issue and await our response.
If you are seeking for help as user, please try Stack Overflow.

## Issue Labeling

| Label | Description |
| ------|-------------|
| docs | Indicate documentation development necessary |
| feat | Indicate feature development |
| CI | Indicate Continuous integration development |
| refactor | Indicate code refactor |
| remove | Indicate feature removal |
| fix | Indicates an unexpected problem or unintended behavior |
| duplicate | Indicates similar issues or pull requests |
| enhancement | Indicates new feature requests |
| good first issue | Indicates a good issue for first-time contributors |
| help wanted | Indicates that a maintainer wants help on an issue or pull request |
| invalid | Indicates that an issue or pull request is no longer relevant |
| question | Indicates that an issue or pull request needs more information |
| wontfix | Indicates that work won't continue on an issue or pull request |

## Report a bug fix
To report a fix, follow the issue template, if possible attach a [codesandbox](https://codesandbox.io/) or [jsBin](https://codesandbox.io/) with the error.

## Proposal a Feature
Open a problem, mark it as other, and describe the current scenario, its problems, and how your resource solves this problem.

## Status Check List
- danger system
  - commit pattern (breaks)
  - diferences between yarn.lock and npm.lock (warns)
  - warn big PRs (warns)
  - added dependencies and dev dependencies (warns)
  - updated dependencies and dev dependencies (warns)
  - removed dependencies and dev dependencies (warns)
- code coverage
  - branches: 100%
  - functions: 100%
  - lines: 100%
  - statements: 100%
- travis
  - prettier code format
  - unit test coverage
  - jsdocs coverage
  - build passed

## Pull request roadmap
Step by step, with all the way to get an issue, organize the development environment, solve the problem and submit to your pull request.

### Catch the task on the Project
Take a task in the [project](https://github.com/agrotis-io/docnator/projects/1), read the content of issue, if you have any questions, leave a comment.

### Clone/Fork the Project
Members must be clone the project and submit a pull request, other contributors must be fork the project.

### Branch Organization
Our branches must be created using the name suggested in the description of the issue, which should only be sent to the remote repository. The branch names follow the rule: issue_ [number_of_issue] - [title_of_issue].

> ex: issue_3-update_contributing

### Develop workflow
After cloning the project and creating the branch, follow [README.md](https://github.com/agrotis-io/docnator/blob/master/README.md) to configure your environment. Develop your solution and write your tests (if necessary), when your task is finished, send it to pull request.

## lint
We have used the [prettier](https://prettier.io/) ccode formatter, if you want to configure your editor to work with it, see [integration](https://prettier.io/docs/en/editors.html).

## jsdocs
Eont forget the write documentation of your features, [use JsDocs](http://usejsdoc.org/)

## test
We are using [jest](https://facebook.github.io/jest/)as the unit testing plataform. Write the unit tests, each assert must be isolated for the others features or others asserts. The test messages title should follow this rule: “module_name - feature_name - test_name”.

> ex: "FileReader.mountFilesList - must return list.length equals 3"

