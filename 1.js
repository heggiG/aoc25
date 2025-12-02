const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

let pos = 50, part1 = 0, part2 = 0;
console.log("Go!");
rl.on('line', (line) => {
        const rot = line.slice(1) * (line[0] == "L" ? -1 : 1)
        const nPos = (pos + rot + 100) % 100;
        part1 += nPos === 0;
        part2 += rot > 0
            ? Math.floor((pos + rot) / 100) - Math.floor(pos / 100)
            : Math.floor((pos - 1) / 100) - Math.floor((pos - 1 + rot) / 100)
        pos = nPos;
});

rl.on("close", () => {
    console.log(part1, part2)
})