package main

import (
	"slices"
	"strings"
)

func reverseWords(s string) string {
	stringSlices := strings.Fields(s)
	slices.Reverse(stringSlices)
	return strings.Join(stringSlices, " ")
}
