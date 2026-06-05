package main

import "testing"

func TestReverseWords(t *testing.T) {
	tests := []struct {
		name string
		in   string
		want string
	}{
		{"example 1", "the sky is blue", "blue is sky the"},
		{"example 2", "  hello world  ", "world hello"},
		{"example 3", "a good   example", "example good a"},
		{"single word", "hello", "hello"},
		{"leading spaces", "   leading", "leading"},
		{"trailing spaces", "trailing   ", "trailing"},
		{"only spaces", "     ", ""},
		{"two words", "foo bar", "bar foo"},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := reverseWords(tt.in); got != tt.want {
				t.Errorf("reverseWords(%q) = %q, want %q", tt.in, got, tt.want)
			}
		})
	}
}
