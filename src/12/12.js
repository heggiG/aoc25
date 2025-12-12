const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

let reg = new RegExp(/\d\dx.*/)
let areaReg = new RegExp(/\d\dx\d\d/)
let tilesReg = new RegExp(/(\d\d ?){6}/g)

let lines = []

rl.on("line", line => {
    if (reg.exec(line)) {
        lines.push(line)
    }
})

rl.on("close", () => {
    let sum = 0
    for (let line of lines) {
        let parts = line.split(": ")
        let area = parts[0].split('x').map(Number).reduce((a,b) => a * b, 1)
        
        let tiles = parts[1].split(" ").map(Number).map(a => a * 7).reduce((a,b) => a + b)

        if (area >= tiles) {
            sum++
        }
        
    }
    console.log(sum)
    
})
