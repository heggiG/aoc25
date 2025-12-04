package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
	"sync"
)

func main() {
	input := bufio.NewScanner(os.Stdin)
	buf1 := make(chan string)
	buf2 := make(chan string)
	buf3 := make(chan any)
	sum1 := 0
	sum2 := 0
	var wg sync.WaitGroup
	for input.Scan() {
		line := input.Text()
		arr := strings.Split(line, "")
		wg.Add(1)
		go getSum2(buf1, arr, &wg)
		wg.Add(1)
		go getSum12(buf2, arr, &wg)
	}
	go func(wg *sync.WaitGroup) {
		wg.Wait()
		buf3 <- 0
	}(&wg)
	for {
		select {
		case x := <-buf1:
			i, err := strconv.Atoi(x)
			if err != nil {
			}
			sum1 += i
		case x := <-buf2:
			i, err := strconv.Atoi(x)
			if err != nil {
			}
			sum2 += i
		case _ = <-buf3:
			fmt.Println(sum1, sum2)
			break
		}
	}
}

func getSum2(buf chan string, arr []string, wg *sync.WaitGroup) {
	defer wg.Done()
	buf <- work(arr, 0, len(arr)-2+1)
}

func getSum12(buf chan string, arr []string, wg *sync.WaitGroup) {
	defer wg.Done()
	buf <- work(arr, 0, len(arr)-12+1)
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
