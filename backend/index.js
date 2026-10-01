require("dotenv").config();

const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");

const { initRepo } = require("./controller/init");
const { addRepo } = require("./controller/add");
const { commitRepo } = require("./controller/commit");
const { pushRepo } = require("./controller/push");
const { pullRepo } = require("./controller/pull");
const { revertRepo } = require("./controller/revert");

yargs(hideBin(process.argv))
    .command("start","Starts a new server",{},startserver)
    .command("init","Initialise a new reposetory",{},initRepo)
    .command("add <file>","Add a file to the reposetory",(yargs) => {
        yargs.positional("file", {
            describe: "File to add to the string area",
            type: "string",
        });
    },
    (argv) => {
        addRepo(argv.file);
    })
    .command("commit <message>","Commit the staged files",(yargs) => {
        yargs.positional("message", {
            describe: "Commit message",
            type: "string",
        });
    },
    (argv) => {
        commitRepo(argv.message);
    })
    .command("push", "Push commits to S3", {}, pushRepo)
    .command("pull", "Pull commits to S3", {}, pullRepo)
    .command("revert <commitID>","Revert to a specific commit",(yargs) => {
        yargs.positional("commitID", {
            describe: "Comit ID to revert to",
            type: "string",
        });
    },(argv) => {
        revertRepo(argv.commitID);
    })
    .demandCommand(1, "You need atleast one command")
    .help().argv;

    function startserver() {
        console.log("Server logic called");
    }