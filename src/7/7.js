const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

let lines = []
let sums = []

console.log("Go!")
rl.on('line', (line) => {
    lines.push(line.split(""))
    sums.push([])
})

rl.on('close', () => {
    let sum = 0
    for (let i = 0; i < lines.length - 1; i++) {
        for (let j = 0; j < lines[i].length; j++) {
            const el = lines[i][j];
            if (el === "S") {
                lines[i + 1][j] = "|"
                sums[i + 1][j] = 1
                break
            }
            if (el === "|") {
                if (lines[i + 1][j] === "^") {
                    sum++
                    lines[i + 1][j - 1] = "|"
                    lines[i + 1][j + 1] = "|"
                    sums[i + 1][j - 1] = (sums[i + 1][j - 1] ?? 0) + sums[i][j]
                    sums[i + 1][j + 1] = (sums[i + 1][j + 1] ?? 0) + sums[i][j]
                } else {
                    lines[i + 1][j] = lines[i][j]
                    sums[i + 1][j] = (sums[i + 1][j] ?? 0) + sums[i][j]
                }
            }
        }
    }
    console.log(sum, sums[sums.length - 1].reduce((a,b) => a + b))
})
