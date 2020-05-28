require 'set'
require 'test/unit'
require '../lib/exercises.rb'

class TestExercises < Test::Unit::TestCase

  def test_change
    assert_equal(change(0), [0, 0, 0, 0])
    assert_equal(change(97), [3, 2, 0, 2])
    assert_equal(change(8), [0, 0, 1, 3])
    assert_equal(change(250), [10, 0, 0, 0])
    assert_equal(change(144), [5, 1, 1, 4])
    assert_equal(change(97), [3, 2, 0, 2])
    assert_equal(change(100000000000), [4000000000, 0, 0, 0])
    assert_raise(RangeError) {change(-50)}
  end

  def test_stretched
    assert_equal(''.stretched, '')
    assert_equal("H e   l\t\tlo".stretched, 'Heelllllllooooo')
    assert_equal('$#'.stretched, '$##')
    assert_equal('       '.stretched, '')
  end

  def test_scramble
    are_anagrams = ->(s, t) { s.split('').sort().join('') == t.split('').sort().join('') }

    ['a', 'rat', 'Ruby testing', '', 'zzz', '^*^*)^▱ÄÈËɡɳɷ'].each do |s|
      assert(are_anagrams[s, scramble(s)])
    end

    possibilities = Set.new 'ABC ACB BAC BCA CAB CBA'.split(' ')
    200.times do
      possibilities.delete(scramble('ABC'))
    end
    assert_equal(possibilities.size, 0)
  end

  def test_powers
    assert_equal(to_enum(:powers, 2, -5).to_a, [])
    assert_equal(to_enum(:powers, 7, 0).to_a, [])
    assert_equal(to_enum(:powers, 3, 1).to_a, [1])
    assert_equal(to_enum(:powers, 2, 63).to_a, [1, 2, 4, 8, 16, 32])
    assert_equal(to_enum(:powers, 2, 64).to_a, [1, 2, 4, 8, 16, 32, 64])
  end

  def test_powers_generator
    g1 = powers_generator(2, 1)
    assert_equal(g1.resume, 1)
    assert_nil(g1.resume)
    assert_raise(FiberError) {g1.resume}
    g2 = powers_generator(3, 100)
    assert_equal(g2.resume, 1)
    assert_equal(g2.resume, 3)
    assert_equal(g2.resume, 9)
    assert_equal(g2.resume, 27)
    assert_equal(g2.resume, 81)
    assert_nil(g2.resume)
    assert_raise(FiberError) {g2.resume}
  end

  def test_say
    assert_equal(say[], '')
    assert_equal(say['hi'][], 'hi')
    assert_equal(say['hi']['there'][], 'hi there')
    assert_equal(say['hello']['my']['name']['is']['Colette'][], 'hello my name is Colette')
  end

  def test_interleave
    assert_equal([].interleave(), [])
    assert_equal([1, 4, 6].interleave(), [1, 4, 6])
    assert_equal([].interleave(2, 3), [2, 3])
    assert_equal([1].interleave(9), [1, 9])
    assert_equal([8, 8, 3, 9].interleave(1), [8, 1, 8, 3, 9])
    assert_equal([2].interleave(7, '8', {}), [2, 7, '8', {}])
  end

  def test_pokemon_sprites
    ditto_sprites = pokemon_sprites('ditto')
    assert ditto_sprites.key?('front_default')
    assert ditto_sprites['front_shiny'].include?('sprites/pokemon/shiny/132.png')
    assert_raise_message('API responded with 404') do
      pokemon_sprites('fh7824gf827g273fg')
    end
  end
end