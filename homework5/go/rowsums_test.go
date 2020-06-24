package rowsums

import "fmt"

func ExampleRowSums() {
        fmt.Println(RowSums([][]int{{3}, {5, -2}, {9, 1, 5}}))
        fmt.Println(RowSums([][]int{}))
        fmt.Println(RowSums([][]int{{}, {}, {}}))
        fmt.Println(RowSums([][]int{{}, {}, {1}}))
        fmt.Println(RowSums([][]int{{-9}, {1, 2, 3}, {2, 2}, {}, {100, -50}}))
        // Output: 3 18
        // 0 0
        // 0 0
        // 0 1
        // 54 -3
}