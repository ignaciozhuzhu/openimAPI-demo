var http = require('http');
var count = 0;

http.createServer(function(request, response) {

	// ·¢ËÍ HTTP Í·²¿ 
	// HTTP ×´Ì¬Öµ: 200 : OK
	// ÄÚÈÝÀàÐÍ: text/plain
	response.writeHead(200, {
		'Content-Type': 'text/plain'
	});

	TopClient = require('ali-top-sdk').TopClient;

	var client = new TopClient({
		'appkey': '23409428',
		'appsecret': '',
		'REST_URL': 'gw.api.taobao.com/router/rest '
	});

	client.execute('taobao.openim.relations.get', {
		'beg_date': '20161121',
		'end_date': '20161231',
		'user': {
			'uid': 'wyc'
		}
	}, function(error, response) {
		if (!error && count == 0) {
			console.log(response.users);
			console.log("-----------------------------");
			count++;
		} else if (!error && count != 0) {} else console.log(error);
	});

}).listen(8888);

// ÖÕ¶Ë´òÓ¡ÈçÏÂÐÅÏ¢
console.log('Server running at http://127.0.0.1:8888/');