const core = require('@actions/core');
const fs = require("fs");

try {
    console.log("Load event file: "+process.env.GITHUB_EVENT_PATH);
    var eventContent = fs.readFileSync(process.env.GITHUB_EVENT_PATH);
    var eventJsonContent = JSON.parse(eventContent);
    var issueContent = JSON.parse(eventJsonContent.issue.body);
    for(var key in issueContent) {
        console.log("Export variable: "+key+"=" + issueContent[key]);
        core.exportVariable(key, issueContent[key])
    }
} catch (error) {
    core.setFailed(error.message);
}
