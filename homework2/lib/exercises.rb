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
        (1..self.length).map(&->(x) {self[x-1] * x}).join('')
    end
end

def scramble(string)
    (string.length-1).downto(1).each do |x|
        randomInt = rand(x + 1)
        string[randomInt], string[x] = string[x], string[randomInt]
    end
    string
end