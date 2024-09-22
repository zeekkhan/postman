
const http = require('http');


let storedData = {}; // Object to store data for PUT and DELETE operations

// Create an HTTP server

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {

    // Set the response headers and status code

    res.writeHead(200, { 'Content-Type': 'application/json' });

    // Send a JSON response
    
    res.end(JSON.stringify({ message: 'Success! GET request completed.' }));
  } 

  else if (req.method === 'POST' && req.url === '/data') {
    
    let body = [];


    // Collect data chunks from the request
    
    req.on('data', chunk => {
      body += chunk.toString(); // Convert buffer to string
    });


    // When all the data has been received


    req.on('end', () => {
      try {
        const parsedData = JSON.parse(body);
        const { id, name, password } = parsedData;

        if (id && name && password) {
          storedData[id] = { name, password };

          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            message: 'Data saved successfully!',
            receivedData: { id, name, password }
          }));
        } else {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Bad Request: id, name, and password are required!' }));
        }

      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Invalid JSON format!', error: error.message }));
      }
    });
  } 
  else if (req.method === 'PUT' && req.url.startsWith('/data/')) {
    const id = req.url.split('/')[2]; // Extract the ID from the URL
    let body = '';


    // Collect data chunks from the request
    
    req.on('data', chunk => {
      body += chunk.toString();
    });

    // When all the data has been received
    req.on('end', () => {
      try {
        const parsedData = JSON.parse(body);
        const { name, password } = parsedData;


        if (storedData[id]) {
        
          // Update the existing record
        
          storedData[id] = { name, password };

          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Data updated successfully!', updatedData: { id, name, password } }));
        } else {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Record not found for this id!' }));
        }
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Invalid JSON format!', error: error.message }));
      }
    });
  } 
  else if (req.method === 'DELETE' && req.url.startsWith('/data/')) {
    const id = req.url.split('/')[2]; // Extract the ID from the URL

    if (storedData[id]) {


      delete storedData[id]; // Remove the record from storedData
      
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: `Record with id ${id} deleted successfully!` }));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Record not found for this id!' }));
    }
  } 
  
  else {

    // Handle 404 for unsupported routes
    
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Not Found' }));
  }
  
});


// Start the server and listen on port 3000

const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
