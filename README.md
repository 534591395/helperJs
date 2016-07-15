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
*@param {String} name*    
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

