// const http = require('http');

// // Create an HTTP server
// const server = http.createServer((req, res) => {
//   if (req.method === 'GET' && req.url === '/') {
//     // Set the response headers and status code
//     res.writeHead(200, { 'Content-Type': 'application/json' });

//     // Send a JSON response
//     res.end(JSON.stringify({ message: 'Success! GET request completed.' }));
//   } 
//   else if (req.method === 'POST' && req.url === '/data') {
//     let body = '';

//     // Collect data chunks from the request
//     req.on('data', chunk => {
//       body += chunk.toString(); // Convert buffer to string
//     });

//     // When all the data has been received
//     req.on('end', () => {
//       try {
//         // Parse the received data (assuming it's JSON)
//         const parsedData = JSON.parse(body);

//         // Extract name and password from the received data
//         const { name, password } = parsedData;

//         // Check if both name and password are provided
//         if (name && password) {
//           // Set the response headers and status code
//           res.writeHead(200, { 'Content-Type': 'application/json' });

//           // Send a JSON response with the extracted data
//           res.end(JSON.stringify({
//             message: 'Data received successfully!',
//             receivedData: { name, password }
//           }));
//         } else {
//           // Send a bad request response if data is missing
//           res.writeHead(400, { 'Content-Type': 'application/json' });
//           res.end(JSON.stringify({
//             message: 'Bad Request: Name and password are required!'
//           }));
//         }
//       } catch (error) {
//         // Handle JSON parse errors or other issues
//         res.writeHead(400, { 'Content-Type': 'application/json' });
//         res.end(JSON.stringify({
//           message: 'Invalid JSON format!',
//           error: error.message
//         }));
//       }
//     });
//   } else {
//     // Handle 404 for unsupported routes
//     res.writeHead(404, { 'Content-Type': 'application/json' });
//     res.end(JSON.stringify({ message: 'Not Found' }));
//   }

// });

// // Start the server and listen on port 3000
// const port = 3000;
// server.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

