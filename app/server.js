require('dotenv').config()
const https = require('http')
const fs = require('fs')
const path = require('path')
const Twitter = require('twitter')
const streamTransform = require('stream').Transform
const Stream = require('stream')
const {
	Facebook,
	FacebookApiException
} = require('fb')
// const fb = new Facebook(options)




const client = new Twitter({
	consumer_key: process.env.CONSUMER_KEY,
	consumer_secret: process.env.CONSUMER_SECRET,
	access_token_key: process.env.ACCESS_TOKEN_KEY,
	access_token_secret: process.env.ACCESS_TOKEN_SECRET
})
// console.log(client)
// var params = {
// 	screen_name: 'The_Separator'
// };
//
// client.get(' https://api.twitter.com/1.1/statuses/show.json?id=210462857140252672', params, function(error, tweets, response) {
// 	if (!error) {
// 		console.log(tweets);
// 	} else {
// 		console.log('ERROR', error)
// 	}
// });
var imageToClient = ''
https.createServer(function(req, res) {

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
		if (req.method === 'GET') {
			console.log('get req')
			// console.log(typeof imageToClient)
			console.log(imageToClient)
			let params = {
				command: 'STATUS',
				media_id: imageToClient.media_id_string
			}
			console.log('params', params)
			client.get('media/upload', params, function(error, upload, response) {
				console.log('get made to status')
				console.log('first', upload);
			})
			let params1 = {
				command: 'STATUS',
				media_id: imageToClient.media_id
			}
			client.get('media/upload', params1, function(error, upload, response) {
				console.log('get made to status')
				console.log('second', upload);
			})

			// var params = {
			// 	screen_name: 'The_Seperator'
			// };
			// client.get('statuses/user_timeline', params, function(error, tweets, response) {
			// 	if (!error) {
			// 		console.log(tweets);
			// 	} else {
			// 		console.error('error:', error)
			// 	}
			// });
			res.end()
		} else if (req.method === 'POST') {
			console.log('post')
			// receieves a POST
			let body = [];
			new Promise((resolve, reject) => {
					req.on('error', (err) => {
						if (err) {
							console.error(err);
							reject(error)
						}
					}).on('data', (chunk) => {
						// console.log(chunk)
						body.push(chunk);
					}).on('end', () => {
						// if (body === typeof 'string') {
						body = Buffer.concat(body).toString();
						// }
						// var request = require('request'),
						// 	url = 'http://upload.wikimedia.org/wikipedia/commons/8/8c/JPEG_example_JPG_RIP_025.jpg';

						// console.log()
						// fs.writeFile('downloaded.jpg', body, 'binary', function(err) {});
						// console.log(body)
						// console.log('body', body.substring(1, 150))
						// console.log('body', body)
						resolve(body)
					});

					// decode = body
					// console.log('push to decode')
				})
				// })
				.then(base64Data => {
					// console.log('below', base64Data.substring(1, 150))
					base64Data = decodeBase64Image(base64Data)
					let file = fs.writeFileSync('clock.png', base64Data.data, 'base64')


					// var params = {
					// 	screen_name: 'The_Seperator'
					// };
					// client.get('statuses/user_timeline', params, function(error, tweets, response) {
					// 	if (!error) {
					// 		console.log(tweets);
					// 	}
					// });
					let imageFile = fs.readFileSync('/Users/chrisdielschnieder/desktop/code_work/vue/clock_html/app/clock.png')
					// console.log('image', image)
					client.post('media/upload', {
						media: imageFile
					}, function(error, media, response) {

						if (!error) {
							// If successful, a media object will be returned.
							imageToClient = media
							console.log('uploaded')
							// var status = {
							// 	status: 'I am a tweet',
							// 	media_ids: media.media_id_string // Pass the media id string
							// }
							//
							// client.post('statuses/update', status, function(error, tweet, response) {
							// 	if (!error) {
							// 		console.log(tweet);
							// 	}
							// });

						}
						console.log('Done')
						res.end()
					})
				}).catch((e) => {

					console.error('error', e)
				})
			req.on('error', (e) => {
				console.error(`problem with request: ${e.message}`);
			});
		} // 	// req.write(image)
	} else if (req.url === '/hello') {

		// var request = require('request'),
		// 	url = 'http://upload.wikimedia.org/wikipedia/commons/8/8c/JPEG_example_JPG_RIP_025.jpg';
		//
		// request(url, {
		// 	encoding: 'binary'
		// }, function(error, response, body) {
		// 	fs.writeFile('downloaded.jpg', body, 'binary', function(err) {});
		// });
	} else if (req.url === '/test') {
		// console.log(res)
		// res.writeHead(404, {
		// 	"Content-Type": "text/plain"
		// });
		// console.log('decode', decode.substring(0, 300))
		// console.log('decode', decode.substr(-10   ))
		res.write(decode)
		decode = ''
		// console.log('decode', decode.substring(0, 300))
		res.end()
		// -------------404-----------------------
		// if not homepage, return headers that respond with 404
	} else {
		res.writeHead(404, {
			"Content-Type": "text/plain"
		});
		res.end("404 file not found")

	}

	function decodeBase64Image(dataString) {
		var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
			response = {};

		if (matches.length !== 3) {
			return new Error('Invalid input string');
		}

		response.type = matches[1];
		response.data = new Buffer(matches[2], 'base64');

		return response;
	}
}).listen(3000); //server req


console.log("File Server is running on port 3000")