require('dotenv').config();
const { execSync } = require('child_process')

const { run_discord } = require('./discord')
const { commitNameChecker } = require('./commit-name')

const GITHUB_COMMIT_NAME = process.env.GITHUB_COMMIT_NAME

const console_run = async () => {
    const commitName = commitNameChecker(GITHUB_COMMIT_NAME);

    try {
        execSync(`git add .`)
        execSync(`git commit -m "${commitName}"`)
        execSync(`git push`)

        run_discord(true)

    } catch (error) {
        console.log(error.message);
        run_discord(false)
    }
}

console_run()
