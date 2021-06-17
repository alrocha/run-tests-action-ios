const core = require('@actions/core');
const shell = require('shelljs');

function run() {
    try {
        const environmentsString = core.getInput('environment');
        const environments = environmentsString.split('-');
        const xcode_dir = core.getInput('developer_dir');

        shell.env["DEVELOPER_DIR"] = xcode_dir;
        shell.exec("sudo systemsetup -settimezone 'Europe/Stockholm'");
        environments.forEach(environment => test(environment));
        
    } catch (error) {
        core.setFailed(error.message);
    }
}

function test(environment) {
    fastlaneTestResult = shell.exec("fastlane run_tests env:" + environment);
    if (fastlaneTestResult.code !== 0) {
        setFailed(new Error(`Fastlane Tests Failed`));
    }
}

function setFailed(error) {
    core.error(error);
    core.setFailed(error.message);
}
run()