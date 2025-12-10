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
	lines := [5]string{}
	cols := make([][]string, 780)
	exp := regexp.MustCompile(`\s+`)
	fmt.Println("Go!")
	l := 0
	for input.Scan() {
		line := input.Text()
		lines[l] = line
		split := exp.Split(line, -1)
		for i, val := range split {
			if i >= len(cols) {
				cols = append(cols, []string{})
			}
			cols[i] = append(cols[i], val)
		}
		l++
	}
	var sum1 int = 0
	for _, arr := range cols {
		op := arr[len(arr)-1]
		var buf int
		switch op {
		case "+":
			buf = 0
		case "*":
			buf = 1
		}
		for _, val := range arr[:len(arr)-1] {
			switch op {
			case "+":
				val, _ := strconv.Atoi(val)
				buf += val
			case "*":
				val, _ := strconv.Atoi(val)
				buf *= val
			}
		}
		sum1 += buf
	}
	sum2 := 0
	buf := 0
	op := '0'
	for i := range lines[0] {
		br := true
		number := 0
		for j := range len(lines) - 1 {
			if lines[j][i] != ' ' {
				br = false
				number *= 10
				number += int([]rune(lines[j])[i] - '0')
			}
		}
		if lines[len(lines)-1][i] != ' ' {
			op = rune(lines[len(lines)-1][i])
		}
		if br && i != len(lines[0])-1 {
			sum2 += buf
		} else {
			switch op {
			case '+':
				buf += number
			case '*':
				if buf == 0 {
					buf = 1
				}
				buf *= number
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
