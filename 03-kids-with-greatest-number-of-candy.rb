# @param {Integer[]} candies
# @param {Integer} extra_candies
# @return {Boolean[]}
def kids_with_candies(candies, extra_candies)
  threshold = candies.max - extra_candies
  candies.map { |c| c >= threshold }
end

require "minitest"
def Minitest.load_plugins; end # avoid loading conflicting global Rails plugin
require "minitest/autorun"

class KidsWithCandiesTest < Minitest::Test
  def test_example_1
    assert_equal [true, true, true, false, true], kids_with_candies([2, 3, 5, 1, 3], 3)
  end

  def test_example_2
    assert_equal [true, false, false, false, false], kids_with_candies([4, 2, 1, 1, 2], 1)
  end

  def test_example_3
    assert_equal [true, false, true], kids_with_candies([12, 1, 12], 10)
  end

  def test_single_kid
    assert_equal [true], kids_with_candies([5], 3)
  end

  def test_all_equal
    assert_equal [true, true, true], kids_with_candies([3, 3, 3], 0)
  end
end
