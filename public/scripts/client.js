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
                        <article class="tweet-text">${escape(
                          data.content.text
                        )}</article>
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
    return item;
  };

  //------------- Render Tweet Function ----------------------

  const renderTweets = function (tweets) {
    let tweet;
    for (const key in tweets) {
      tweet = createTweetElement(tweets[key]);
      $("#tweets-container").prepend(tweet);
    }
  };
  //----------------- fetch tweet --------------------

  const loadTweets = function () {
    $.ajax({
      url: "/tweets",
      method: "GET",
      dataType: "json",
    })
      .then(function (tweets) {
        renderTweets(tweets);
      })
      .catch(function (err) {
        console.log(err);
      });
  };
  loadTweets();
  //----------------- submit tweet --------------------

  $("form").on("submit", (event) => {
    event.preventDefault();
    if (formValidation()) {
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
      $("#tweet-textarea").val("").focus();
      $("#counter").val("140");
    }
    loadTweets();
  });

  //---------- form validation ---------------

  const formValidation = function () {
    if ($("#counter").val() < 0) {
      $(".error-display-counter").show("slow").delay(5000).hide("slow");

      return false;
    }

    if (!$("#tweet-textarea").val()) {
      $(".error-display-empty").show("slow").delay(5000).hide("slow");

      return false;
    }

    return true;
  };
  //----escape function --- cross site scripting --------------
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  //------ form slide up or down -------- not working!
  const $arrow = document.getElementsByClassName(".fa-angle-double-down");
  $(".fa-angle-double-down").click = function () {
    const $toggleText = document.getElementsByClassName(".new-tweet");
    if ($toggleText.style.display !== "none") {
      console.log("None");
      $toggleText.style.display = "none";
    }
    $toggleText.style.display = "flex";
    console.log("Display Yes");
  };
});
