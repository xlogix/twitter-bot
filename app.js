var Twitter = require('twitter');
var config = require('./config.js');
var T = new Twitter(config);

// Set up your search parameters
var params = {
  q: '@fnplusofficial',
  count: 1,
  result_type: 'recent',
  lang: 'en'
}

//set up tweet time interval in milliseconds
var INTERVAL = 1*60*1000;

//set up array of tweets that can be randomly selected
var TWEETS_TO_REPLY = [
    "This is my first tweet to you guys!",
    "This is another",
    "This might be third."
];

function BotStart() {
// Initiate your search using the above paramaters
T.get('search/tweets', params, function(err, data, response) {
  // If there is no error, proceed
  if(!err){
    // Loop through the returned tweets
    for(let i = 0; i < data.statuses.length; i++){
      
      //Do not retweet Own user --> replace your username
      if (data.statuses[i].user.screen_name != 'someUserName')
      {
          // Try to Favorite the selected Tweet
          T.post('statuses/update', { in_reply_to_status_id: data.statuses[0].id_str, status: '@' + data.statuses[0].user.screen_name + TWEETS_TO_REPLY[Math.floor(Math.random()*TWEETS_TO_REPLY.length)] }, function(err, response){
            // If the favorite fails, log the error message
            if(err){
              console.log(err[0].message);
            }
            // If the favorite is successful, log the url of the tweet
            else{
              let username = response.user.screen_name;
              let tweetId = response.id_str;
              //log results to the console
              console.log('Tweeted: ', `https://twitter.com/${username}/status/${tweetId}`)
              console.log(data.statuses[i])
            }
          });
      }
    }
  } else {
    console.log(err);
  }
})
}

// Start bot and timer
BotStart();
setInterval(BotStart, INTERVAL);
