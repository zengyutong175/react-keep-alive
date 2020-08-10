# react-keep-alive
react  keepAlive实现
## 注意事项
###### 1、KeepAlive都需要一个唯一的cache-id值
###### 2、如果用到了react-router和redux，需要把Context放在两者的里面，否则不能获取到对应的context
###### 3、提供了vue对应的activated、deactivated生命周期方法，提供了deleteCache(key)删除缓存
