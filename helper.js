(function(root) {
    'use strict';
    var previous = root.Helper;
    var Helper = {};
    //版本信息
    Helper.version = '1.0.0';
    //防止变量冲突
    Helper.noConflict = function() {
        root.Helper = previous;
        return Helper;
    };
    //获取cookie信息
    Helper.getCookie = function() {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        arr = document.cookie.match(reg);
        if (arr) {
            return decodeURIComponent(arr[2]);
        } else {
            return null;
        }
    };
    /**
     * POST 请求
     * @param {Object} obj
     * @param {String} obj.url //请求地址
     * @parma {object} obj.data //请求参数
     * @param {Function} obj.success //请求成功回调
     * @param {Function} obj.error //请求失败回调
     */
    Helper.post = function(obj) {
        var request = new XMLHttpRequest();
        var contentType = obj.contentType || 'application/json';
        request.open('POST', obj.url, true);
        request.onreadystatechange = function() {
            if(request.readyState === 4) {
                if(request.status === 200) {
                   if(typeof obj.success === 'function') {
                       obj.success(request, obj); 
                   } 
                } else {
                   if(typeof obj.error === 'function') {
                       obj.error(request, obj); 
                   }
                }
            }
        };
        request.setRequestHeader("Content-Type", contentType);

        if(contentType == 'application/json'){
            request.send(JSON.stringify(obj.data));
        }else{
            request.send(obj.data);
        }
    };
    /**
     * 异步请求 allPost，监听异步传人的异步请求都完成后的处理方法
     * 解决同时多个ajax请求，事件处理
     * @param {Object} obj
     * {
     *      array: [{
     *          'name': {
     *              url: {String},
     *              data: {Object}
     *          }
     *      }],
     *      callback: {Function} //异步都请求成功后的自定义回调
     * }
     *
     * 使用方法：
     * var arrays = [
     *                 {'detect':{url:'/nodeh5/api/safeGrade/detect', data:  {'sessionId':sessionId}}},
     *                 {'getAdsDevices':{url:'/nodeh5/api/safeGrade/getAdsDevices', data: {'sessionId':sessionId}}}
     *             ];
     * helper.allPost({array: arrays, callback: function(requestArray) {
     *     var $1 = requestArray['detect'];
     *     var $2 = requestArray['getAdsDevices'];
     *     //这里两个回调都成功了，处理事件
     *     if($1.status === 200 && $2.status === 200) { //请求成功 success
     *         var response = JSON.parse($1.response);
     *     } else { //请求失败 error
     *
     *     }
     * }});
     */
    Helper.allPost = function(obj) {
        if(typeof obj.array ==='undefined') throw '必须传人ajax请求列表';
        var length = obj.array.length;
        var requestArray = {};
        var name = '';
        var url = '';
        var data = '';
        var contentType = '';
        var callback = function(request, name) {
            requestArray[name] = request;
            length --;
            if(length <=0) {
                obj.callback(requestArray);
            }
        };
        var ajaxCallback = function(request, ajaxConfig) {
            if(typeof callback === 'function'){
                callback(request, ajaxConfig.name);
            } 
        };
        for(var i=0; i< length; i++) {
            for(var key in obj.array[i]) {
               name=  key;
               url =  obj.array[i][name].url;
               data = obj.array[i][name].data;
               contentType = obj.array[i][name].contentType;
            }
            helper.post({
                 name: name, 
                 url: url,
                 data: data,
                 contentType: contentType ? contentType : 'application/json',
                 success: ajaxCallback,
                 error: ajaxCallback
            }); 
        }
        name = '';
        url = '';
        data = '';
        contentType = '';
    };
    root.Helper = Helper;
})(this);