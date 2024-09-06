document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("toggle-extension");

    // Получаем текущий URL страницы
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const currentTab = tabs[0];
        const url = currentTab.url;

        // Загрузка состояния для этого URL
        chrome.storage.local.get([url], (result) => {
            // Если состояние не сохранено, считаем, что расширение выключено
            const isEnabled = result[url] !== undefined ? result[url] : false;
            toggle.checked = isEnabled;
        });

        // Сохранение нового состояния для этого URL
        toggle.addEventListener("change", () => {
            const state = {};
            state[url] = toggle.checked;
            chrome.storage.local.set(state);

            // Отправка сообщения в content.js с информацией об изменении состояния
            chrome.tabs.sendMessage(currentTab.id, { extensionEnabled: toggle.checked });
        });
    });
});
