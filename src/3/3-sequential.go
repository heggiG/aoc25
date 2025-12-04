package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	input := bufio.NewScanner(os.Stdin)
	sum1 := 0
	sum2 := 0
	for input.Scan() {
		line := input.Text()
		arr := []rune(line)
		i := work(arr, 2)
		sum1 += i
		j := work(arr, 12)
		sum2 += j
	}
	fmt.Println(sum1, sum2)
}

func work(arr []rune, size int) int {
	var num int = 0
	var index = 0
	for i := 0; i < size; i++ {
		end := (len(arr) - size) + i + 1
		highest := '0'
		for j := index; j < end; j++ {
			if (arr[j] > highest) {
				highest = arr[j]
				index = j + 1
			}
			if (highest == '9') {
				break
			}
		}
		num = num * 10 + int(highest - '0')
	}
	return num
}
