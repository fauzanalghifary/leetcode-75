# @param {String} str1
# @param {String} str2
# @return {String}
def gcd_of_strings(str1, str2)
  shorter = str1.length > str2.length ? str2 : str1
  max_length = shorter.length

  while max_length > 0
    if str1.length % max_length == 0 && str2.length % max_length == 0
      candidate = shorter[0..max_length-1]
      return candidate if composed_of?(str1, candidate) && composed_of?(str2, candidate)
    end
    max_length -= 1
  end

  ""
end

def composed_of?(whole, unit)
  repeat_count = whole.length / unit.length
  unit * repeat_count == whole
end

require "minitest"
def Minitest.load_plugins; end # avoid loading conflicting global Rails plugin
require "minitest/autorun"

class GcdOfStringsTest < Minitest::Test
  def test_example_1
    assert_equal "ABC", gcd_of_strings("ABCABC", "ABC")
  end

  def test_example_2
    assert_equal "AB", gcd_of_strings("ABABAB", "ABAB")
  end

  def test_example_3
    assert_equal "", gcd_of_strings("LEET", "CODE")
  end

  def test_example_4
    assert_equal "", gcd_of_strings("AAAAAB", "AAA")
  end

  def test_example_5
    assert_equal "TAUXX", gcd_of_strings("TAUXXTAUXXTAUXXTAUXXTAUXX", "TAUXXTAUXXTAUXXTAUXXTAUXXTAUXXTAUXXTAUXXTAUXX")
  end
end