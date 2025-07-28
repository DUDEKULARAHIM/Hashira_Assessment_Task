
// const fs = require('fs');

// // Lagrange interpolation to recover the constant term (secret)
// function lagrangeInterpolation(x, y) {
//   const k = x.length;
//   let secret = 0n;

//   for (let i = 0; i < k; i++) {
//     let num = 1n;
//     let den = 1n;
//     for (let j = 0; j < k; j++) {
//       if (i !== j) {
//         num *= BigInt(-x[j]);
//         den *= BigInt(x[i] - x[j]);
//       }
//     }
//     const term = (y[i] * num) / den;
//     secret += term;
//   }

//   return secret;
// }

// // Generate combinations of K elements
// function getCombinations(arr, k) {
//   const result = [];
//   function backtrack(start, combo) {
//     if (combo.length === k) {
//       result.push([...combo]);
//       return;
//     }
//     for (let i = start; i < arr.length; i++) {
//       combo.push(arr[i]);
//       backtrack(i + 1, combo);
//       combo.pop();
//     }
//   }
//   backtrack(0, []);
//   return result;
// }

// // Main function
// function findSecretFromJSON(jsonInput) {
//   const data = JSON.parse(jsonInput);
//   const N = data.N;
//   const K = data.K;

//   const shares = Object.entries(data.shares).map(
//     ([key, value]) => [parseInt(key), BigInt(value)]
//   );

//   const combinations = getCombinations(shares, K);
//   const secretMap = new Map();

//   // Try all combinations of K shares to find valid secrets
//   for (const combo of combinations) {
//     const x = combo.map(([xi]) => xi);
//     const y = combo.map(([_, yi]) => yi);
//     try {
//       const secret = lagrangeInterpolation(x, y);
//       const key = secret.toString();
//       secretMap.set(key, (secretMap.get(key) || 0) + 1);
//     } catch (err) {
//       continue;
//     }
//   }

//   // Find the most frequent reconstructed secret
//   let bestSecret = null;
//   let maxCount = 0;
//   for (const [secret, count] of secretMap.entries()) {
//     if (count > maxCount) {
//       maxCount = count;
//       bestSecret = secret;
//     }
//   }

//   console.log(`Identified Secret (c in ax² + bx + c): ${bestSecret}`);
//   return bestSecret;
// }

// // Read JSON file and invoke the main function
// const jsonInput = fs.readFileSync('input.json', 'utf8');
// findSecretFromJSON(jsonInput);










// const fs = require('fs');

// // Function to decode value from given base
// function decodeValue(baseStr, valueStr) {
//     const base = parseInt(baseStr, 10);
//     return parseInt(valueStr, base);
// }

// // Function to compute Lagrange interpolation at x = 0 to get the constant term
// function lagrangeInterpolationAtZero(points) {
//     let secret = 0;

//     for (let i = 0; i < points.length; i++) {
//         const [xi, yi] = points[i];
//         let term = yi;

//         for (let j = 0; j < points.length; j++) {
//             if (i !== j) {
//                 const [xj, _] = points[j];
//                 term *= (-xj) / (xi - xj);
//             }
//         }

//         secret += term;
//     }

//     return Math.round(secret); // Round because of floating-point precision
// }

// // Main function
// function getSecretFromJSON(filePath) {
//     const rawData = fs.readFileSync(filePath);
//     const data = JSON.parse(rawData);

//     const n = data["keys"]["n"];
//     const k = data["keys"]["k"];

//     const points = [];

//     for (const key in data) {
//         if (key === "keys") continue;

//         const x = parseInt(key);
//         const base = data[key]["base"];
//         const value = data[key]["value"];

//         try {
//             const y = decodeValue(base, value);
//             if (!isNaN(y)) {
//                 points.push([x, y]);
//             }
//         } catch (err) {
//             // Skip invalid points
//         }
//     }

//     if (points.length < k) {
//         console.error("Not enough valid points to find the secret.");
//         return;
//     }

//     const selectedPoints = points.slice(0, k);
//     const secret = lagrangeInterpolationAtZero(selectedPoints);

//     console.log("Secret is:", secret);
// }

// // Call with your JSON file path
// getSecretFromJSON('input.json');











// const fs = require('fs');

// // Decode value from base to BigInt
// function decodeValue(baseStr, valueStr) {
//     const base = BigInt(baseStr);
//     let result = BigInt(0);
//     for (let i = 0; i < valueStr.length; i++) {
//         const digit = valueStr[i].toLowerCase();
//         const digitValue = isNaN(digit) ? BigInt(digit.charCodeAt(0) - 87) : BigInt(digit);
//         result = result * base + digitValue;
//     }
//     return result;
// }

// // Lagrange interpolation at x = 0 using BigInt
// function lagrangeInterpolationAtZero(points) {
//     let secret = BigInt(0);

//     for (let i = 0; i < points.length; i++) {
//         const [xi, yi] = points[i];
//         let numerator = BigInt(1);
//         let denominator = BigInt(1);

//         for (let j = 0; j < points.length; j++) {
//             if (i !== j) {
//                 const [xj, _] = points[j];
//                 numerator *= -BigInt(xj);
//                 denominator *= BigInt(xi - xj);
//             }
//         }

//         const term = yi * numerator / denominator;
//         secret += term;
//     }

//     return secret;
// }

// // Main function
// function getSecretFromJSON(filePath) {
//     const rawData = fs.readFileSync(filePath, 'utf8');
//     const data = JSON.parse(rawData);

//     const n = data["keys"]["n"];
//     const k = data["keys"]["k"];
//     const points = [];

//     for (const key in data) {
//         if (key === "keys") continue;

//         const x = parseInt(key);
//         const base = data[key]["base"];
//         const value = data[key]["value"];

//         try {
//             const y = decodeValue(base, value);
//             points.push([x, y]);
//         } catch (err) {
//             console.warn(`Skipping invalid share at x = ${x}:`, err.message);
//         }
//     }

//     if (points.length < k) {
//         console.error("Not enough valid points to find the secret.");
//         return;
//     }

//     const selectedPoints = points.slice(0, k);
//     const secret = lagrangeInterpolationAtZero(selectedPoints);

//     console.log("✅ Secret is:", secret.toString());
// }

// // Call the function with your input file
// getSecretFromJSON('input.json');









// const fs = require('fs');

// // Convert base string + value to BigInt
// function decodeValue(baseStr, valueStr) {
//     const base = BigInt(baseStr);
//     let result = BigInt(0);
//     for (let i = 0; i < valueStr.length; i++) {
//         const digit = valueStr[i].toLowerCase();
//         const digitValue = isNaN(digit) ? BigInt(digit.charCodeAt(0) - 87) : BigInt(digit);
//         result = result * base + digitValue;
//     }
//     return result;
// }

// // Lagrange interpolation at x = 0
// function lagrangeInterpolationAtZero(points) {
//     let secret = BigInt(0);

//     for (let i = 0; i < points.length; i++) {
//         const [xi, yi] = points[i];
//         let numerator = BigInt(1);
//         let denominator = BigInt(1);

//         for (let j = 0; j < points.length; j++) {
//             if (i !== j) {
//                 const [xj] = points[j];
//                 numerator *= -BigInt(xj);
//                 denominator *= BigInt(xi - xj);
//             }
//         }

//         const term = yi * numerator / denominator;
//         secret += term;
//     }

//     return secret;
// }

// // Main: Load input and process all test cases
// function solveAllFromJSON(filePath) {
//     const rawData = fs.readFileSync(filePath, 'utf8');
//     const testCases = JSON.parse(rawData);

//     testCases.forEach((data, index) => {
//         const k = data["keys"]["k"];
//         const points = [];

//         for (const key in data) {
//             if (key === "keys") continue;
//             const x = parseInt(key);
//             const base = data[key]["base"];
//             const value = data[key]["value"];

//             try {
//                 const y = decodeValue(base, value);
//                 points.push([x, y]);
//             } catch (err) {
//                 console.warn(`Skipping invalid share x=${x}:`, err.message);
//             }
//         }

//         if (points.length < k) {
//             console.log(`❌ Test Case ${index + 1}: Not enough valid shares.`);
//             return;
//         } else {
//             const selectedPoints = points.slice(0, k);
//             const secret = lagrangeInterpolationAtZero(selectedPoints);
//             console.log(`✅ Secret for Test Case ${index + 1}: ${secret.toString()}`);
//         }
//     });
// }

// solveAllFromJSON('input.json');











const fs = require('fs');

// Convert base string + value to BigInt
function decodeValue(baseStr, valueStr) {
    const base = BigInt(baseStr);
    let result = BigInt(0);
    for (let i = 0; i < valueStr.length; i++) {
        const digit = valueStr[i].toLowerCase();
        const digitValue = isNaN(digit) ? BigInt(digit.charCodeAt(0) - 87) : BigInt(digit);
        result = result * base + digitValue;
    }
    return result;
}

// Lagrange interpolation at x = 0
function lagrangeInterpolationAtZero(points) {
    let secret = BigInt(0);

    for (let i = 0; i < points.length; i++) {
        const [xi, yi] = points[i];
        let numerator = BigInt(1);
        let denominator = BigInt(1);

        for (let j = 0; j < points.length; j++) {
            if (i !== j) {
                const [xj] = points[j];
                numerator *= -BigInt(xj);
                denominator *= BigInt(xi - xj);
            }
        }

        const term = yi * numerator / denominator;
        secret += term;
    }

    return secret;
}

// Main: Load input and process all test cases
function solveAllFromJSON(filePath) {
    const rawData = fs.readFileSync(filePath, 'utf8');
    const testCases = JSON.parse(rawData);

    testCases.forEach((data, index) => {
        const k = data["keys"]["k"];
        const declaredN = data["keys"]["n"];
        const allPoints = [];

        // Collect all shares
        for (const key in data) {
            if (key === "keys") continue;
            const x = parseInt(key);
            const base = data[key]["base"];
            const value = data[key]["value"];

            try {
                const y = decodeValue(base, value);
                allPoints.push([x, y]);
            } catch (err) {
                console.warn(`Skipping invalid share x=${x}:`, err.message);
            }
        }

        // Check against declared n
        if (declaredN > Object.keys(data).length - 1) {
            console.log(`❌ Test Case ${index + 1}: Declared n=${declaredN} is greater than actual shares.`);
            return;
        }

        // Ensure enough valid shares are available for Lagrange interpolation
        if (allPoints.length < k) {
            console.log(`❌ Test Case ${index + 1}: Only ${allPoints.length} valid shares found, but k = ${k}.`);
            return;
        }

        // Select the first k points and calculate the secret
        const selectedPoints = allPoints.slice(0, k);
        const secret = lagrangeInterpolationAtZero(selectedPoints);

        console.log(`✅ Secret for Test Case ${index + 1}: ${secret.toString()}`);
    });
}

// Run
solveAllFromJSON('input.json');
