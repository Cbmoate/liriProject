//declaring variables/bringing in npms
var fs = require('fs')
var params = process.argv.slice(2);
var keys = require("./keys.js");
var Twitter = require('twitter');
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
      spotifySong();
      break;
    default:
      console.log("Invalid command.");
      break;
  }
} 

//grabs the last 20 tweets and displays/logs them
function myTweets(){
  var sName = {screen_name: 'CBmoate'}
  client.get('statuses/user_timeline', sName, function(error, tweet, response){
    if(error) throw error;
    for (var i = 0; i < 20; i++) {
      console.log(tweet[i].text);
      fs.appendFile("log.txt", "\n" + tweet[i].text + "\n");
      console.log("Tweeted on: " + tweet[i].created_at + "\n");
      fs.appendFile("log.txt", "Tweeted on: " + tweet[i].created_at + "\n")
    }
  });
}

//pulls movie info from OMDB and displays, then logs them
function movieThis(){
  if (params[1] === undefined){
    request("http://www.omdbapi.com/?t=Mr+Nobody&y=&plot=short&r=json&tomatoes=true", function (error, response, body) {
      if (!error && response.statusCode == 200) {
        movieInfo = "Title: " + JSON.parse(body).Title + "\n" + "Year: " + JSON.parse(body).Year + "\n" + "IMDB rating: " + JSON.parse(body).imdbRating + "\n" + "Country: " + JSON.parse(body).Country + "\n" + "Language: " + JSON.parse(body).Language + "\n" + "Plot: " + JSON.parse(body).Plot + "\n"+ "Actors: " + JSON.parse(body).Actors + "\n" + "Rotten Tomatoes Rating:" + JSON.parse(body).tomatoRating + "\n" + "Rotten Tomatoes URL:" + JSON.parse(body).tomatoURL +"\n";
        console.log(movieInfo);
        fs.appendFile("log.txt", movieInfo, function(err){
        })
      }
    })
  }
  else{
    request("http://www.omdbapi.com/?t=" + params[1] + "&y=&plot=short&r=json&tomatoes=true", function (error, response, body) {
      if (!error && response.statusCode == 200) {
        movieInfo = "Title: " + JSON.parse(body).Title + "\n" + "Year: " + JSON.parse(body).Year + "\n" + "IMDB rating: " + JSON.parse(body).imdbRating + "\n" + "Country: " + JSON.parse(body).Country + "\n" + "Language: " + JSON.parse(body).Language + "\n" + "Plot: " + JSON.parse(body).Plot + "\n"+ "Actors: " + JSON.parse(body).Actors + "\n" + "Rotten Tomatoes Rating:" + JSON.parse(body).tomatoRating + "\n" + "Rotten Tomatoes URL:" + JSON.parse(body).tomatoURL +"\n";
        console.log(movieInfo);
        fs.appendFile("log.txt", movieInfo, function(err){
        })
      }
    })
  }
}

//grab spotify info
function spotifySong(){
  if (params[1] === undefined){
    spotify.search({type: "track", query: "What's My Age Again?" }, function(err, data) {
      if ( err ) {
        console.log("Error occurred: " + err);
        return;
      }
      else{
        spotifyInfo = "Artist: " + data.tracks.items[0].artists[0].name + "\n" + "Song Name: " + data.tracks.items[0].name + "\n" + "Listen on Spotify: " + data.tracks.items[0].artists[0].external_urls.spotify +"\n" + "Album: " + data.tracks.items[0].album.name;
        console.log(spotifyInfo)
        fs.appendFile("log.txt", spotifyInfo, function(err){

        })
      }
    })
  }
  else{
    spotify.search({type: "track", query: params[1] }, function(err, data) {
      if ( err ) {
        console.log("Error occurred: " + err);
        return;
      }
      else{
        spotifyInfo = "Artist: " + data.tracks.items[0].artists[0].name + "\n" + "Song Name: " + data.tracks.items[0].name + "\n" + "Listen on Spotify: " + data.tracks.items[0].artists[0].external_urls.spotify +"\n" + "Album: " + data.tracks.items[0].album.name + "\n";
        console.log(spotifyInfo)
        fs.appendFile("log.txt", spotifyInfo, function(err){
        })
      }
    });
  }
}

//passes params into the program and runs it
liri(params)