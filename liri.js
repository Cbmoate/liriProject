//declaring variables/bringing in npms
var params = process.argv.slice(2);
var keys = require("./keys.js");
var twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');

//grabbing all the twitter keys 
var client = new Twitter({
  consumer_key: keys.twitterKeys.consumer_key,
  consumer_secret: keys.twitterKeys.consumer_secret,
  access_token_key: keys.twitterKeys.access_token_key,
  access_token_secret: keys.twitterKeys.access_token_secret 
});


//uses a swicth case to make functions run
function liri(params){
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