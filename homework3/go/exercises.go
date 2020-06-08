package exercises

import "errors"

/**
 * Accepts a number of U.S. cents and returns a slice containing,
 * the smallest number of U.S. quarters, dimes, nickels, and pennies
 */
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


func Powers(base, limit int, channel chan int) {
		value := 1
		for value <= limit {
				channel <- value
				value *= base
		}
}