const request = require("request");
const datalist = require("../data/addanime.js");
const fs = require("fs");
let variables;
let token = "{youretoken}"; //The Code you get from gettoken.js. (Remove {})
let counter = 20; //The Number of Animes that should be added. (Don´t go over 90 per Minute)
let values;

fs.readFile("./cached/uniqueids.js", function(err, data) {
  if (err) {
    console.log(err);
  }

  values = JSON.parse(data);
  
  if (isNaN(process.argv[2]) == true) {
    if (values.length < counter) {
    counter = values.length;
  }
  } else {
    if (values.length < process.argv[2]) {
    counter = values.length;
  } else {
    counter = process.argv[2];
  }
  }



  for (let b = 0; b < counter; b++) {
    variables = {
      mediaId: values[b]
    };

    let databody = {
      query: datalist,
      variables: variables
    };

    var options = {
      uri: "https://graphql.anilist.co",
      method: "POST",
      body: JSON.stringify(databody),
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    };

    request(options, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log(JSON.stringify(body, 0, 2));
      } else {
        console.log(JSON.stringify(body, 0, 2));
        console.log("There was an Error. Please read the Log above.");
      }
    });
  }
  fs.writeFile(
    "./cached/uniqueids.js",
    JSON.stringify(values.splice(counter)),
    function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log("Output saved to cached/uniqueids.js.");
      }
    }
  );
});
