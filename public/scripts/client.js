
$(document).ready(function() {
  console.log("Document is ready!");


  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };


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
      <p>${escape(tweet.content.text)}</p>
    </div>
    </header>

    <footer>
      <p>${timeago.format(tweet.created_at)}</p>
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
      $('#tweets-container').prepend($tweet);
    }
  };


  $(".formTweet").submit(function(event) {

    event.preventDefault();

    if ($(`#tweet-text`).val() === "" || $(`#tweet-text`).val() === null) {
      return $(`.error`).text('⚠️ Please add text. Cannot post an empty Tweet. ⚠️').slideDown();
    }
    if ($(`#tweet-text`).val().length > 140) {
      return $(`.error`).text('⚠️ Tweet is too long. Maximum 140 characters allowed. ⚠️').slideDown();
    }

    $(`.error`).slideUp();

    let data = $( this ).serialize();

    $.ajax({ url: '/tweets', method: 'POST', data })
      .then(function() {
        console.log('Success: ', data);
        $('#tweet-text').val('');
        $('.counter').text('140');
        loadTweets();
      });
  });


  const loadTweets = function() {

    $.ajax({ url: '/tweets', method: 'GET', dataType: "json" })
      .then(function(data) {
        $('#tweets-container').empty();
        renderTweets(data);
      });
  };

  loadTweets();

});