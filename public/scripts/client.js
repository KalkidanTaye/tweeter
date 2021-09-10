/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const tweetData = [
  {
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@SirIsaac",
    },
    content: {
      text: "If I have seen further it is by standing on the shoulders of giants",
    },
    created_at: 1461116232227,
  },
  {
    user: {
      name: "Descartes",
      avatars: "https://i.imgur.com/nlhLi3I.png",
      handle: "@rd",
    },
    content: {
      text: "Je pense , donc je suis",
    },
    created_at: 1461113959088,
  },
];

//------------- Create Tweet Function ----------------------

const createTweetElement = function (data) {
  const item = ` <div id="inner-tweets-container">
                    <div id="tweeter-profile">
                        <img class= "avatar" src = "${data.user.avatars}">
                        <label class="tweeter-name">${data.user.name}</label>
                        <label class="tweeter-username">${
                          data.user.handle
                        }</label>
                    </div>
                    <div class="display-tweet">
                        <article class="tweet-text">${
                          data.content.text
                        }</article>
                        <hr />
                    </div>
                    <div id="tweet-footer">
                        <label id="tweet-day">${timeago.format(
                          data.created_at
                        )}</label>
                        <div class="tweet-icons">
                            <i class="fas fa-flag"></i>
                            <i class="fas fa-retweet"></i>
                            <i class="fas fa-heart"></i>
                        </div>
                    </div>
        
                </div>`;
  return [item];
};

//------------- Render Tweet Function ----------------------

const renderTweets = function (tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  let tweet = [];
  for (const key in tweets) {
    tweet = createTweetElement(tweets[key]);

    $("#tweets-container").append(tweet[0]);
  }
};

renderTweets(tweetData);

$(document).ready(() => {
  console.log("ready!");
  $("form").on("submit", (evt) => {
    evt.preventDefault();
    let str = $("form").serialize();
    $.ajax({
      url: "/tweets",
      method: "POST",
      data: str,
    })
      .then(function (response) {
        console.log("response", response);
      })
      .catch(function (err) {
        console.log(err);
      });
  });
});
