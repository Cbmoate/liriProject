//declaring variables/bringing in npms
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
      spotifyThisSong();
      break;
    default:
      console.log("Invalid command.");
      break;
  }
}

//grabs the last 20 tweets and displays/logs them
function myTweets(){
  client.get('statuses/user_timeline', function(error, tweets, response){
    console.log(error);
    if(error) {
      console.log(error);
      throw error;
    }
    console.log("My last 20 tweets:")
    for (i = 0; i < 20; i++){
      console.log(i+1 + ". On " + tweets[i].created_at + " I Tweeted: " + tweets[i].text);
      fs.appendFile("log.txt", i+1 + ". On " + tweets[i].created_at + " I Tweeted: " + tweets[i].text + "\n", function(err){
      })
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
  }else{
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


liri(params)