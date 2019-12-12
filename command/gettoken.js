var request = require("request");

var options = {
  uri: "https://anilist.co/api/v2/oauth/token",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  },
  json: {
    grant_type: "authorization_code",
    client_id: "{client_id}", //The Id from the Api v2 client. (Without the {})
    client_secret: "{client_secret}", //The Secret from the Api v2 client. (Without the {})
    redirect_uri: "{redirect_uri}", //Can be any uri that you can use. (Without the {})
    code: "{code}" //The Code you get from the Redirecting Autorization. For more info read the readme. (Without the {})
  }
};

request(options, function(error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body.access_token);
  } else {
    console.log(body);
  }
});
