const wordsToType = ["Hello, world!", "How are you doing today?"];

let blink = false;

const drawText = async function(wordsToType) {
    const container = document.getElementById("typingEffect");

    while (true) {
        container.innerText = "​";

        for (const x in wordsToType) {
            blink = false;
            for (const y in wordsToType[x]) {
                const randomOffset = Math.floor(Math.random() * 120) + 1;
                container.innerText += (wordsToType[x][y] + "​");
                await sleep(100 + randomOffset);
            }

            blink = true;
            await sleep(2000);
            blink = false;

            for (const x in container.innerText) {
                if (container.innerText.length > 1) {
                    const randomOffset = Math.floor(Math.random() * 50) + 1;
                    container.innerText = container.innerText.slice(0, -1);
                    await sleep(50 + randomOffset);
                }
            }
        }
        await sleep(500);
    }
}

const cursor = async function() {
    const container = document.getElementById("cursor");
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

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

drawText(wordsToType);
cursor();