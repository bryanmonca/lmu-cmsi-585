require 'net/http'
require 'json'

# Accepts a number of U.S. cents and returns an array containing,
# the smallest number of U.S. quarters, dimes, nickels, and pennies
def change(amount)
  raise RangeError, "amount cannot be negative" if amount < 0
  results = []
  [25, 10, 5, 1].each do |element|
    results << (amount / element)
    amount = amount % element
  end
  results
end

# Returns a new string equal to the receiver with the 
# i-th character repeated i times
class String
  def stretched
    without_spaces = self.gsub(/\s/, '')
    (1..without_spaces.length)
      .map{|i| without_spaces[i-1] * i}
      .join('')
  end
end

# Randomly permutes a string. All possible permutations are equally 
# likely. Implementation based on Fisher-Yates shuffle.
def scramble(string)
  (string.length-1).downto(1).each do |i|
    random_index = rand(i + 1)
    string[random_index], string[i] = string[i], string[random_index]
  end
  string
end

# Method that yields successive powers of a base starting at 1
# and going up to some limit.
def powers(base, limit)
  value = 1
  while value <= limit
    yield value
    value *= base
  end
end

# Ruby fiber that yields successive powers of a base starting at 1
# and going up to some limit.
def powers_generator(base, limit)
  value = 1
  f = Fiber.new do
    while value <= limit
      Fiber.yield value
      value *= base
    end
  end
end

# A “chainable” lambda that accepts one string per call, when
# called without arguments, returns the strings previously passed. 
# To call function without arguments, a default parameter is provided.
def say
  lambda do |string = nil|
    return '' if string == nil
    return lambda do |next_string = nil|
      return string if next_string == nil
      return say[string + ' ' + next_string]
    end
  end
end

# Method that interleaves an array with a group of values.
# If the array length and the number of values are not the same,
# the extra elements go at the end of the result. 
class Array
  def interleave(*values)
    first_length = self.length
    second_length = values.length
    max_length = [first_length, second_length].max
    results = []
    (0...max_length).each do |i|
      results << self[i] if i < first_length
      results << values[i] if i < second_length
    end
    results
  end
end 

# Method returns the sprites for a given Pokemon from the Poké API. 
# An exception is raised when response is not successful.
def pokemon_sprites(pokemon_name)
  base_url = "https://pokeapi.co/api/v2/pokemon/"
  uri = URI(base_url + pokemon_name)
  begin
    response = Net::HTTP.get(uri)
    JSON.parse(response)['sprites']
  rescue
    code_response = Net::HTTP.get_response(uri).code
    raise JSON::ParserError, "API responded with " + code_response
  end   
end