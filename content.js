function getRandomDelay(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function clickPresenceButton(presenceControl) {
    if (presenceControl && presenceControl.style.display !== "none") {
        const button = document.getElementById("confirmationPresence");
        if (button) {
            const delay = getRandomDelay(1000, 10000);
            console.log(`Ждем ${delay / 1000} секунд до клика по кнопке подтверждения посещения.`);

            setTimeout(() => {
                button.click();
                console.log("Посещение подтверждено после задержки.");
            }, delay);
        }
    }
}

function observePresenceControlStyle(presenceControl) {
    console.log("Модальное окно найдено, начинаем наблюдать за изменением стиля.");

    const styleObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                clickPresenceButton(presenceControl);
            }
        });
    });

    styleObserver.observe(presenceControl, {
        attributes: true
    });

}

const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
            if (node.id === "presenceControl") {
                observer.disconnect();
                observePresenceControlStyle();
            }
        });
    });
});

// const presenceControl = document.getElementById("presenceControl");
// if (presenceControl) {
//     console.log("Окно посещения уже открыто.")
//     observePresenceControlStyle(presenceControl);
// } else {
//     console.log("Окно посещения еще не открыто. Начинаем наблюдать за появлением.")
//     observer.observe(document.body, {
//         childList: true,
//         subtree: true
//     });
// }

alert("Ты пытаешься получить власть, которая и не снилась твоему отцу.");

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.extensionEnabled) {
            const presenceControl = document.getElementById("presenceControl");
            if (presenceControl) {
                console.log("Окно посещения уже открыто.")
                observePresenceControlStyle(presenceControl);
            } else {
                console.log("Окно посещения еще не открыто. Начинаем наблюдать за появлением.")
                observer.observe(document.body, {
                    childList: true,
                    subtree: true
                });
            }

            alert("Ты получил власть, которая и не снилась твоему отцу.");
        } else {
            alert("Ты не получил власть, которая и не снилась твоему отцу.");
        }
})
