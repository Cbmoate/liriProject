//declaring variables
var fs = require("fs");
var keys = require("./keys.js");

//uses a swicth case to make functions run
function runProgram(params){
  switch(params[0]){
    case "do-what-it-says":
      doWhatItSays();
      break;
    case "my-tweets":
      myTweets();
      break;
    case "movie-this":
      movieThis();
      break;
    case "spotify-this-song":
      spotifyThisSong();
      break;
    default:
      console.log("Invalid command.");
      break;
  }
}