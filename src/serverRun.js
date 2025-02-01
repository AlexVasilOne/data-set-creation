const express = require('express'),
  getAnswer = require("./getAnswer"),
  app = express(),
  fs = require('fs'),
  bodyParser = require('body-parser');
  
getAnswer.createCSV().then((filePath) => {
    app.use(bodyParser.json({limit: '10mb', extended: true}));
    app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
    app.get('/', (req, res) => res.send('Hello, I write data to file. Send me requests!'));
    app.post('/write', (req, res) => {
        var mode = req.body.mode;
        var question = req.body.question.toString();
        var answerRaw = req.body.answer;
        var options = req.body.options;
        var answer = JSON.stringify(answerRaw)
        const csvData = `"${getAnswer.parseOutput(question)}","","${getAnswer.parseOutput(answer)}",""\r\n`;
        fs.appendFile(filePath, csvData, options, (writeErr) => {
            if (writeErr) {
            console.error(writeErr);
            res.status(500).send('Error appending data to file');
            return;
            }
        res.send('Data appended successfully');
      });
  });
   
    app.listen(3000, () => {
        console.log('ResponsesToFile App is listening now! Send them requests my way!');
        console.log(`Data is being stored at location:`);
  });
});

