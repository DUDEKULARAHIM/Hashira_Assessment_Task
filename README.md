
# 🔐 Hashira problem statement task completed.

# 🔐 Shamir's Secret Sharing - Secret Recovery Tool

This project is a **Node.js implementation** of a simplified version of **Shamir's Secret Sharing** algorithm. It reconstructs the secret (the constant term `c` in the polynomial) from encoded shares using **Lagrange Interpolation**.

---

## 🧩 Problem Statement

You're given a polynomial of degree `m`:

f(x) = aₘxᵐ + aₘ₋₁xᵐ⁻¹ + ... + a₁x + c




To reconstruct this polynomial, you need at least `k = m + 1` valid points `(x, y)`.

These points are provided in a JSON format where:

- The key is `x` (e.g., `"2"`)
- The value is an object with:
  - `"base"` – the number base used to encode the y-value
  - `"value"` – the y-value encoded in the given base

Your task is to:
- Decode the y-values into integers
- Select any `k` valid points
- Use **Lagrange interpolation at x = 0** to calculate the constant term `c`, which is the **secret**

---

## 📦 Features

- Decode arbitrary base numbers using native logic
- Support multiple test cases in a single JSON file
- Compute the secret using accurate `BigInt` math
- Check and validate number of valid shares against required `k`
- Warn if `n` (declared total shares) is inconsistent with actual data
- Skip invalid or malformed shares safely

---

## 📂 File Structure

├── recoverSecret.js # Main program
├── input.json # Test cases in JSON format
└── README.md # This file




---

## 🧮 Math Behind the Scenes

We use **Lagrange interpolation** at `x = 0` to compute the constant term of the polynomial:



---

## 📥 Sample `input.json`

```json
[
  {
    "keys": { "n": 4, "k": 3 },
    "1": { "base": "10", "value": "4" },
    "2": { "base": "2",  "value": "111" },
    "3": { "base": "10", "value": "12" },
    "6": { "base": "4",  "value": "213" }
  },
  {
    "keys": { "n": 10, "k": 7 },
    "1": { "base": "6",  "value": "13444211440455345511" },
    "2": { "base": "15", "value": "aed7015a346d63" },
    "3": { "base": "15", "value": "6aeeb69631c227c" },
    "4": { "base": "16", "value": "e1b5e05623d881f" },
    "5": { "base": "8",  "value": "316034514573652620673" },
    "6": { "base": "3",  "value": "2122212201122002221120200210011020220200" },
    "7": { "base": "3",  "value": "20120221122211000100210021102001201112121" },
    "8": { "base": "6",  "value": "20220554335330240002224253" },
    "9": { "base": "12", "value": "45153788322a1255483" },
    "10": { "base": "7", "value": "1101613130313526312514143" }
  }
]


# how to run it

node secret_solver.js

✅ Secret for Test Case 1: 3
✅ Secret for Test Case 2: 79836264049851


❌ Test Case 3: Only 2 valid shares found, but k = 3.

 Tech Stack
JavaScript (Node.js)

No external modules

Uses BigInt for large number arithmetic


Thanking you ,i am waiting for your call.