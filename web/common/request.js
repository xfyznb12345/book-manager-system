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
				if (res.statusCode === 200) {
					if(res.data.code !== 200){
						uni.showTost({
							title:res.data.msg,
							icon:'error',
							duration:2000,
							mask:false
						})
					}else{
						resolve(res.data)
					}
				}
				else reject(res.data)
			},
			error(e) {
				reject('网络出错');
			}
		})
	});
}
