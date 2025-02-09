"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const node_fetch_1 = __importDefault(require("node-fetch"));
// Function to check if a number is prime
function isPrime(number) {
    if (number <= 1)
        return false;
    if (number <= 3)
        return true;
    if (number % 2 === 0 || number % 3 === 0)
        return false;
    for (let i = 5; i * i <= number; i = i + 6) {
        if (number % i === 0 || number % (i + 2) === 0)
            return false;
    }
    return true;
}
// Function to check if a number is a perfect number
function isPerfect(number) {
    if (number <= 1)
        return false; // 1 and numbers less than 1 are not perfect
    let sumOfDivisors = 1; // 1 is always a proper divisor
    for (let i = 2; i * i <= number; i++) {
        if (number % i === 0) {
            sumOfDivisors += i;
            if (i * i !== number) { // Avoid adding square root twice for perfect squares
                sumOfDivisors += number / i;
            }
        }
    }
    return sumOfDivisors === number;
}
// Function to check if a number is an Armstrong number
function isArmstrong(number) {
    if (number < 0)
        return false; // Armstrong numbers are non-negative
    const numStr = String(number);
    const numDigits = numStr.length;
    let sum = 0;
    for (let i = 0; i < numDigits; i++) {
        const digit = parseInt(numStr[i], 10);
        sum += Math.pow(digit, numDigits);
    }
    return sum === number;
}
// Function to get parity of a number ("odd" or "even")
function getParity(number) {
    return number % 2 === 0 ? "even" : "odd";
}
// Function to calculate the sum of digits of a number
function getDigitSum(number) {
    let sum = 0;
    const numStr = String(number);
    for (let i = 0; i < numStr.length; i++) {
        sum += parseInt(numStr[i], 10);
    }
    return sum;
}
const app = (0, express_1.default)();
const port = 3000;
app.use((0, cors_1.default)());
app.get('/api/classify-number', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const numberParam = req.query.number;
    if (!numberParam) {
        return res.status(400).json({ error: true, message: "Missing 'number' parameter." });
    }
    const number = parseInt(String(numberParam), 10);
    if (isNaN(number)) {
        return res.status(400).json({ error: true, message: "Invalid 'number' parameter. Must be an integer." });
    }
    // --- Fun fact from Numbers API ---
    let funFact = "Could not retrieve fun fact."; // Default fact in case of error
    try {
        const numbersApiUrl = `http://numbersapi.com/${number}/math`; // Construct Numbers API URL
        const numbersApiResponse = yield (0, node_fetch_1.default)(numbersApiUrl); // Fetch from Numbers API
        if (numbersApiResponse.ok) { // Check if the request was successful (status code 2xx)
            funFact = yield numbersApiResponse.text(); // Get response text as fun fact
        }
        else {
            console.error(`Numbers API error: ${numbersApiResponse.status} ${numbersApiResponse.statusText}`);
            funFact = "Error retrieving fun fact from Numbers API."; // More informative error fact
        }
    }
    catch (error) {
        console.error("Error fetching fun fact:", error);
        funFact = "Failed to get fun fact due to network error."; // Network error fact
    }
    const armstrong = isArmstrong(number); // Get boolean result for isArmstrong
    const parity = getParity(number); // Get "odd" or "even" string
    const properties = []; // Initialize an empty properties array
    if (armstrong) {
        properties.push("armstrong"); // Add "armstrong" if it's an Armstrong number
    }
    properties.push(parity); // Always add "odd" or "even" (parity)
    const responseData = {
        number: number,
        is_prime: isPrime(number),
        is_perfect: isPerfect(number),
        properties: properties,
        digit_sum: getDigitSum(number),
        fun_fact: funFact
    };
    return res.status(200).json(responseData);
}));
app.get('/', (req, res) => {
    res.send('Number Classification API is running. Use /api/classify-number?number=...');
});
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
