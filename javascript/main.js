// noinspection InfiniteLoopJS,JSIgnoredPromiseFromCall

const wordsToType = ["Hello, world!", "How are you doing today?"];

let blink = false;

const drawText = async function(...wordsToType) {
    const container = document.getElementById("typingEffect");

    // noinspection InfiniteLoopJS
    while (true) {
        container.innerText = "​";

        for (let x in wordsToType) {
            blink = false;
            for (let y in wordsToType[x]) {
                let randomOffset = Math.floor(Math.random() * 120) + 1;
                container.innerText += (wordsToType[x][y] + "​");
                await sleep(100 + randomOffset);
            }

            blink = true;
            await sleep(2000);
            blink = false;

            for (let x in container.innerText) {
                if (container.innerText.length > 1) {
                    let randomOffset = Math.floor(Math.random() * 50) + 1;
                    container.innerText = container.innerText.slice(0, -1);
                    await sleep(50 + randomOffset);
                }
            }
        }
        await sleep(500);
    }
}

const cursor = async function() {
    let container = document.getElementById("cursor");
    container.innerText = "|";
    while (true) {
        if (blink) {
            container.classList.add("blinkingAnimation")
        } else {
            container.classList.remove("blinkingAnimation")
        }
        await sleep(10);
    }
}

const sleep = function(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

drawText(...wordsToType);
cursor();