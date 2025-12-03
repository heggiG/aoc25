const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

let work = (arr, start, end) => {
    if (end > arr.length) {
        return '';
    }
    let highest = '';
    let index = 0;
    for (let i = start; i < end; i++) {
        if (arr[i] > highest) {
            highest = arr[i];
            index = i;
        }
        if (highest === '9') {
            break;
        }
    }
    return highest + '' + work(arr, index + 1, end + 1);
}

console.log("Go!")

let sum1 = 0;
let sum2 = 0;

rl.on('line', (line) => {
    let arr = line.split('');
    sum1 += Number(work(arr, 0, line.length - 2 + 1));
    sum2 += Number(work(arr, 0, line.length - 12 + 1));
})

rl.on('close', () => {
    console.log(sum1);
    console.log(sum2);
})
