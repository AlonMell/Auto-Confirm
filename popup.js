document.getElementById('toggle').addEventListener('click', () => {
    chrome.storage.local.get('enabled', (data) => {
        const enabled = !data.enabled;
        chrome.storage.local.set({ enabled });
        chrome.action.setBadgeText({ text: enabled ? 'ON' : 'OFF' });
        chrome.action.setBadgeBackgroundColor({ color: enabled ? '#00FF00' : '#FF0000' });

        if (enabled) {
            chrome.scripting.executeScript({
                target: { tabId: chrome.tabs.TAB_ID },
                files: ['content.js']
            });
        } else {
            chrome.scripting.executeScript({
                target: { tabId: chrome.tabs.TAB_ID },
                func: () => { /* Удалить или остановить код, если нужно */ }
            });
        }
    });
});
