chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['content.js']
    }).then(() => {
        console.log('Content script injected.');
    }).catch((error) => {
        console.error('Error injecting content script:', error);
    });
});
