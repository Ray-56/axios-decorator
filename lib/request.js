const axios = require('axios');

const GET = (...args) => request('get', args);
const POST = (...args) => request('post', args);
const PUT = (...args) => request('put', args);
const DELETE = (...args) => request('delete', args);
const HTTP = args => typeof args === 'object' && _request(args);

const request = (_method, args) => {
    // console.log(args)
    return _request(Object.assign({}, { method: _method }, _paramsParse(args)))
};

const _paramsParse = (args) => {
    if (!args || args.length === 0) {
        return;
    };

    let _url = args[0];
    let _params;
    
    if (args.length === 1) {
        if (typeof _url === 'object') {
            _params = _url.params || _url.data;
            _url = _url.url
        };
    } else {
        // arguments对象不是数组，而是一个类似数组的对象。所以为了使用数组的方法，必须使用Array.prototype.slice.call先将其转为数组  已使用rest
        // let _args = Array.prototype.slice.call(args, 1);
        let _args = args.slice(1);

        // 匹配字符串中是否有 {0} {1} 等 
        _url = _url.replace(/\{(\d+)\}/g, (match, i) => {
                return _args[i];
            });
    };

    return {
        url: _url,
        params: _params
    }
}

const getParseQuery = query => {
    const reg = /([^=&\s]+)[=\s]*([^&\s]*)/g;
    const obj = {};
    while (reg.exec(query)) {
        obj[RegExp.$1] = RegExp.$2;
    }
    return obj;
}

const _marge = (args = {}, options) => {
    let params = args.params || args.data || {};

    if(options && options.length) {
        options.forEach(option => {
            if(typeof option === 'string') {
                option = getParseQuery(option); // 改变查询参数 为对象形式
            };

            args.url = args.url.replace(/\{(.*?)\}/g, (m, p) => {
                return option[p] || m;
            });
            Object.assign(params, option);
        })
    };
    return params;
}


const _request = args => (target, name, descriptor) => {
    let oldVal = descriptor.value;
    
    // descriptor.value为当前修饰器所修饰的属性值
    descriptor.value = (..._args) => {
        const instance = target.axios || this.axios || axios;
        let _headers = oldVal._headers;
        let _config  = oldVal._config;
        // log(args)
        // log(_args)
        let _params = _marge(args, _args);
        
        const config = {
            method: args.method,
            url: args.url
        };
        
        _headers && (config.headers = _headers);

        if (_params) {
            if (args.method == 'get') {
                config.params = _params;
            } else if (['put', 'post', 'patch'].includes(args.method)) {
                config.data = _params;
            } else if (args.method == 'delete') {
                /* method = delete时
                 * 如果服务端将参数当做 java对象来封装接收则 参数格式为：{data: param}
                 * 如果服务端将参数当做url 参数 接收，则格式为：{params: param}，这样发送的url将变为http:www.XXX.com?a=..&b=..
                 */
                config.params = _params;
                config.data = _params;
            }
        };
        
        const req = instance(Object.assign({}, config));

        req.then((res) => {
            oldVal.call(this, res.data);
        }).catch((err) => {
            oldVal.call(this, {}, err);
        })
    }
};

export { GET, POST, PUT, DELETE, HTTP };
