package main

import "testing"

func TestIncreasingTriplet(t *testing.T) {
	tests := []struct {
		name string
		in   []int
		want bool
	}{
		{"example 1", []int{1, 2, 3, 4, 5}, true},
		{"example 2", []int{5, 4, 3, 2, 1}, false},
		{"example 3", []int{2, 1, 5, 0, 4, 6}, true},
		{"too short", []int{1, 2}, false},
		{"all equal", []int{2, 2, 2, 2}, false},
		{"triplet at end", []int{20, 100, 10, 12, 5, 13}, true},
		{"non-adjacent", []int{1, 1, 1, 2, 3}, true},
		{"empty", []int{}, false},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := increasingTriplet(tt.in); got != tt.want {
				t.Errorf("increasingTriplet(%v) = %v, want %v", tt.in, got, tt.want)
			}
		})
	}
}
