console.log('Content script loaded');

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log('Message received in content script:', request);

  if (request.action === "change_background") {
    console.log('Changing background color to:', request.color);

    if (request.color === "reset") {
      document.body.style.backgroundColor = "";
      console.log('Background color reset');
    } else {
      document.body.style.backgroundColor = request.color;
      console.log('Background color changed to:', request.color);
    }

    sendResponse({status: "Color change attempt completed"});
  }
});