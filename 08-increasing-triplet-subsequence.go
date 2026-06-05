package main

import "math"

func increasingTriplet(nums []int) bool {
	first, second := math.MaxInt, math.MaxInt
	for _, n := range nums {
		switch {
		case n <= first:
			first = n
		case n <= second:
			second = n
		default:
			return true // n > second > first
		}
	}
	return false
}
