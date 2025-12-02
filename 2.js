const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

rl.on('line', (line) => {
    let inputs = line.split(",");
    let part1 = 0;
    let part2 = 0;
    for (let range of inputs) {
        let ranges = range.split("-")
        Array.from({ length: (Number(ranges[1]) + 1) - Number(ranges[0]) }, (x, i) => "" + (i + Number(ranges[0]))).forEach((num) => {
            let match = /^([0-9]+)(\1)(\1)*$/.exec(num);
            if (match) {
                if (!match[3]) {
                    part1 += Number(num);
                }
                part2 += Number(num);
                return;
            }
        })
    }
    console.log(part1)
    console.log(part2)
})
