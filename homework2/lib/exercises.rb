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

class String
    def stretched
        self.gsub!(/\s/, '')
        (1..self.length)
            .map(&->(x) {self[x-1] * x})
            .join('')
    end
end

def scramble(string)
    (string.length-1).downto(1).each do |x|
        randomInt = rand(x + 1)
        string[randomInt], string[x] = string[x], string[randomInt]
    end
    string
end

def powers(base, limit)
    value = 1
    while value <= limit
        yield value
        value *= base
    end
end

def powers_generator(base, limit)
    value = 1
    f = Fiber.new do
        while value <= limit
            Fiber.yield value
            value *= base
        end
    end
end

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