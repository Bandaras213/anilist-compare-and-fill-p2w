Create Client
=============

Go to "https://anilist.co/settings/developer" and Login if not already loged in. Then create a new Client.

Choose a Name and a RedirectURL that you can use. (If you want to use it for 1 user just create a glitch.com node.app get the Show URL and put a /callback on it)


Get Auth Code
==============

After that fill in the id and the url in the link below.

https://anilist.co/api/v2/oauth/authorize?client_id={client_id}&redirect_uri={redirect_uri}&response_type=code

to

https://anilist.co/api/v2/oauth/authorize?client_id=123456789&redirect_uri=showglitch.com/callback&response_type=code

After you visit the site Authorize the App. Then you get redirected to the URL with a code= attachment. (You have to Copy from the Browser search bar.)

Use Code= "String" to get Token
===============================

Take that Code attachment and fill it into the command/gettoken.js.

It should look something like this then.

    'client_id': '123456789',
    'client_secret': '123456789123456789123456789123456789',
    'redirect_uri': 'showglitch.com/callback',
    'code': '123456789abcdefgh123456789abcdefgh123456789abcdefgh123456789abcdefgh123456789abcdefgh123456789abcdefgh123456789abcdefgh'
    
    (The Code can and will expire fast so you should not get a Code and then do something else. If you get a Code Expired Error get a New one from above.)

After you filled everything with the right Values run the command with:

#### node command/gettoken.js

Now you should get a long string THAT is the Auth token to make Secure calls to the API. (Copy the String to a txt file and check if it has MADE_WITH= on the end and remove it.)

Use the Auth Token
==================

Now add the New Code to addanimes.js at:

let token = "longstringofthings";

or add it at a secure location and link it or use dotenv with a .env file.

Try to get Lists
================

After that you can run the command/getlists.js.

The Command is:

#### node command/getlists.js List1 List2

List1 is the Username of the List you want to check.
List2 is youre own List.

Check the cached/uniqueids.js file if it has the ids from List1. (If its empty run a refresh for the console or the file. | If you want to check that the ids are the right ones take a Id and go to "https://anilist.co/anime/{Id}" to check if the Anime is not in youre List.)

Try to add Animes with Token
============================

You can then start command/addanimes.js with:

#### node command/addanimes.js

If everything is going like it should you should get a Console log like this:

Output saved to cached/uniqueids.js.
"{\"data\":{\"SaveMediaListEntry\":{\"mediaId\":ID,\"status\":\"PLANNING\",\"media\":{\"title\":{\"romaji\":"}}}}}"

If not read the Error that it gives you.