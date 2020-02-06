const core = require('@actions/core');
const fs = require("fs");

try {
    console.log("Load event file: " + process.env.GITHUB_EVENT_PATH);
    var eventContent = fs.readFileSync(process.env.GITHUB_EVENT_PATH);
    var eventJsonContent = JSON.parse(eventContent);
    var issueContent = JSON.parse(eventJsonContent.issue.body);
    for (var key in issueContent) {
        if (issueContent[key].length > 0) {
            console.log("Export variable: " + key + "=" + issueContent[key]);
            core.exportVariable(key, issueContent[key])
        } else {
            console.log("Skip export variable: " + key);
            continue
        }
    }
} catch (error) {
    core.setFailed(error.message);
}
