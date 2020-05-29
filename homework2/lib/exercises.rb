# Accepts a number of U.S. cents and returns an array containing,
# the smallest number of U.S. quarters, dimes, nickels, and pennies
# that equal the given amount.
def change(amount)
    raise RangeError, "amount cannot be negative" if amount < 0
    results = []
    [25, 10, 5, 1].each {
        |element|
        results << (amount / element)
        amount = amount % element
    }
    results
end

# Method added to the String class that returns a new string equal 
# to the receiver with all whitespace removed and then with the
# i-th character repeated i times
class String
    def stretched
        self.gsub!(/\s/, '')
        (1..self.length)
            .map(&->(x) {self[x-1] * x})
            .join('')
    end
end

# Randomly permutes a string. Each time the function is called 
# for a given argument, all possible permutations are equally likely. 
# Implementation based on Fisher-Yates shuffle.
def scramble(string)
    (string.length-1).downto(1).each do |x|
        randomInt = rand(x + 1)
        string[randomInt], string[x] = string[x], string[randomInt]
    end
    string
end

# Method that yields successive powers of a base starting at 1
# and going up to some limit. Implementation based on my
# homework 1.
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

# A “chainable” lambda that accepts one string per call, but when
# called without arguments, returns the words previously passed
# in order and separated by a single space.
# In order to call function without arguments, a default parameter 
# is provided.
def say
    lambda {
        |string = nil|
        return '' if string == nil
        return lambda {
            |next_string = nil|
            return string if next_string == nil
            return say[string + ' ' + next_string]
        }
    }
end

# A method that interleaves an array with a bunch of values.
# If the array length is not the same as the number of values to 
# interleave, the “extra” elements should end up at the end of the 
# result. Implementation based on Dr.Toal's homework 1 solution.
class Array
    def interleave(*values)
        first_length = self.length
        second_length = values.length
        max_length = [first_length, second_length].max
        results = []
        (0...max_length).each do |x|
            results << self[x] if x < first_length
            results << values[x] if x < second_length
        end
        results
    end
end 

# Method returns the sprites for a given Pokemon the Poké API. 
# The sole argument of the function is the name of the Pokemon.
# An exception is raised when response is not successful.
def pokemon_sprites(pokemon)
    require 'net/http'
    require 'json'
    url = "https://pokeapi.co/api/v2/pokemon/" + pokemon
    uri = URI(url)
    begin
        response = Net::HTTP.get(uri)
        JSON.parse(response)['sprites']
    rescue
        code_response = Net::HTTP.get_response(uri).code
        raise JSON::ParserError, "API responded with " + code_response
    end   
end