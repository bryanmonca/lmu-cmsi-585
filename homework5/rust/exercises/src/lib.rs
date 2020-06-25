use std::f64::consts::PI;

// Accepts a number of U.S. cents and returns a type Result with an
// array for success containing the smallest number of U.S. quarters, 
// dimes, nickels and pennies, and an error message for failure.
pub fn change(amount: i64) -> Result<[i64;4], &'static str> {
    if amount < 0 {
        return Err("amount cannot be negative")
    } else {
        let mut amount = amount;
        let mut results: [i64; 4] = [0, 0, 0, 0];
        let coins = [25, 10, 5, 1];
        for i in 0..results.len() {
            results[i] = amount / coins[i];
            amount = amount % coins[i];
        }
        Ok(results)
    }
}


// Function that returns in a vector successive powers of a base from 1 
// up to some limit.
pub fn powers(base: u64, limit: u64) -> Vec<u64> {
    let mut value: u64 = 1;
    let mut results: Vec<u64> = Vec::new();
    while value <= limit {
        results.push(value);
        value *= base;
    }
    results
}


pub struct Cylinder {
    radius: f64,
    height: f64,
}

impl Cylinder {
    // Method defined on Cylinder, returns the total surface area.
    pub fn surface_area(&self) -> f64 {
        (2.0 * PI * self.radius * self.height) + (2.0 * PI * self.radius.powi(2))
    }

    // Method defined on Cylinder, returns the volume.
    pub fn volume(&self) -> f64 {
        PI * self.radius.powi(2) * self.height
    }
}


#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn change_works_for_negative() {
        assert_eq!(change(-2), Err("amount cannot be negative"));
        assert_eq!(change(-200000), Err("amount cannot be negative"));
    }

    #[test]
    fn change_works_for_zero() {
        assert_eq!(change(0), Ok([0, 0, 0, 0]));
    }

    #[test]
    fn change_works_for_positive_amounts() {
        assert_eq!(change(5), Ok([0, 0, 1, 0]));
        assert_eq!(change(25), Ok([1, 0, 0, 0]));
        assert_eq!(change(97), Ok([3, 2, 0, 2]));
        assert_eq!(change(1000000000), Ok([40000000, 0, 0, 0]));
    }

    #[test]
    fn powers_works() {
        assert_eq!(powers(2, 0), []);
        assert_eq!(powers(3, 1), [1]);
        assert_eq!(powers(2, 63), [1, 2, 4, 8, 16, 32]);
        assert_eq!(powers(2, 64), [1, 2, 4, 8, 16, 32, 64]);
    }

    #[test]
    fn cylinder_is_implemented_okay() {
        let c = Cylinder { radius: 3.0, height: 5.0 };
        assert_eq!(format!("{:.5}", c.surface_area()), "150.79645");
        assert_eq!(format!("{:.5}", c.volume()), "141.37167");
    }
}
