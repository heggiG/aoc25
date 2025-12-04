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
	return work(arr, 0, len(arr) - 2 + 1)
}

func getSum12(arr []string) string {
	return work(arr, 0, len(arr) - 12 + 1)
}

func work(arr []string, start int, end int) string {
	if end > len(arr) {
		return ""
	}
	var highest = ""
	var index = 0
	for i := start; i < end; i++ {
		if arr[i] > highest {
			highest = arr[i]
			index = i
		}
		if highest == "9" {
			break
		}
	}
	return highest + work(arr, index+1, end+1)
}
