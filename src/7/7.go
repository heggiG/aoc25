package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	input := bufio.NewScanner(os.Stdin)
	var lines []string
	var sums []int
	i := 0
	for input.Scan() {
		line := input.Text()
		if lines == nil {
			lines = make([]string, len(line)+1)
			sums = make([]int, len(line)+1)
		}
		lines[i] = line
		i++
	}
	sum := 0
	sum2 := 0
	col := (len(lines) / 2) - 1
	end := col + 1
	sums[col] = 1
	for i := 2; i < len(lines)-1; i += 2 {
		for j := col; j < end; j++ {
			if lines[i][j] == '^' && sums[j] > 0 {
				sum++
				sums[j-1] += sums[j]
				sums[j+1] += sums[j]
				sums[j] = 0
			}
		}
		col -= 1
		end += 1
	}
	for _, val := range sums {
		sum2 += val
	}
	fmt.Println(sum, sum2)

}
