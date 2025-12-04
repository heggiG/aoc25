const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

let lines = []

rl.on('line', (line) => {
    lines.push(line);
});

rl.on('close', () => {
    function work() {
        let access = (arr, i, j) => {
            if (arr[i] !== undefined) {
                return arr[i][j]
            }
            return undefined
        }
        let sum = 0;
        let sumOld = -1;
        lines = lines.map(line => line.split(''))
        while (sum - sumOld > 0) {
            sumOld = sum;
            let newArray = []
            for (let i = 0; i < lines.length; i++) {
                let line = lines[i]
                let lineNew = []
                for (let j = 0; j < line.length; j++) {
                    let el = line[j];
                    if (el === "@") {
                        let amount = 0;
                        if (access(lines, i - 1, j - 1) === "@") { amount++ }
                        if (lines[i][j - 1] === "@") { amount++ }
                        if (access(lines, i - 1, j) === "@") { amount++ }
                        if (access(lines, i + 1, j) === "@") { amount++ }
                        if (lines[i][j + 1] === "@") { amount++ }
                        if (access(lines, i + 1, j + 1) === "@") { amount++ }
                        if (access(lines, i + 1, j - 1) === "@") { amount++ }
                        if (access(lines, i - 1, j + 1) === "@") { amount++ }
                        if (amount >= 4) {
                            lineNew[j] = '@';
                            continue;
                        }
                        sum++;
                        lineNew[j] = '.';
                        continue;
                    }
                    lineNew[j] = el;
                }
                newArray.push(lineNew)
            }

            if (sumOld === 0) {
                console.log(sum)
            }
            lines = newArray
        }
        console.log(sum)
    }
    work()
})

console.log('Go!')
