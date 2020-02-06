const core = require('@actions/core');
const fs = require("fs");
const YAML = require('yaml')

try {
    const bodyFormat = core.getInput('format', { required: true });

    console.log("Load event file: " + process.env.GITHUB_EVENT_PATH);
    var eventContent = fs.readFileSync(process.env.GITHUB_EVENT_PATH);
    var eventJsonContent = JSON.parse(eventContent);
    var issueContent;

    if (bodyFormat === "json") {
        issueContent = JSON.parse(eventJsonContent.issue.body);
    } else if (bodyFormat === "yaml") {
        issueContent = YAML.parse(eventJsonContent.issue.body);
    } else {
        throw Error(`Unreconize format, input: "${bodyFormat}"`)
    }

    for (var key in issueContent) {
        if (!issueContent[key]) {
            console.log("Skip export variable: " + key);
            continue
        }
        core.debug("Variable length " + key + ":" + issueContent[key].length);
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
