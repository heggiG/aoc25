const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

let cols = []
let lines = []
console.log("Go!")
rl.on('line', (line) => {
    lines.push(line)
    line.split(/\s+/).forEach((el, i) => {
        if (!cols[i]) {
            cols[i] = []
        }
        if (el != "+" && el != "*") {
            cols[i].push(el);
        } else {
            cols[i].unshift(el);
        }
    })
})


rl.on('close', () => {
    let sum1 = cols.map((col, _, arr) => {
        if (col[0] == '+') {
            let sum = 0;
            col.slice(1).forEach((a) => sum += +a);
            return sum;
        } else {
            let sum = 1;
            col.slice(1).forEach((a) => sum *= +a);
            return sum;
        }
    }).reduce((a, b) => a + b);
    console.log(sum1);
    let sum2 = 0;
    let buf = 0;
    let op = '';
    for (let i = 0; i < lines[0].length; i++) {
        let br = true;
        let number = ''
        for (let j = 0; j < lines.length - 1; j++) {
            if (lines[j][i] !== ' ') {
                br = false
                number += lines[j][i]
            }
        }
        if (lines[lines.length - 1][i] !== ' ') {
            op = lines[lines.length - 1][i];
        }
        if (br && i !== lines[0].length - 1) {
            sum2 += buf
        } else {
            if (op == '+') {
                buf += +number
            } else if (op == "*") {
                if (buf == 0) {
                    buf = 1
                }
                buf *= +number
            }
        }
        if (i == lines[0].length - 1) {
            sum2 += buf
        }
        if (br) {
            buf = 0
        }
    }
    console.log(sum2)
})
