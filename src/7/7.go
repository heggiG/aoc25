package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	input := bufio.NewScanner(os.Stdin)
	var lines [][]rune
	var sums [][]int
	i := 0
	for input.Scan() {
		line := input.Text()
		if lines == nil {
			lines = make([][]rune, len(line)+1)
			sums = make([][]int, len(line)+1)
		}
		lines[i] = []rune(line)
		sums[i] = make([]int, len(line))
		i++
	}
	sum := 0
	sum2 := 0
	for i, line := range lines[:len(lines)-1] {
		for j, el := range line {
			if el == 'S' {
				lines[i+1][j] = '|'
				sums[i+1][j] = 1
				break
			}
			if el == '|' {
				if lines[i+1][j] == '^' {
					sum++
					lines[i+1][j-1] = '|'
					lines[i+1][j+1] = '|'
					sums[i+1][j-1] = sums[i+1][j-1] + sums[i][j]
					sums[i+1][j+1] = sums[i+1][j+1] + sums[i][j]
				} else {
					lines[i+1][j] = lines[i][j]
					sums[i+1][j] = sums[i+1][j] + sums[i][j]
				}
			}
		}
	}
	for _, val := range sums[len(sums)-1] {
		sum2 += val
	}
	fmt.Println(sum, sum2)

}
