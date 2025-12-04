const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

let lines = []
console.log("Go!")

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
            lines.forEach((line, i, array) => {
                let lineNew = line.map((el, j, li) => {
                    if (el === "@") {
                        let amount = 0;
                        if (access(array, i - 1, j - 1) === "@") { amount++ }
                        if (array[i][j - 1] === "@") { amount++ }
                        if (access(array, i - 1, j) === "@") { amount++ }
                        if (access(array, i + 1, j) === "@") { amount++ }
                        if (array[i][j + 1] === "@") { amount++ }
                        if (access(array, i + 1, j + 1) === "@") { amount++ }
                        if (access(array, i + 1, j - 1) === "@") { amount++ }
                        if (access(array, i - 1, j + 1) === "@") { amount++ }
                        if (amount >= 4) {
                            return '@';
                        }
                        sum++;
                        return '.';
                    }
                    return el;
                })
                newArray.push(lineNew)
            })
            if (sumOld === 0) {
                console.log(sum)
            }
            lines = newArray
        }
        console.log(sum)
    }
    work()
})

