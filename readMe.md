初学uniapp做的一个list和详情的demo
# 列表查询和详情的Demo
使用uniapp做的一个列表查询和详情html的展示,
通过接口请求数据后进行展示,每条数据内的infoContent是html字符串,点击行数据后自动解析html

**功能**:
下拉刷新、上拉加载,条件筛选(日期范围,下拉框,输入框),点击查询详情,自动解析html

# 依赖插件
> 有问题的话请直接查看对应插件的说明文档
* [z-paging列表](https://ext.dcloud.net.cn/plugin?id=3935)
* [下拉选择器](https://ext.dcloud.net.cn/plugin?id=8159)
* [uni-datetime-picker 日期选择器](https://ext.dcloud.net.cn/plugin?id=3962)

# 使用步骤

**重要**

**请下载示例工程导入后独自修改,不要直接下载插件并导入Hbuildx中**

**然后在manifest.json中重新获取下Appid**

搜索框的数据都绑定在对应的v-model中

因为模拟数据,所有搜索条件都没用

查询方法是zQuery

触发的搜索方法不要直接给list复制,而是使用this.$refs.paging.reload();自动重新加载

使用真实的接口时,请取消http/request.js里面的对应的注释并修改属性名:
```js
// 发送实际的网络请求开始
取消这里面的注释(注意属性名)
// 发送实际的网络请求结束

// 模拟数据开始
把这里面的删除
// 模拟数据结束
```
# 演示
