package main

import (
	"slices"
	"testing"
)

func TestProductExceptSelf(t *testing.T) {
	tests := []struct {
		name string
		in   []int
		want []int
	}{
		{"example 1", []int{1, 2, 3, 4}, []int{24, 12, 8, 6}},
		{"example 2", []int{-1, 1, 0, -3, 3}, []int{0, 0, 9, 0, 0}},
		{"two elements", []int{2, 3}, []int{3, 2}},
		{"contains zero", []int{1, 0, 3, 4}, []int{0, 12, 0, 0}},
		{"all ones", []int{1, 1, 1, 1}, []int{1, 1, 1, 1}},
		{"negatives", []int{-1, -2, -3}, []int{6, 3, 2}},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := productExceptSelf(tt.in); !slices.Equal(got, tt.want) {
				t.Errorf("productExceptSelf(%v) = %v, want %v", tt.in, got, tt.want)
			}
		})
	}
}
