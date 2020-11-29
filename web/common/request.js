//get请求封装
const headers = {
	'content-type': 'application/json'
}
export function globalRequest(url, data, method) {
	// switch(method){
	// 	case 1:
	// }
	return new Promise((resolve, reject) => {
		uni.request({
			url: url,
			data: data,
			method: method,
			dataType: 'json',
			header: headers,
			success(res) {
				if (res.statusCode === 200) resolve(res.data)
				else resolve(res.data)
			},
			error(e) {
				reject('网络出错');
			}
		})
	});
}
