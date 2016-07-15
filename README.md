# helperJs

 ## 原生封装了的小工具集合

## API说明

**Helper.noConflict @class {Function}**    
*@return {Object} Helper*    
**功能**：如果命名空间冲突，则使用该方法
```
//example
//假如页面已经有该对象
window.Helper = {};
//此时加载了 helper.js， window.Helper 被重置
//这时候引用 Helper.noConflict
var myHelp = Helper.noConflict();
console.log(Helper); // Helper = {}
console.log(myHelp); // myHelp = {...}
```

**Helper.getCookie @class {Function}**    
*@param {String} name => cookie名称*    
*@return {String}*    
**功能**：返回设定的cookie值    
```
//example
//设置了一个cookie
var name;
document.cookie = 'name=白云飘飘';
name = Helper.getCookie('name'); 
console.log(name); // 白云飘飘
```

**Helper.setCookie @class {Function}**    
*@param {String} name => cookie名称*    
*@param {String} value => cookie值*    
*@param {Object} config => cookie其它属性配置*    
*@param {Number} config.expires => cookie到期时间,如果不设置，默认该cookie为session cookie*    
*@param {String} config.path => cookie保存路径, path="/"表示根目录*        
*@param {String} config.domain => cookie设置所在域名,一般想两个子域名共用，可设置该值*    
*@param {Boolen} config.secure => cookie安全设置，当设置为true,表示http协议下不上传该cookie到服务器端*     
*@return {String}*   
**功能**：设置cookie值    
```
//example
Helper.setCookie('name','setCookie', {path:'/',domain:'ys7.com',secure: true});
```

