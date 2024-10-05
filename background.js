let audio = new Audio('audio.mp3');
audio.loop = true;

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url === "chrome://newtab/") {
      audio.play();
    }
  });
  
  chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
    chrome.tabs.query({url: chrome.runtime.getURL('chrome://newtab/')}, (tabs) => {
      if (tabs.length === 0) {
        audio.pause();
        audio.currentTime = 0;
      }
    });
  });

// chrome.tabs.onActivated.addListener((activeInfo) => {
//     chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
//       if (tabs[0].url === "chrome://newtab/") {
//         audio.play();
//       } else {
//         audio.pause();
//         audio.currentTime = 0;
//       }
//     });
//   });