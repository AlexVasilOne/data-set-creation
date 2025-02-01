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
## Scenario 2: using node.js + postman
