const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

let ranges = [];
let ids = [];
let br = false;

const differ = (upper, lower) => {
    return upper - lower + 1
}

rl.on('line', (line) => {
    if (line == '') {
        br = true;
    } else if (!br) {
        let nums = line.split('-').map(Number);
        ranges.push({ upper: nums[1], lower: nums[0], diff: differ(nums[1], nums[0]) });
        ranges.sort((a, b) => {
            let min = a.lower - b.lower;
            if (min != 0) {
                return min;
            }
            return a.upper - b.upper
        })
    } else if (br) {
        ids.push(Number(line));
    }
});

rl.on('close', () => {

    console.log('Go!');
    let suma = 0;
    for (let id of ids) {
        for (let range of ranges) {
            if (range.upper - id <= range.diff && range.upper - id > 0) {
                suma++;
                break;
            }
        }
    }
    let sumb = 0
    let i = 0
    for (let r of ranges) {
        if (r.upper >= i) {
            sumb += r.upper - Math.max(r.lower, i) + 1
            i = r.upper + 1
        }
    }
    console.log(suma, sumb)
})



