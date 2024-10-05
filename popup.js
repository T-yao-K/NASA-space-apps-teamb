document.addEventListener('DOMContentLoaded', function() {
  console.log('Popup DOM fully loaded and parsed');

  var buttons = document.getElementsByTagName('button');
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function() {
      var color = this.id;
      console.log('Button clicked: ' + color);

      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        console.log('Sending message to content script');
        chrome.tabs.sendMessage(tabs[0].id, {action: "change_background", color: color}, function(response) {
          console.log('Response from content script:', response);
        });
      });
    });
  }
});