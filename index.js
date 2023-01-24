//This is the Nav Bar 
const navMenu = document.querySelector(".nav-menu");
const menuBtn = document.querySelector('.menu-btn');
let menuOpen = false;

menuBtn.addEventListener('click', () => {
    if (!menuOpen) {
        menuBtn.classList.add('open');
        menuOpen = true;
        navMenu.classList.add("active");
    } else {
        menuBtn.classList.remove('open');
        navMenu.classList.remove("active");
        menuOpen = false;
    }
})


// This is the logic of sorting algo
const n = 20;
const array = [];

const container = document.getElementById("container");

const init = () => {
    for (let i = 0; i < n; i++) {
        array[i] = Math.random();
    }
    showBars();
}

const animate = (moves) => {
    if (moves.length == 0) {
        showBars();
        return;
    }
    const move = moves.shift();
    const [i, j] = move.indices;
    if (move.type == "swap") {
        [array[i], array[j]] = [array[j], array[i]];
    }
    showBars(move);
    setTimeout(() => {
        animate(moves);
    }, 200);
}


const play = () => {
    const copy = [...array];
    const moves = bubbleSort(copy);
    animate(moves);
}

const bubbleSort = (arr) => {
    const moves = [];
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - i; j++) {
            moves.push({
                indices: [j, j + 1],
                type: "comp"
            });
            if (arr[j] > arr[j + 1]) {
                moves.push({
                    indices: [j, j + 1],
                    type:"swap"
                });
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return moves;
}

const showBars = (move) => {
    container.innerHTML = "";
    for (let i = 0; i < n; i++) {
        const bar = document.createElement("div");
        bar.style.height = array[i] * 100 + "%";
        bar.classList.add("bar");
        if (move && move.indices.includes(i)) {
            bar.style.backgroundColor = move.type === 'swap' ? "red" : "blue";
        }
        container.appendChild(bar);
    }
}

window.addEventListener('onload', init());