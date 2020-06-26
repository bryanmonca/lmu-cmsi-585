package rowsums

// Sums the numbers in a slice sending the sum to two different
// channels depending on the row length.
func sum(row []int, evens, odds chan int) {
	sum := 0
	for _, v := range row {
		sum += v
	}
	if len(row) % 2 == 0 {
		evens <- sum
	} else {
		odds <- sum
	}
}

// Function that returns the sum of the rows with even length and 
// the sum of the rows with odd length. It uses a goroutine for each 
// row sending the sum to two different channels depending on the 
// length of each row.
func RowSums(matrix [][]int) (int, int) {
	evens := make(chan int)
	odds := make(chan int)
	for _, row := range matrix {
		go sum(row, evens, odds)
	}

	evensSum := 0
	oddsSum := 0
	for i := 0; i < len(matrix); i++ {
		select {
		case receiveEven := <- evens:
			evensSum += receiveEven
		case receiveOdd := <- odds:
			oddsSum += receiveOdd
		}
	}
	return evensSum, oddsSum
}