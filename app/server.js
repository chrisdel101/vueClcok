require('dotenv').config()
const https = require('http')
const fs = require('fs')
const path = require('path')
const Twitter = require('twitter')


const client = new Twitter({
	consumer_key: process.env.CONSUMER_KEY,
	consumer_secret: process.env.CONSUMER_SECRET,
	access_token_key: process.env.ACCESS_TOKEN_KEY,
	access_token_secret: process.env.ACCESS_TOKEN_SECRET
})
console.log(client)
var params = {
	screen_name: 'The_Separator'
};

client.get(' https://api.twitter.com/1.1/statuses/show.json?id=210462857140252672', params, function(error, tweets, response) {
	if (!error) {
		console.log(tweets);
	} else {
		console.log('ERROR', error)
	}
});
//no instance needed, just and open server
// https.createServer(function(req, res) {
//
// 	console.log(`${req.method} request for ${req.url}`)
//
// 	//if req is homepage-
// 	// serve index file with fs.readFile(path)
// 	if (req.url === "/") {
//
//
// 		//-----------HOME PAGE ---------------
// 		// after file is read, then the callbacj fires and response is sent
// 		fs.readFile("./index.html", "UTF-8", function(err, html) {
//
// 			// this is reponse
// 			res.writeHead(200, {
// 				"Content-Type": "text/html"
// 			})
// 			res.end(html);
// 		});
//
// 	} else if (req.url === "/twitter") {
// 		let body = [];
// 		let promise = new Promise((resolve, reject) => {
// 			req.on('error', (err) => {
// 				if (err) {
// 					console.error(err);
// 					reject(error)
// 				}
// 			}).on('data', (chunk) => {
// 				// console.log(chunk)
// 				body.push(chunk);
// 			}).on('end', () => {
// 				if (body === typeof 'string') {
// 					body = Buffer.concat(body).toString();
// 				}
// 				// console.log('body', body)
// 				resolve(body)
// 			})
// 		}).then(image => {
// 			console.log('image resolved')
// 			client.post('media/upload', {
// 				media: image
// 			}, (err, media, res) => {
// 				if (!err) {
//
// 					// If successful, a media object will be returned.
// 					console.log(media);
//
// 					// Lets tweet it
// 					var status = {
// 						status: 'I am a tweet',
// 						media_ids: media.media_id_string // Pass the media id string
// 					}
//
// 					client.post('statuses/update', status, function(error, tweet, response) {
// 						if (!error) {
// 							console.log(tweet);
// 						}
// 					});
//
// 				} else {
// 					console.error('error', err)
// 				}
// 			})
// 			// const options = {
// 			// 	hostname: 'upload.twitter.com',
// 			// 	path: '/1.1/media/upload.json',
// 			// 	method: 'POST',
// 			// 	headers: {
// 			// 		'Content-Type': 'application/x-www-form-urlencoded'
// 			// 	}
// 			// }
// 			// console.log('options', options)
// 			// const req = https.request(options, (res) => {
// 			// 	console.log('request made')
// 			// 	// console.log(`STATUS: ${res.statusCode}`);
// 			// 	// console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
// 			// 	// res.setEncoding('utf8');
// 			// 	// res.on('data', (chunk) => {
// 			// 	// 	console.log(chunk)
// 			// 	// 	console.log(`BODY: ${chunk}`);
// 			// 	// });
// 			// 	// res.on('end', () => {
// 			// 	// 	console.log('No more data in response.');
// 			// 	//
// 			// 	// });
// 			// });
// 			//
// 			// req.on('error', (e) => {
// 			// 	console.error(`problem with request: ${e.message}`);
// 			// });
// 			// req.write(image)
// 		}).catch((e) => {
//
// 			console.error('error', e)
// 		})
//
//
//
//
//
// 		// -------------404-----------------------
// 		// if not homepage, return headers that respond with 404
// 	} else {
// 		res.writeHead(404, {
// 			"Content-Type": "text/plain"
// 		});
// 		res.end("404 file not found")
//
// 	}
//
// }).listen(3000); //server req


// console.log("File Server is running on port 3000")