package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	input := bufio.NewScanner(os.Stdin)
	var sums = make([]int, 141)
	sum := 0
	col := (142 / 2) - 1
	end := col + 1
	sums[col] = 1
	i := 0
	for input.Scan() {
		line := input.Text()
		if i == 0 || i%2 == 1 {
			i++
			continue
		}
		for j := col; j < end; j++ {
			if line[j] == '^' && sums[j] > 0 {
				sum++
				sums[j-1] += sums[j]
				sums[j+1] += sums[j]
				sums[j] = 0
			}
		}
		col -= 1
		end += 1
		i++
	}
	sum2 := 0
	for _, val := range sums {
		sum2 += val
	}
	fmt.Println(sum, sum2)

}
