package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strings"
)

func main() {
	reader := bufio.NewReader(os.Stdin)

	for {
		line, err := reader.ReadString('\n')
		if err != nil {
			log.Fatal(err)
		}
		if len(strings.TrimSpace(line)) == 0 {
			break
		}
		fmt.Println(line)
	}
}

func work(arr []string, start int, end int) string {

}
