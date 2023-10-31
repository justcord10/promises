/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var pluckFirstLine = require('./promiseConstructor').pluckFirstLineFromFileAsync;
var getGithubProfile = require('./promisification').getGitHubProfileAsync;

var writeFile = Promise.promisify(fs.writeFile);

var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  return pluckFirstLine(readFilePath)
    .then((firstLine) => {
      return getGithubProfile(firstLine);
    })
    .then((profile) => {
      profile = JSON.stringify(profile);
      return writeFile(writeFilePath, profile);
    })
    .catch((err) => {
      throw (err);
    });
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};




// var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
//   return pluckFirstLine(readFilePath).then((firstLine) => {
//     getGithubProfile(firstLine).then((profile) => {
//       profile = JSON.stringify(profile);
//       console.log(profile);
//       fs.writeFile(writeFilePath, profile, (err) => {
//         if (err) {
//           throw err;
//         }
//       });
//     }).catch((err) => {
//       throw (err);
//     });
//   });
// };