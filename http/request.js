
const loadingTime = 500;
const showLog = false;
// 模拟一些html数据
const htmlList = ["<span style=\"color: rgb(245, 219, 77); font-size: 24px;\"><u> 黄河</u></span>","<p><strong>加粗</strong></p>","<p><span style=\"color: rgb(89, 191, 192);\"><strong>加粗青色</strong></span></p>"]
// 查询普通列表数据
function queryList(data) {
	const listCount = 24;
	// return _queryList(data, listCount);
	return getListData(data, listCount);
}


/**
 * 发送实际的网络请求
 */
function HttpRequest(data){
	// console.log(data);
	return new Promise((resolve, reject)=>{
		// 封装主体：网络请求
		uni.request({
			// url: 'http://localhost/xxxx',
			url: 'http://xxxx',
			data: data || {},		
			method: 'POST',
			success: (res) => {
				console.log(res);		// 控制台显示数据信息
				resolve(res)
			},
			fail: (err) =>{
				// 页面中弹框显示失败
				uni.showToast({
					title: '请求接口失败'
				})
				// 返回错误消息
				reject(err)
			}
		})
	}
	)
}


async function  getListData(data, listCount) {
	if (!data.pageNum || !data.pageSize) {
		return _callQueryResult([]);
	}
	let pageNum = parseInt(data.pageNum);
	let pageSize = parseInt(data.pageSize);
	let type = data.type || 0;
	if (pageNum < 0 || pageSize <= 0) {
		return _callQueryResult([]);
	}
	
	uni.showLoading({
		title: '加载中...'
	})
	if (pageNum == 0) {
		pageNum = 1;
	}
	var totalPagingList = [];
	// 发送实际的网络请求开始
		// await HttpRequest(data).then(res => {
		// 	if(!res.data.rows){
		// 		totalPagingList = []
		// 		return
		// 	}
		// 	totalPagingList = res.data.rows
		// 	for (let item of totalPagingList) {
		// 		if(!item.infoContent){
		// 			continue
		// 		}
		// 		var oDiv = document.createElement('div');
		// 		oDiv.innerHTML = item.infoContent;
		// 		var text = oDiv.innerText;
		// 		item.subTitle = text.split(/[\t\r\f\n\s]*/g).join('').substring(0, 20) + "..."
		// 	}
		// //打印日志在hb中不展示,但在浏览器中正常展示
		// 	console.log(totalPagingList);
		// })
		//  return _callQueryResult(totalPagingList);
	// 发送实际的网络请求结束
//  模拟数据开始
	for (let i = 0; i < listCount; i++) {
			const item = {
				'title': '信息' + (i + 1).toString(),
				'subTitle': (i + 1 + '号信息的子标题...').toString(),
				'content': 'html字符串' 
			};
			if(i < 3){
				item.content = htmlList[i]
			}
			totalPagingList.push(item);
		
	}
	let pageNoIndex = (pageNum - 1) * pageSize;
	if (pageNoIndex + pageSize <= totalPagingList.length) {
		return _callQueryResult(totalPagingList.splice(pageNoIndex, pageSize));
	} else if (pageNoIndex < totalPagingList.length) {
		return _callQueryResult(totalPagingList.splice(pageNoIndex, totalPagingList.length - pageNoIndex));
	} else {
		return _callQueryResult([]);
	}
// 模拟数据结束
	
}


function _callQueryResult(arg) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			uni.hideLoading();
			if (showLog) {
				console.log('%c\n----------响应开始--------', 'color:#0113fa;');
				// #ifdef H5
				console.table(arg);
				// #endif

				// #ifndef H5
				console.log(arg);
				// #endif
				console.log('%c----------响应结束--------\n', 'color:#0113fa;');
			}
			resolve({
				data: {
					list: arg
				}
			});
		}, loadingTime)
	})

}

export default {
	queryList
}
