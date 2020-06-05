package exercises

import (
        "fmt"
)

func ExampleChange() {
        cases := []int{5, 25, 97, 1000000000, -30}
        for _, amount := range cases {
                coins, err := Change(amount)
                if err != nil {
                        fmt.Println(err)
                } else {
                        fmt.Println(coins)
                }
        }
        // Output: [0 0 1 0]
        // [1 0 0 0]
        // [3 2 0 2]
        // [40000000 0 0 0]
        // amount cannot be negative
}

func ExamplePowers() {
        ch := make(chan int, 100)
        go Powers(2, -5, ch)
        go Powers(7, 0, ch)
        go Powers(3, 1, ch)
        fmt.Print(<-ch)
        go Powers(2, 63, ch)
        for i := 0; i < 6; i++ {
                fmt.Print(<-ch)
        }
        go Powers(2, 64, ch)
        for i := 0; i < 7; i++ {
                fmt.Print(<-ch)
        }
        fmt.Println()
        // Output: 1124816321248163264
}

func ExampleCylinder() {
        c := Cylinder{3.0, 5.0}
        fmt.Printf("%9.5f\n", c.SurfaceArea())
        fmt.Printf("%9.5f\n", c.Volume())
        // Output: 150.79645
        // 141.37167
}