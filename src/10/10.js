const { exit } = require("process");
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

let expState = new RegExp(/\[([.#]+)\]/)
let expButtons = new RegExp(/\(([\d,]+)\)/g)

let sum1 = 0;

let computer = 0;
rl.on("line", (line) => {
    let state = expState.exec(line)[1];
    let targetMask = 0
    state.split('').forEach((c, i) => { if (c === "#") { targetMask |= (1 << i) } })

    let buttonsMatches = line.matchAll(expButtons)
    let buttons = []
    for (let b of buttonsMatches) {
        let mask = 0;
        let indices = b[1].split(",").map(Number);
        for (let i of indices) {
            mask |= (1 << i);
        }
        buttons.push(mask);
    }
    let bestPresses = 10000000;
    // console.log(targetMask.toString(2), buttons.map(x => x.toString(2)))
    // exit(0)
    let range = Array.from({ length: 2 ** buttons.length });
    // console.log(range.length)

    for (let i in range) {
        let pressedCount = 0
        let currentState = 0

        for (let j in buttons) {
            if ((i >> j) & 1) {
                currentState ^= buttons[j];
                pressedCount += 1;
            }
        }

        if (currentState === targetMask) {
            if (pressedCount < bestPresses) {
                console.log(bestPresses, pressedCount)
                bestPresses = pressedCount
            }
        }
    }
    sum1 += bestPresses

})

rl.on('close', () => {
    console.log(sum1)
})
