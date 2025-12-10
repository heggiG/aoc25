package main

import (
	"fmt"
	"strconv"
	"bufio"
	"os"
)

func main() {
	input := bufio.NewScanner(os.Stdin)
	pos := 50
	part1 := 0
	part2 := 0
	for input.Scan() {
	line := input.Text()
	val, _ := strconv.Atoi(line[1:])
	rot := val
	if line[0] == 'L' {
		rot = -val
	}
	nPos := (pos + rot + 100) % 100
	if nPos == 0 {
		part1++
	}
	if rot > 0 {
		part2 += floorDiv(pos+rot, 100) - floorDiv(pos, 100)
	} else {
		part2 += floorDiv(pos-1, 100) - floorDiv(pos-1+rot, 100)
	}

	pos = nPos
	}
	fmt.Println(part1, part2)
}

func floorDiv(a, b int) int {
	quotient := a / b
	remainder := a % b
	if remainder < 0 {
		quotient--
	}
	return quotient
}