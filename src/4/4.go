package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	input := bufio.NewScanner(os.Stdin)
	sum := 0
	sumOld := -1
	var arr [][]rune
	counter := 0
	for input.Scan() {
		line := input.Text()
		if (arr == nil) {
			arr = make([][]rune, len(line))
		}
		toSet := make([]rune, len(line))
		for index, runeval := range line {
			toSet[index] = runeval
		}
		arr[counter] = toSet
		counter++
	}
	fmt.Println("Go!")
	for sum - sumOld > 0 {
		sumOld = sum
		newarray := make([][]rune, len(arr))
		for i := 0; i < 140; i++ {
			lineNew := make([]rune, len(arr))
			for j := 0; j < 140; j++ {
				el := arr[i][j]
				if el == '@' {
					amount := 0
					if access(&arr, i-1, j-1) == '@' {
						amount++
					}
					if access(&arr, i, j-1) == '@' {
						amount++
					}
					if access(&arr, i-1, j) == '@' {
						amount++
					}
					if access(&arr, i+1, j) == '@' {
						amount++
					}
					if access(&arr, i, j+1) == '@' {
						amount++
					}
					if access(&arr, i+1, j+1) == '@' {
						amount++
					}
					if access(&arr, i+1, j-1) == '@' {
						amount++
					}
					if access(&arr, i-1, j+1) == '@' {
						amount++
					}
					if amount >= 4 {
						lineNew[j] = '@'
						continue
					}
					sum++
					lineNew[j] = '.'
					continue
				}
				lineNew[j] = el

			}
			newarray[i] = lineNew
		}
		if sumOld == 0 {
			fmt.Println(sum)
		}
		arr = newarray
	}
	fmt.Println(sum)
}

func access(arr *[][]rune, i int, j int) rune {
	if i < 0 || i >= len(*arr) {
		return '.'
	}
	if j < 0 || j >= len((*arr)[0]) {
		return '.'
	}
	return (*arr)[i][j]
}
