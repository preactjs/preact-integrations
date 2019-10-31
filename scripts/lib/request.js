const http = require('http');

function get(url) {
	return new Promise((resolve, reject) => {
		http
			.get(url, res => {
				if (res.statusCode >= 400) {
					// Consume response data to free up memory
					res.resume();

					const error = new Error(
						`Request Failed. \nStatus Code: ${res.statusCode}`
					);
					reject(error);
				}

				res.setEncoding('utf8');

				let rawData = '';
				res.on('data', chunk => {
					rawData += chunk;
				});

				res.on('end', () => {
					resolve(rawData);
				});
			})
			.on('error', reject);
	});
}

module.exports = {
	get
};
