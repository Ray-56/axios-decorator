# axios-decorator
基于Decorator封装axios

## 安装

## 使用修饰器
+ @GET
```javascript
@GET('/v1/topics')
@GET('/v1/{0}', 'topics')
@GET('https://cnodejs.org/api/v1/topics')
@GET({url: '/v1/topics', params: {limit: 10}})
@GET('/v1/topic/{topicId}')
```
+ @POST
```javascript
@POST({url: '/user', data: {id: 99, name: '99归一'}})
```
+ @PUT
+ #DELETE
+ #HTTP
+ #Config
    + 请求信息, 与axios一致
+ #Headers
    * 请求头
+ #Cancel
+ #Multipart
+ #FormUrlEncoded
    * 文件上传
