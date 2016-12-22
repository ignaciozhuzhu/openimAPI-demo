var http = require('http');
var count = 0;

http.createServer(function(request, response) {

	response.writeHead(200, {
		'Content-Type': 'text/plain'
	});

	TopClient = require('ali-top-sdk').TopClient;

	var client = new TopClient({
		'appkey': '23409428',
		'appsecret': '',
		'REST_URL': 'gw.api.taobao.com/router/rest '
	});

	client.execute('taobao.openim.users.get', {
		'userids': '18500000000'
	}, function(error, response) {
		if (!error && count == 0) {
			console.log(response.userinfos);
			console.log("-----------------------------");
			count++;
		} else if (!error && count != 0) {} else console.log(error);
	});
	response.end('end' + '\n');

}).listen(8888);

console.log('Server running at http://127.0.0.1:8888/');