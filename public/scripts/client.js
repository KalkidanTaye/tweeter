/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const createTweetElement = function (data) {
  console.log(data);
  const date = data.created_at;
  const item = ` <img class= "avatar" src = "${data.user.avatars}">
                    <label class="tweeter-name">${data.user.name}</label>
                    <label class="tweeter-username">${data.user.handle}</label>`;
  console.log(timeago.format(date));

  const item1 = `${data.content.text}`;
  const day = `${timeago.format(data.created_at)}`;
  return [item, item1, day];
};

const tweetData = {
  user: {
    name: "Newton",
    avatars: "https://i.imgur.com/73hZDYK.png",
    handle: "@SirIsaac",
  },
  content: {
    text: "If I have seen further it is by standing on the shoulders of giants",
  },
  created_at: 1461116232227,
};

const $tweet = createTweetElement(tweetData);

$("#tweeter-profile").append($tweet[0]); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
$(".tweet-text").append($tweet[1]); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
$("#tweet-day").append($tweet[2]);
