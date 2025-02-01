# **Main purpose**
Script serves for test data creation. This test data is used as data for calculation RAGAS and DeepEval metrics. The main purpose is to 
take beforehand prepared questions to LLM chat application as an input and then create output file wich filled with answers and context columns.
Using RAGAS and DeepEval metrics we can tests the quality of LLM model. Every question in input file is considered as a seperate test case. 
# **Input**
Input file should be located in project-root/data/ folder and has .csv extention. Example of content: <br>
<br>
Give me CV of Java developer with stack ... /n <br>
Give me CV of QA automation engineer ... /n <br>
Give me CV of Bysness analyst ... /n <br>
<br>
Each new line is a new question (test case).
# **Scenarios of usage**
## Scenario 1: using node.js
This scenario is created for testers who knows how to code in js. In that case user can change 
response parsing logic directly in the sourse code to adapt this script for his/her LLM application. 
```python
node main.js
```
Then you will find results in data/results.csv file

## Scenario 2: using node.js + postman
This scenario is created for testers who are used working in postman.
To write a results on local machine user will have to run (unfortunately postman doesn't have ability to write data to disk directly)
local server using this command: 
```python
node serverRun.js
```
After that, user will be able to send write request to local server using the following steps. 
1. Create POST request for your LLM chat app like this:<br>
   POST http://*****:3000/api/chat <br>
   ```javascript
   body
   {
    "debugModeEnabled": true,
    "userMessage": "{{questions}}"
   }
   ```
   User can run collection where {{questions}} will be taken from csv file
2. Parse response on the "script" tab and send it to your local server like that:
   ```javascript
   pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
   });
   pm.test("Each intake in the intakes array has a non-empty name", function () {
        pm.response.json().intakes.forEach(function(intake) {
            setTimeout(() => {
                pm.sendRequest({
                    url: 'http://localhost:3000/write',
                    method: 'POST',
                    header: 'Content-Type:application/json',
                    encoding: 'binary',
                    body: {
                        mode: 'raw',
                        raw: JSON.stringify({
                            mode: 'appendFile',
                            question: JSON.parse(pm.request.body.raw).userMessage,
                            answer: intake,
                            options: {
                                encoding: 'binary'
                            }
                        })
                    }
                }, function (err, res) {
                    console.log(res);
                });
            }, 500);
        });
   });
   ```
3. Find a results in your data folder. 
