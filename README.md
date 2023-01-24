
# README

## Description
    
The project provides a README generator which presents the user with a Inquirer.js-driven survey, from which the responses will be used to automatically generate a README file that conforms to an industry format.

Going beyond the acceptance criteria, the Inquirer.js survey makes use of the package-native WHEN function to determine if the conditional last question should be shown.  It also features email validation, that makes use of the npm package `email-validator`.  It further includes custom validation, based on a fetch, to check that the GitHub username and repo provided by the user exists, and prompts them to re-try if it does not.

## Video DEMO

Please see my unlisted YouTube demo video via this link: https://youtu.be/nTjSxj1txNU