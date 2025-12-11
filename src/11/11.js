const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
});

let nodes = new Map();
let ways = new Map();

function part1(curr) {
    let next = nodes.get(curr);
    if (next.length === 1 && next[0] === "out") {
        return 1;
    }
    let sum = 0;
    for (let n of next) {
        sum += part1(n);
    }
    return sum;
}

function part2(curr, dac = false, fft = false) {
    let key = curr + dac + fft;
    if (ways.has(key)) {
        return ways.get(key);
    }
    let next = nodes.get(curr);
    if (next.includes("out")) {
        let count = dac && fft ? 1 : 0;
        ways.set(key, count);
        return count;
    }
    let sum = 0;
    for (let n of next) {
        if (n === "dac") {
            sum += part2(n, true, fft);
        } else if (n === "fft") {
            sum += part2(n, dac, true);
        } else {
            sum += part2(n, dac, fft);
        }
    }
    ways.set(key, sum);
    return sum;
}

console.log("Go!");

rl.on("line", (line) => {
    let [from, to] = line.split(": ");
    nodes.set(from, to.split(" "));
});

rl.on("close", () => {
    console.log(part1("you"));

    console.log(part2("svr"));
});
