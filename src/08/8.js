const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

let parents = []
let ranks = []
let size = 0

function find(x) {
    while (true) {
        if (x === parents[x]) {
            return x
        }
        x = parents[x]
    }
}

function union(x, y, arr) {
    arr[find(x)] = find(y)
}

function unionRank(x, y) {
    let xP = find(x)
    let yP = find(y)
    if (xP === yP) {
        return
    }

    let xRank = ranks[x]
    let yRank = ranks[y]
    if (xRank > yRank) {
        parents[yP] = xP
    } else if (xRank < yRank) {
        parents[xP] = yP
    } else {
        parents[yP] = xP
        ranks[xP] += 1
    }

    size--
}

let points = []
let distances = []

console.log("Go!")
rl.on('line', (line) => {
    let vals = line.split(',')
    let point = { x: +vals[0], y: +vals[1], z: +vals[2] }
    points.push({ ...point })
})

rl.on('close', () => {
    for (let i = 0; i < points.length - 1; i++) {
        let a = points[i]
        let b
        let found
        for (let j = i + 1; j < points.length; j++) {
            b = points[j]
            let dist = Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2)
            distances.push({ a: i, b: j, dist: dist })
        }
    }
    distances.sort((a, b) => a.dist - b.dist)
    points.forEach((_, i) => parents[i] = i)
    for (let i = 0; i < 1000; i++) {
        let connection = distances[i]
        union(connection.a, connection.b, parents)
    }
    let closest = []
    for (let i = 0; i < points.length; i++) {
        let found = find(i)
        closest[found] = (closest[found] ?? 0) + 1
    }
    console.log(closest.sort((a, b) => b - a).slice(0, 3).reduce((a, b) => a * b))
    
    points.forEach((_, i) => parents[i] = i);
    ranks = Array.from({length: points.length}, () => 0)
    size = points.length
    let result
    
    for (let connection of distances) {
        unionRank(connection.a, connection.b)
        if (size === 1) {
            result = points[connection.a].x * points[connection.b].x
            break
        }
    }
    console.log(result)
})


