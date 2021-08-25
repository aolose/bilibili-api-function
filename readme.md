# Unlock Bilibili regional restrictions

[Read before use（unblock-area-limit）](https://github.com/ipcjs/bilibili-helper/blob/user.js/packages/unblock-area-limit/README.md)

Here is a node script for proxy api.bilibili.com.
If you want to remove the HK's limit you should depoly it in HK nodes.


---

### How to use - An Example for Unlock HK limit on tencentCloud


- 1.go to [https://console.cloud.tencent.com](https://console.cloud.tencent.com/)
- 2.Create a Serverless app, Choose Web App - Express app
- 3.Choose HK 

![](0.png)
- 4.After depoly done,go to Functions Service

![](1.png)
- 5.Click the function name
- 6.Replace app.js  
   
![](3.png) 
- 7.Depoly     

![](4.png) 
- 8.Fill in your app address and endwidth /playurl  e.g `https://service-XXXXXXX.hk.apigw.tencentcs.com/release/playurl`

![](5.png)     
