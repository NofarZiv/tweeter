/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
$(document).ready(function () {
  console.log("Document is ready!");


  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]


const createTweetElement = function(tweet) {
  let $tweet = $(`      
  
  <article class="tweet">
    <header>
      <span class="user">
      <div class="image">
        <img src=${tweet.user.avatars}>
        <p class="name">${tweet.user.name}</p>
    </div>
      <p class="at">${tweet.user.handle}</p>
    </span>
    <div class="mainT">
      <p>${tweet.content.text}</p>
    </div>
    </header>

    <footer>
      <p>${tweet.created_at}</p>
     <div class="icons">
      <i class="fa-solid fa-flag"></i>
      <i class="fa-solid fa-retweet"></i>
      <i class="fa-solid fa-heart"></i>
    </div>
    </footer>
  </article>
  `);
   return $tweet;

};

const renderTweets = function(tweets) {
  for (let userObj of tweets) {
    let $tweet = createTweetElement(userObj);
    $('#tweets-container').append($tweet);
  }
}


renderTweets(data);

$(".formTweet").submit(function(event) {
  event.preventDefault();
  let data = $( this ).serialize();

  $.ajax({ url: '/tweets', method: 'POST', data })
    .then(function () {
      console.log('Success: ', data);
      
    });

});

});