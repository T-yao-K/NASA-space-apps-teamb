chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "change_background") {
      if (request.color === "reset") {
        document.body.style.backgroundColor = "";
      } else {
        document.body.style.backgroundColor = request.color;
      }
    }
  });