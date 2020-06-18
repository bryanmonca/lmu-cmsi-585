package exercises

import (
	"errors"
	"math"
)

// Accepts a number of U.S. cents and returns a slice containing,
// the smallest number of U.S. quarters, dimes, nickels, and pennies.
func Change(amount int) ([]int, error) {
	if amount < 0 {
		return nil, errors.New("amount cannot be negative")
	}
	results := []int{}
	coins := []int{25, 10, 5, 1}
	for _, element := range coins {
		results = append(results, amount/element)
		amount = amount % element
	}
	return results, nil
}

// Function (goroutine) that writes successive powers of a base from 1 
// up to some limit. It sends the values to a channel.
func Powers(base, limit int, channel chan int) {
	for value := 1; value <= limit; value *= base {
		channel <- value
	}
}

type Cylinder struct {
	radius, height float64
}

// Method defined on type Cylinder, returns the total surface area.
func (c *Cylinder) SurfaceArea() float64 {
	return 2 * math.Pi * c.radius * c.height + 2 * math.Pi * math.Pow(c.radius, 2)
}

// Method defined on type Cylinder, returns the volume.
func (c *Cylinder) Volume() float64 {
	return math.Pi * math.Pow(c.radius, 2) * c.height
}