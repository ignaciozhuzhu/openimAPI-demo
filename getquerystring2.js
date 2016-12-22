var http = require('http');
var TopClient = require('ali-top-sdk').TopClient;

http.createServer(function(request, response) {

	response.writeHead(200, {
		'Content-Type': 'text/plain'
	});

	var url = require('url');
	var params = url.parse(request.url, true).query; // params 即为我们需要的参数

	var client = new TopClient({

		//'appkey': '23409428', //患者
		//'appsecret': '',

		'appkey': '23406246', //医生
		'appsecret': '',

		'REST_URL': 'gw.api.taobao.com/router/rest '
	});

	var log = "";
	var ob = {};
	var api = "";
	if (params.api) {
		if (params.api == 'get') {
			api = "taobao.openim.users.get";
			ob = {
				'userids': params.uid
			};
		} else if (params.api == "add") {
			api = "taobao.openim.users.add";
			ob = {
				'userinfos': {
					'userid': params.uid,
					'nick': params.nickname,
					'password': params.password
				}
			};
		} else if (params.api == "update") {
			api = "taobao.openim.users.update";
			ob = {
				'userinfos': {
					'userid': params.uid,
					'nick': params.nickname,
					'password': params.password
				}
			};
		}
		client.execute(api, ob, function(error, resp) {
			if (params.api == 'get') {
				console.log(error)
				if (!error) {
					try {
						console.log(resp.userinfos.userinfos[0]);
						log += 'userid:' + resp.userinfos.userinfos[0].userid + '\n';
						log += 'nick:' + resp.userinfos.userinfos[0].nick + '\n';
						log += 'password:' + resp.userinfos.userinfos[0].password + '\n';
						response.end(log);
					} catch (e) {
						response.end("无结果");
					}
				} //else console.log(error);
			} else if (params.api == 'add') {
				console.log(resp)
				response.end('ok')
			} else if (params.api == 'update') {
				console.log(resp)
				response.end('ok2')
			}
		});
	}

}).listen(8888);

console.log('Server running at http://127.0.0.1:8888/');