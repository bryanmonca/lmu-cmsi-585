// If you do a little research on how to use crates, there is a a nice one
// called num_integer, which has a cool div_rem function in it, that makes
// the change function awesome. If you use it, your first line in the file
// will be:
//
// use num_integer::div_rem;

pub fn change(amount: i64) -> Result<[i64;4], &'static str> {
    // Implement the change function here
}

pub fn powers(base: u64, limit: u64) -> Vec<u64> {
    // Implement powers here
}

// Implement your cylinder type here (struct and impl)

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
