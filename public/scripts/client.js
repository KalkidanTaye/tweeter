$(document).ready(() => {
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
    let tweet;
    for (let i = tweets.length - 1; i >= 0; i--) {
      tweet = createTweetElement(tweets[i]);
      $("#tweets-container").append(tweet);
    }
  };

  //----------------- submit tweet --------------------

  $("form").on("submit", (evt) => {
    evt.preventDefault();
    let str = $("form").serialize();
    $.ajax({
      url: "/tweets",
      method: "POST",
      data: str,
    })
      .then(function (response) {})
      .catch(function (err) {
        console.log(err);
      });
  });

  //----------------- fetch tweet --------------------

  const loadTweets = function () {
    $.ajax({
      url: "/tweets",
      method: "GET",
      dataType: "json",
    })
      .then(function (tweets) {
        console.log("tweets -------", tweets);
        renderTweets(tweets);
      })
      .catch(function (err) {
        console.log(err);
      });
  };
  loadTweets();
});
