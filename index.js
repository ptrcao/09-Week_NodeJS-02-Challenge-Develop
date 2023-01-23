// TODO: Include packages needed for this application

// const fs = require('fs');
import * as fs from "fs";
// const fetch = require('node-fetch');
import fetch from "node-fetch";

// const inquirer = require('inquirer');
import inquirer from "inquirer";

const validateUsername = async function (input) {
  console.log(input);

  const response = await fetch(
    `https://api.github.com/users/${input}`
  );
  // console.log(response);
  const data = await response.json();
  console.log(data.message);

  if (data.message) {
    if (data.message === "Not Found") {
      return "User was not found, please use a valid username.";
    }
  } else {
    return true;
  }
};

inquirer
  .prompt([
    {
      name: "projectName",
      message: "What the project name?",
      type: "input",
    },
    {
      name: "projectDescription",
      message: "What the project description?",
      type: "input",
    },
    {
      type: "input",
      name: "githubUser",
      message:
        "What is your Github username? (This is needed for Shields badges and is used to retrieve code size, repo size, repo file count and licence type)",

      validate: validateUsername,
    },
    {
      name: "githubRepoName",
      message:
        "What is the Github repository name? (This is needed for Shields badges and is used to retrieve code size, repo size, repo file count)",
      type: "input",
    },
    {
      name: "contribution",
      message:
        "Please provide your call to contributions and any relevant information here.",
      type: "input",
    },
    {
      type: "list",
      name: "licence",
      message: "What type of licence applies to your project?",
      choices: ["Get the licence from my gitHub"],
    },
  ])
  .then((answers) => {
    const data = `
# ${answers.projectName}

## Description

![Custom badge](https://img.shields.io/endpoint?label=label1&style=plastic&url=testvalue)

${answers.projectDescription}

Provide a short description explaining the what, why, and how of your project. Use the following questions as a guide:

- What was your motivation?
- Why did you build this project? (Note: the answer is not "Because it was a homework assignment.")
- What problem does it solve?
- What did you learn?

## Table of Contents (Optional)

If your README is long, add a table of contents to make it easy for users to find what they need.

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## Installation

What are the steps required to install your project? Provide a step-by-step description of how to get the development environment running.

## Usage

Provide instructions and examples for use. Include screenshots as needed.

To add a screenshot, create an \`assets/images\` folder in your repository and upload your screenshot to it. Then, using the relative filepath, add it to your README using the following syntax:

    \`\`\`md
    ![alt text](assets/images/screenshot.png)
    \`\`\`

## Credits

List your collaborators, if any, with links to their GitHub profiles.

If you used any third-party assets that require attribution, list the creators with links to their primary web presence in this section.

If you followed tutorials, include links to those here as well.

## License

The last section of a high-quality README file is the license. This lets other developers know what they can and cannot do with your project. If you need help choosing a license, refer to [https://choosealicense.com/](https://choosealicense.com/).

---

🏆 The previous sections are the bare minimum, and your project will ultimately determine the content of this document. You might also want to consider adding the following sections.

## Badges

![badmath](https://img.shields.io/github/languages/top/lernantino/badmath)

Badges aren't necessary, per se, but they demonstrate street cred. Badges let other developers know that you know what you're doing. Check out the badges hosted by [shields.io](https://shields.io/). You may not understand what they all represent now, but you will in time.

## Features

If your project has a lot of features, list them here.

## How to Contribute

If you created an application or package and would like other developers to contribute it, you can include guidelines for how to do so. The [Contributor Covenant](https://www.contributor-covenant.org/) is an industry standard, but you can always write your own if you'd prefer.

## Tests

Go the extra mile and write tests for your application. Then provide examples on how to run them here.
`;
    // Indentation is important, the md will not render properly if you have indents as indents have a specific formatting meaning and will not be ignored

    writeToFile(answers.projectName, data, { encoding: "utf8" });
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });

// TODO: Create an array of questions for user input
const questions = [];

// TODO: Create a function to write README file
function writeToFile(fileName, data, options) {
  fs.writeFile(`${fileName}.md`, data, options, (err) => {
    if (err) {
      console.error(err);
    }
    //console.error(err)
  });
}

// TODO: Create a function to initialize app
function init() {}

// Function call to initialize app
init();

// blank
// illegal characters
