let audio = new Audio('audio.mp3');
audio.loop = true;

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url === chrome.runtime.getURL('index.html')) {
      audio.play();
    }
  });
  
  chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
    chrome.tabs.query({url: chrome.runtime.getURL('index.html')}, (tabs) => {
      if (tabs.length === 0) {
        audio.pause();
        audio.currentTime = 0;
      }
    });
  });
