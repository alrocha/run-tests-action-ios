const core = require('@actions/core');
const shell = require('shelljs');

function run() {
    try {
        const environmentsString = core.getInput('environment');
        const environments = environmentsString.split('-');
        const xcode_dir = core.getInput('developer_dir');
        shell.exec("bundle install");
        shell.env["DEVELOPER_DIR"] = xcode_dir;
        shell.exec("sudo systemsetup -settimezone 'Europe/Stockholm'");
        environments.forEach(environment => test(environment));
        
    } catch (error) {
        core.setFailed(error.message);
    }
}

function test(environment) {
    // fastlaneTestResult = shell.exec("fastlane run_tests env:" + environment);
    // var previousTag = shell.exec("git tag --sort=-creatordate | grep 'builds/' | head -30 | sed -n 30p");
    // var gitTag = shell.exec ("git tag --sort=-creatordate | grep 'builds/' | head -34 | sed -n 34p");
    // shell.exec(`git fetch origin tag ${gitTag}`);
    // shell.exec(`git fetch origin tag ${previousTag}`);
    fastlaneTestResult = shell.exec("fastlane post_slack_release_notes");
    if (fastlaneTestResult.code !== 0) {
        setFailed(new Error(`Fastlane Tests Failed`));
    }
}

function setFailed(error) {
    core.error(error);
    core.setFailed(error.message);
}
run()