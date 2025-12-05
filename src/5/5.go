package main

import (
	"bufio"
	"fmt"
	"os"
	"slices"
	"strconv"
	"strings"
)

type Range struct {
	min  int64
	max  int64
	diff int64
}

func main() {
	input := bufio.NewScanner(os.Stdin)
	br := false
	ranges := make([]Range, 200)
	ids := make([]int64, 1000)
	fmt.Println("Go!")
	for input.Scan() {
		line := input.Text()
		if line == "" && !br {
			br = true
			slices.SortFunc(ranges, func(a, b Range) int {
				min := a.min - b.min
				if min != 0 {
					return int(min)
				}
				return int(a.max - b.max)
			})
		} else if line == "" && br {
			break
		} else if !br {
			splitted := strings.Split(line, "-")
			min, _ := strconv.ParseInt(splitted[0], 0, 64)
			max, _ := strconv.ParseInt(splitted[1], 0, 64)
			ranges = append(ranges, Range{min, max, max - min + 1})
		} else if br {
			id, _ := strconv.ParseInt(line, 10, 64)
			ids = append(ids, id)
		}
	}
	suma := 0
	for _, id := range ids {
		for _, rang := range ranges {
			if rang.max-id <= rang.diff && rang.max-id > 0 {
				suma++
				break
			}
		}
	}
	sumb := int64(0)
	i := int64(0)
	for _, rang := range ranges {
		if rang.max >= i {
			sumb += (rang.max - max(rang.min, i)) + 1
			i = rang.max + 1
		}
	}
	fmt.Println(suma, sumb-1)
}
