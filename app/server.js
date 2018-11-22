const http = require('http');
const fs = require('fs');
const path = require('path');
const Twitter = require('twitter');

const client = new Twitter({
	consumer_key: process.env.CONSUMER_KEY,
	consumer_secret: process.env.CONSUMER_SECRET,
	access_token_key: process.env.PROCESS_TOKEN_KEY,
	access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

//no instance needed, just and open server
http.createServer(function(req, res) {

	console.log(`${req.method} request for ${req.url}`)

	//if req is homepage-
	// serve index file with fs.readFile(path)
	if (req.url === "/") {


		//-----------HOME PAGE ---------------
		// after file is read, then the callbacj fires and response is sent
		fs.readFile("./index.html", "UTF-8", function(err, html) {

			// this is reponse
			res.writeHead(200, {
				"Content-Type": "text/html"
			})
			res.end(html);
		});

	} else if (req.url === "/twitter") {
		let body = [];
		req.on('error', (err) => {
			console.error(err);
		}).on('data', (chunk) => {
			// console.log(chunk)
			body.push(chunk);
		}).on('end', () => {
			body = Buffer.concat(body).toString();
			console.log('body', body)
		})

		// -------------404-----------------------
		// if not homepage, return headers that respond with 404
	} else {
		res.writeHead(404, {
			"Content-Type": "text/plain"
		});
		res.end("404 file not found")

	}

}).listen(3000); //server req


console.log("File Server is running on port 3000")