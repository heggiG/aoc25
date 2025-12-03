package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	input := bufio.NewScanner(os.Stdin)
	sum1 := 0
	sum2 := 0
	for input.Scan() {
		line := input.Text()
		arr := strings.Split(line, "")
		i, _ := strconv.Atoi(getSum2(arr))
		sum1 += i
		j, _ := strconv.Atoi(getSum12(arr))
		sum2 += j
	}
	fmt.Println(sum1, sum2)
}

func getSum2(arr []string) string {
	return work(arr, 2)
}

func getSum12(arr []string) string {
	return work(arr, 12)
}

func work(arr []string, size int) string {
	var num = ""
	var index = 0
	for i := 0; i < size; i++ {
		end := (len(arr) - size) + i + 1
		fmt.Println(end)
		highest := ""
		for j := index; j < end; j++ {
			if (arr[j] > highest) {
				highest = arr[j]
				index = j + 1
			}
			if (highest == "9") {
				break
			}
		}
		num += highest
	}
	return num
}
