const state = {
    views: {
        difficultId: document.querySelector(".difficult")
    },

    values: {
        difficult: 2,
        plays: 0
    },

    actions: {

    }
}

const emojis = [
    "🤤",
    "😊",
    "😂",
    "😘",
    "😍",
    "😎",
    "🤔",
    "😏",
];

let openCards = [];
let shuffleEmojis;

main();

function main() {
    setGame();

    document.querySelector(".reset").onclick = setGame;
    document.querySelector(".difficult").onclick = changeDifficult;
}

function setGame() {
    document.querySelectorAll(".item").forEach((item) => {
        item.remove();
    })

    setEmojis();
    for (let i = 0; i < shuffleEmojis.length; i++) {
        let box = document.createElement("div");
        box.className = "item";

        if (state.values.difficult == 2) {
            box.style.height = "100px";
            box.style.width = "100px";
        } else if (state.values.difficult == 3) {
            box.style.height = "75px";
            box.style.width = "75px";
        }

        box.innerHTML = shuffleEmojis[i];
        box.onclick = handleClick;
        document.querySelector(".game").appendChild(box);
    }
}

function setEmojis() {
    let emojisToGame = [];
    emojis.forEach((emoji) => {
        for (let i = 0; i < state.values.difficult; i++) {
            emojisToGame.push(emoji);
        }
    })
    shuffleEmojis = emojisToGame.sort(() => (Math.random() > 0.5 ? 2 : -1));
}

function changeDifficult() {
    state.values.difficult = state.values.difficult == 2 ? 3 : 2;
    state.views.difficultId.textContent = "Difficult x" + state.values.difficult;
    setGame();
}

function handleClick() {
    if (openCards.length < state.values.difficult) {
        this.classList.add("boxOpen");
        openCards.push(this);
    }

    if (openCards.length == state.values.difficult) {
        setTimeout(checkMatch, 500);
    }
}

function checkMatch() {
    if (isMatch()) {
        openCards.forEach((card) => {
            card.classList.add("boxMatch");
        })
    } else {
        openCards.forEach((card) => {
            card.classList.remove("boxOpen");
        })
    }

    openCards = [];
    state.values.plays++;

    if (document.querySelectorAll(".boxMatch").length == shuffleEmojis.length) {
        alert("Você ganhou com " + state.values.plays + " jogadas");
        state.values.plays = 0;
    }
}

function isMatch() {
    let cardToVerify = openCards[0];
    for (let i = 0; i < openCards.length; i++) {
        if (openCards[i].innerHTML !== cardToVerify.innerHTML) {
            return false;
        }
    }
    return true;
}