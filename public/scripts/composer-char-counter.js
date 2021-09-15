$(document).ready(function () {
  // --- our code goes here ---
  const textArea = document.getElementById("tweet-textarea");
  textArea.addEventListener("input", function () {
    $("#counter").text(140 - $(this).val().length);
    if ($(this).val().length > 140) {
      $("#counter").css("color", "red");
    } else {
      $("#counter").css("color", "black");
    }
  });
});
