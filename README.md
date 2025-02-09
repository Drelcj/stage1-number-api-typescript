Markdown

# Number Classification API

## Description

This API takes an integer as input and returns interesting mathematical properties about that number, along with a fun fact. It's built using Node.js, Express, and TypeScript.

## API Specification

**Endpoint:**

`GET <your-deployed-url>/api/classify-number?number=YOUR_NUMBER`

or for local development:

`GET http://localhost:3000/api/classify-number?number=YOUR_NUMBER`

**Request Parameters:**

*   `number` (required): An integer to be classified.

**Request Method:**

*   `GET`

**Successful Response (200 OK) JSON Format:**

```json
{
    "number": <integer>,
    "is_prime": <boolean>,
    "is_perfect": <boolean>,
    "properties": [<string array>], // e.g., ["armstrong", "odd"] or ["even"] or ["odd"] etc.
    "digit_sum": <integer>,
    "fun_fact": <string> // Fun fact about the number from Numbers API
}
Example 200 OK Response (for number 371):

JSON

{
    "number": 371,
    "is_prime": false,
    "is_perfect": false,
    "properties": ["armstrong", "odd"],
    "digit_sum": 11,
    "fun_fact": "371 is an Armstrong number because 3^3 + 7^3 + 1^3 = 371"
}
Bad Request Response (400 Bad Request) JSON Format:

JSON

{
    "number": "<invalid_input>", // The invalid input that caused the error
    "error": true,
    "message": "<error_message>" // Description of the error
}
Example 400 Bad Request Response (for invalid input "alphabet"):

JSON

{
    "number": "alphabet",
    "error": true,
    "message": "Invalid 'number' parameter. Must be an integer."
}
Technologies Used
Node.js
Express.js (Framework)
TypeScript (Programming Language)
cors (Middleware for Cross-Origin Resource Sharing)
node-fetch (Library for making HTTP requests to Numbers API)
ts-node (For development server)
Setup Instructions (For Local Development)
Clone the repository:

Bash

git clone <YOUR_GITHUB_REPOSITORY_URL>
cd stage1-number-api-typescript
(Replace <YOUR_GITHUB_REPOSITORY_URL> with the actual URL of your GitHub repository)

Install dependencies:

Bash

npm install
Run the API server:

Bash

npm start
The server will start and will be accessible at http://localhost:3000.

How to Use the API
To classify a number, make a GET request to the /api/classify-number endpoint with the number parameter.

Examples:

Valid Request (Number 371):

Browser URL: http://localhost:3000/api/classify-number?number=371
curl command:
Bash

curl http://localhost:3000/api/classify-number?number=371
Expected 200 OK Response (example - fun fact may vary):
JSON

{
    "number": 371,
    "is_prime": false,
    "is_perfect": false,
    "properties": ["armstrong", "odd"],
    "digit_sum": 11,
    "fun_fact": "371 is an Armstrong number because 3^3 + 7^3 + 1^3 = 371"
}
Invalid Request (Missing 'number' parameter):

Browser URL: http://localhost:3000/api/classify-number
curl command:
Bash

curl http://localhost:3000/api/classify-number
Expected 400 Bad Request Response:
JSON

{
    "number": null,
    "error": true,
    "message": "Missing 'number' parameter."
}
Invalid Request (Invalid 'number' - not an integer):

Browser URL: http://localhost:3000/api/classify-number?number=abc
curl command:
Bash

curl http://localhost:3000/api/classify-number?number=abc
Expected 400 Bad Request Response:
JSON

{
    "number": "abc",
    "error": true,
    "message": "Invalid 'number' parameter. Must be an integer."
}
Deployment (Optional - if you deployed your API)
(If you have deployed your API to a platform like Render, Vercel, Netlify, etc., provide the deployment URL here and any specific instructions for accessing the deployed API.)

For example:

This API is deployed and publicly accessible at:  <YOUR_DEPLOYED_API_URL>

GitHub Repository
<YOUR_GITHUB_REPOSITORY_URL>
(Replace <YOUR_GITHUB_REPOSITORY_URL> with the actual URL of your GitHub repository)

Author
[Drelcj]