
const getAnswer = require("./getAnswer");
async function processAllQuestions() {
    const arrayOfQuestions = await getAnswer.getQuestions();
    for (const question of arrayOfQuestions) {
        console.log(question);
        if (question !== "") {
            let request = getAnswer.createRequest(question);
            await getAnswer.writeAnswerAndQuestionToCSV(request, question);
        }
    } 
    console.log("Congrats! All done!");  
}
getAnswer.createCSV(); // every new run creats new file with results
processAllQuestions();

