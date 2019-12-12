const fetch = require("node-fetch");
const datalist = require("../data/querylist.js");
const staff = require("../data/staff.js");
const fs = require("fs");
let variables1;
let variables2;
let array1 = [];
let array2 = [];
let check = false;

function namecheck() {
    if (process.argv[4] == undefined) {
        return console.log("Please use First and Last name in the Command like this (node command anilistusername Firstname Lastname")
    } else {
        check = true
    }
}
namecheck()

if (check == true) {
    let user1 = process.argv[2];
    let staff1 = process.argv[3] + " " + process.argv[4];

    (async () => {
        variables1 = {
            userName: user1,
            type: "ANIME"
        };

        variables2 = {
            search: staff1
        };

        await datalist;

        let databody = {
            query: datalist,
            variables: variables1
        };
        await fetch("https://graphql.anilist.co", {
                method: "post",
                body: JSON.stringify(databody),
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                }
            })
            .then(fetch1 => fetch1.json())
            .then(async fetch1 => {
                for (let b = 0; b < fetch1.data.MediaListCollection.lists.length; b++) {
                    for (
                        let a = 0; a < fetch1.data.MediaListCollection.lists[b].entries.length; a++) {
                        array1.push(
                            fetch1.data.MediaListCollection.lists[b].entries[a].mediaId
                        );
                    }
                }
            });

        let databody2 = {
            query: staff,
            variables: variables2
        };
        await fetch("https://graphql.anilist.co", {
                method: "post",
                body: JSON.stringify(databody2),
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                }
            })
            .then(fetch2 => fetch2.json())
            .then(async fetch2 => {

                for (let bb = 0; bb < fetch2.data.Staff.characters.edges.length; bb++) {
                    for (let aa = 0; aa < fetch2.data.Staff.characters.edges[bb].media.length; aa++) {
                        array2.push(fetch2.data.Staff.characters.edges[bb].media[aa].id);
                    }
                }
            });

        var array3 = array2.filter(function (obj) {
            return array1.indexOf(obj) == -1;
        });

        fs.writeFile("./cached/uniqueids.js", JSON.stringify(array3), function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log("Saved " + array3.length + " IDs to /cached/uniqueids.js.");
            }
        });
    })();
};