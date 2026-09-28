const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");

const { initRepo } = require("./controller/init");
const { addRepo } = require("./controller/add");
const { commitRepo } = require("./controller/commit");
const { pushRepo } = require("./controller/push");
const { pullRepo } = require("./controller/pull");
const { revertRepo } = require("./controller/revert");

yargs(hideBin(process.argv))
    .command("init","Initialise a new reposetory",{},initRepo)
    .command("add <file>","Add a file to the reposetory",(yargs) => {
        yargs.positional("file", {
            describe: "File to add to the string area",
            type: "string",
        });
    },addRepo)
    .command("commit <message>","Commit the staged files",(yargs) => {
        yargs.positional("message", {
            describe: "Commit message",
            type: "string",
        });
    },commitRepo)
    .command("push", "Push commits to S3", {}, pushRepo)
    .command("pull", "Pull commits to S3", {}, pullRepo)
    .command("revert <commitID>","Revert to a specific commit",(yargs) => {
        yargs.positional("commitID", {
            describe: "Comit ID to revert to",
            type: "string",
        });
    },revertRepo)
    .demandCommand(1, "You need atleast one command")
    .help().argv;