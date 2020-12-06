import uView from "uview-ui";

const headers = {}
export function globalRequest(url, data, method) {
	//拦截POST请求
	if (method === 'POST') headers['content-Type'] = 'application/json;charset=UTF-8'
	else headers['content-Type'] = 'application/json'
	return new Promise((resolve, reject) => {
		uni.request({
			url: url,
			data: data,
			method: method,
			dataType: 'json',
			header: headers,
			success(res) {
				if (res.statusCode && res.statusCode !== 200) {
					reject(res)
				} else {
					if (res.data.code !== 200) {
						uni.showToast({
							title:res.data.msg,
							icon:'none',
							mask:true
						})
						resolve()
					}
					resolve(res.data.data)
				}
			},
			fail(err) {
				reject('网络出错');
			}
		})
	});
}
