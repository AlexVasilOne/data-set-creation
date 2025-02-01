const fs = require("fs"),
 path = require("path"),
 { promisify } = require("util"),
 writeFileAsync = promisify(fs.writeFile), 
 appendFileAsync = promisify(fs.appendFile),
 readFileAsync = promisify(fs.readFile),
 folderPath = "../data";
 
async function getQuestions() {
  const filePath = path.join(folderPath, "questions.csv");
  let answers = "";
  try {
    answers = await readFileAsync(filePath, "utf-8");
  } catch (error) {
    console.log("Error during file reading: ");
    console.error(error.message);
  }
  const resultAnswers = answers.split("\n");
  return resultAnswers;
}


function createRequest(question) {
  const url = "http://aist.lab.epam.com:3000/api/chat";
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Connection", "keep-alive");
  headers.append("Cache-Control", "no-cache");
  headers.append("accept-encoding", "gzip, deflate, br, zstd");
  reqBody = {
    debugModeEnabled: true,
    userMessage: question,
  };
  const request = new 
  Request(url, {
    method: "POST",
    body: JSON.stringify(reqBody),
    headers: headers
  })
  return request;
}

async function getAnswerAPI(request) {
  try {
    const response = await fetch(request);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const bodyJson = await response.json();
    console.log("Valid response received");
    return bodyJson.intakes;
  } catch (error) {
    console.log("API request failed");
    console.error(error.message);
  }
}

async function createCSV() {
  const filePath = path.join(folderPath, "results.csv");
  const csvHeaders = "question,context,answer,ground truth\r\n";
  try {
    await writeFileAsync(filePath, csvHeaders); 
    return filePath; 
  } catch (error) {
    console.log("Error occurred while replacing or creating results file");
    console.error(error.message);
  }
}

function parseOutput (str) {
    const regex = /\\r\\n|\\n|,|"/g; 
    return str.replace(regex, ""); 
}

async function writeAnswerAndQuestionToCSV(request, question) {
  const filePath = path.join(folderPath, "results.csv");
  const data = await getAnswerAPI(request);
  if (data !== undefined) {
  for (const element of data) {
      var elString = JSON.stringify(element).toString();
      var dataString = JSON.stringify(data).toString();
      try {
        await appendFileAsync(
          filePath,
          `"${parseOutput(question)}","${parseOutput(dataString)}","${parseOutput(elString)}","mock"\r\n`
        );
      } catch (error) {
        console.log(`Error during writing ${element}`);
        console.error(error.message);
      }
    }
    console.log(`${question} added to the file succesfully`);
  }
  else console.log("intakes is undefined");
}

module.exports = {
  parseOutput,
  createRequest,
  createCSV,
  getQuestions,
  writeAnswerAndQuestionToCSV,
};
