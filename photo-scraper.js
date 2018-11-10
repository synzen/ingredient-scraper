var gis = require('g-i-s');
var download = require('image-downloader')
const fs = require('fs-extra')

searchTitle = '2017 Tesla Model X';

gis(searchTitle, logResults);

function dirPlanner(folder) {
	var newPath = folder.replace(/\s+/g, '-').toLowerCase();
	try {
		fs.ensureDir(newPath);
		console.log('success!');
	} catch (err) {
		console.error(err);
		process.exit(-1);
	}
	return newPath;
}

var pathName = dirPlanner(searchTitle);

function fileFormatChecker(filename) {
	if (filename.split('.').reverse()[0] !== 'jpg'){
		return false
	}
	return true
}

function imageDownloader(image) {
	try {
		download.image(image)
		.then(({ filename, image }) => {
			console.log('File saved to', filename)
		})
		.catch((err) => {
			console.error(err)
		})
	}
	catch (err) {
		console.error(err);
	}
}

async function logResults(error, results) {
	if (error) {
	console.log(error);
	}
	else {
		var urlList = [];
		results.forEach(function(i, elem) {
			if(fileFormatChecker(i.url)){
				const options = {
					url: i.url,
					dest: __dirname + `/${pathName}/` + i.url.split('/').reverse()[0].trim(),
				};
				urlList.push(options);
		}
		})
		urlList.forEach(function(i, elem) {
			imageDownloader(i);
		})
	}
	
}