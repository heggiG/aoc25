const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

let lines = []
String.prototype.replaceAt = function (index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}

function pascals(numRows) {
    if (numRows === 0) return [];
    if (numRows === 1) return [[1]];
    let result = [];
    for (let row = 1; row <= numRows; row++) {
        let arr = [];
        for (let col = 0; col < row; col++) {
            if (col === 0 || col === row - 1) {
                arr.push(1);
            } else {
                arr.push((result[row - 2][col - 1] + result[row - 2][col]));
            }
        }
        result.push(arr);
    }
    return result;
}

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

    // var fs = require('fs');

    // var file = fs.createWriteStream('array.txt');
    // file.on('error', function (err) { /* error handling */ });
    // sums.forEach(function (v) { file.write(v.join(',') + '\n'); });
    // file.end();
})
