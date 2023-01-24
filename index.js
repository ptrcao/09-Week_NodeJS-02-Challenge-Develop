// const fs = require('fs');
import * as fs from "fs";
// const fetch = require('node-fetch');
import fetch from "node-fetch";

// const inquirer = require('inquirer');
import inquirer from "inquirer";

// How can I validate that a user input their email when using Inquirer npm?
// https://stackoverflow.com/a/65190730/9095603
import * as EmailValidator from "email-validator";

// var block1answers, block2answers, block3answers;
var ghUsername;
var ghRepoName;
var answersA;
var answersB;
var email;

var emailValidate = (email) => {
  if (EmailValidator.validate(email)) {
    email = email;
    return true;
  } else {
    return "Invalid email format - please try again to enter a valid email address.";
  }
};

// prompt user for gh name, check and retry if user name is invalid
async function promptAndValidateGHUser(message) {
  const answer = await inquirer.prompt([
    { type: "input", name: "ghuser", message },
  ]);

  const response = await fetch(`https://api.github.com/users/${answer.ghuser}`);
  // console.log(response);
  const data = await response.json();
  // console.log(data);

  if (data.message) {
    if (data.message === "Not Found") {
      return promptAndValidateGHUser(
        "User was not found, please use a valid username."
      );
    }
  }
  // else {
  ghUsername = answer.ghuser;
  //   console.log('GitHub username: ' + ghUsername)
  return true;
  // }
}

// prompt user for gh repo name, check and retry if repo name is invalid
async function promptAndValidateGHRepo(message) {
  const answer = await inquirer.prompt([
    { type: "input", name: "ghRepo", message },
  ]);

  //test
  // console.log('GitHub username: ' + ghUsername)
  // console.log(`Repo URL: https://api.github.com/repos/${ghUsername}/${answer.ghRepo}`)
  const response = await fetch(
    `https://api.github.com/repos/${ghUsername}/${answer.ghRepo}`
  );
  // console.log(response);
  const data = await response.json();
  // console.log(data.message);

  if (data.message) {
    if (data.message === "Not Found") {
      return promptAndValidateGHRepo(
        "Repository was not found, please provide a valid, existing repository name."
      );
    }
  }
  // else {
  ghRepoName = answer.ghRepo;
  return true;
  // }
}

const listA = [
  {
    name: "projectName",
    message: "What the project name?",
    type: "input",
  },
  {
    name: "devName",
    message: "What is the developer's name? (e.g. Jane Doe)",
    type: "input",
  },
  {
    type: "input",
    message: "What is your email address?",
    name: "email",
    validate: emailValidate,
    // true
  },
  // ...
  // up to, but not including the github question
];

const ghMessage = "What is your GitHub username?";

const ghMessage2 = "What is the GitHub repository name?";

const listB = [
  // the rest of the qustions
  {
    type: "input",
    name: "projectDesc",
    message: "Please provide a project description.",
  },
  {
    type: "input",
    name: "installInstructions",
    message: "Please provide installation instructions.",
  },
  {
    type: "input",
    name: "usage",
    message:
      "Please provide usage instructions.  We recommend inserting screenshots manually later.",
  },
  {
    type: "input",
    name: "tests",
    message: "Please provide testing instructions.",
  },
  {
    type: "input",
    name: "contributions",
    message: "Please provide your call to contributions here.",
  },
  {
    type: "list",
    name: "license",
    message: "What type of license applies to your project?",
    choices: [
      "MIT",
      "Apache",
      "GPL",
      new inquirer.Separator(),
      "No license",
      "Other",
    ],
  },
  {
    type: "input",
    name: "licenseOther",
    message:
      'Please specify the "Other" type of license pertains to this project?',
    when: (answersB) => answersB.license === "Other",
  },
  // ...
];

// TODO: Create a function to write README file
function writeToFile(fileName, data, options) {
  fs.writeFile(`${fileName}.md`, data, options, (err) => {
    if (err) {
      console.error(err);
    }
    //console.error(err)
  });
}

function generateText() {
  const data = `
# ${answersA.projectName}

![license](https://img.shields.io/static/v1?label=license&message=${license().replace(
    / /g,
    "_"
  )}&color=blue&style=for-the-badge&logo=appveyor)

> Repository URL: https://api.github.com/repos/${ghUsername}/${ghRepoName}

## Table of Contents

- [Project Description](#project-description)
- [Installation](#installation)
- [Usage](#usage)
- [Contributions](#contributions)
- [Tests](#tests)
- [Credits](#credits)
- [License](#license)
- [Questions](#questions)

## Project Description
${answersB.projectDesc}

## Installation
${answersB.installInstructions}

## Usage
${answersB.usage}

## Tests
${answersB.tests}

## Contributions
${answersB.contributions}

## Credits
- ${answersA.devName}

## License
${license()}

## Questions
How to reach me?

Email: ${answersA.email}

GitHub username: ${ghUsername}

GitHub link: https://api.github.com/users/${ghUsername}
`;

  // Indentation is important, the md will not render properly if you have indents as indents have a specific formatting meaning and will not be ignored

  writeToFile(answersA.projectName, data, { encoding: "utf8" });
}

function license() {
  if (answersB.license === "Other") {
    return answersB.licenseOther;
  } else {
    return answersB.license;
  }
}

async function prompts() {
  answersA = await inquirer.prompt(listA);
  // const gHubAnswer1 = await promptAndValidateGHUser(ghMessage);
  await promptAndValidateGHUser(ghMessage);
  console.log("GitHub username: " + ghUsername);
  // const gHubAnswer2 = await promptAndValidateGHRepo(ghMessage2);
  await promptAndValidateGHRepo(ghMessage2);
  console.log(
    `Repo URL: https://api.github.com/repos/${ghUsername}/${ghRepoName}`
  );
  answersB = await inquirer.prompt(listB);
  generateText();
}

prompts();