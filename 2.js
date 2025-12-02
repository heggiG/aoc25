const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

console.log("Go!")

rl.on('line', (line) => {
    let inputs = line.split(",");
    let part1 = 0;
    let part2 = 0;
    let regex = RegExp(/^([0-9]+)(\1)(\1)*$/)
    for (let range of inputs) {
        let ranges = range.split("-").map(Number)
        Array.from({ length: (ranges[1] + 1) - ranges[0] }, (x, i) => (i + ranges[0])).forEach((num) => {
            let match = regex.exec("" + num);
            if (match) {
                if (!match[3]) {
                    part1 += num;
                }
                part2 += num;
            }
        })
    }
    console.log(part1)
    console.log(part2)
})
