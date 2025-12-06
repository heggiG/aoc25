package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
	"strconv"
)

func main() {
	input := bufio.NewScanner(os.Stdin)
	lines := make([]string, 5)
	cols := make([][]string, 750)
	exp := regexp.MustCompile(`\s+`)
	fmt.Println("Go!")
	for input.Scan() {
		line := input.Text()
		lines = append(lines, line)
		split := exp.Split(line, -1)
		for i, val := range split {
			if i >= len(cols) {
				cols = append(cols, []string{})
			}
			if val == "*" || val == "+" {
				cols[i] = append([]string{val}, cols[i]...)
			} else {
				cols[i] = append(cols[i], val)
			}
		}
	}
	var sum1 int64 = 0
	for _, arr := range cols {
		op := arr[0]
		var buf int64
		if op == "+" {
			buf = 0
		} else {
			buf = 1
		}
		for _, val := range arr[1:] {
			if op == "+" {
				val, _ := strconv.ParseInt(val, 0, 64)
				buf += val
			} else {
				val, _ := strconv.ParseInt(val, 0, 64)
				buf *= val
			}
		}
		sum1 += buf
	}
	var sum2 int64 = 0
	var buf int64 = 0
	op := ""
	for i := range lines[0] {
		br := true
		number := ""
		for j := 0; j < len(lines)-1; j++ {
			if lines[j][i] != ' ' {
				br = false
				number += string([]rune(lines[j])[i])
			}
		}
		if lines[len(lines)-1][i] != ' ' {
			op = string(lines[len(lines)-1][i])
		}
		if br && i != len(lines[0])-1 {
			sum2 += buf
		} else {
			switch op {
			case "+":
				num, _ := strconv.Atoi(number)
				buf += int64(num)
			case "*":
				if buf == 0 {
					buf = 1
				}
				num, _ := strconv.Atoi(number)
				buf *= int64(num)
			}
		}
		if i == len(lines[0])-1 {
			sum2 += buf
		}
		if br {
			buf = 0
		}
	}
	fmt.Println(sum1, sum2)
}
