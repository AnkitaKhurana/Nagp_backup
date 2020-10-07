var AWSXRay = require('aws-xray-sdk-core')
var captureMySQL = require('aws-xray-sdk-mysql')
var mysql = captureMySQL(require('mysql2'))
const username = process.env.databaseUser || 'admin'
const password = process.env.databasePassword || 'password'
const host = process.env.databaseHost || 'uploads.celpoo9ehe1o.ap-south-1.rds.amazonaws.com'
const AWS = require('aws-sdk')
var s3 = new AWS.S3();


exports.handler = async(event, context) => {
	var bucket = event.Records[0].s3.bucket.name;
	var key = event.Records[0].s3.object.key;
	var size = event.Records[0].s3.object.size;
	var connection = mysql.createConnection({
		host: host,
		user: username,
		password: password,
		database: 'data'
	});
	connection.connect();
	let date = new Date().toISOString().slice(0, 19).replace('T', ' ');
	var result;

	let query = "INSERT INTO myfiles(filename,size, upload) values('" + key +"',"+size+ ",'" + date + "');";
	connection.query(query, function (error, results, fields) {
		if (error) throw error;
			console.log("Ran query: " + query);
			for (result in results)
					console.log(results[result])
	});

	return new Promise((resolve, reject) => {
		connection.end(err => {
			if (err)
				return reject(err)
				
			const response = {
				statusCode: 200,
				body: "Saved to RDS"
			}
			resolve(response)
		})
	});

}