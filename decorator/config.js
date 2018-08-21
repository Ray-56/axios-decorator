const axios = require('axios');
const CancelToken = axios.CancelToken;

const Create = config => (target, name, descriptor) => {
    if(!descriptor) {
        target.prototype.axios = target.prototype.$axios = axios.create(config);
    }
};

const Config = config => (target, name, descriptor) => {
    if(typeof config === 'object') {
        if(descriptor) {
            descriptor.value._config = Object.assign({}, descriptor.value._config, config);
        } else {
            const instance = target.prototype.axios;
            config && Object.keys(config).forEach(key => {
                    if(!instance || config.global) {
                        axios.default[key] = config[key];
                    } else {
                        instance.default[key] = config[key];
                    }
                })
        }
    }
};

const Headers = headers => (target, property, descriptor) => {
    if (typeof headers === 'object') {
        if (descriptor) {
            descriptor.value._headers = Object.assign({}, descriptor.value._headers, headers);
        } else {
            const instance = target.prototype.axios;
            headers && Object.keys(headers).forEach(key => {
                    if (!instance || headers.global) {
                        if ('Content-Type' === key) {
                            axios.defaults.headers.post[key] = headers[key];
                        } else {
                            axios.defaults.headers.common[key] = headers[key];
                        }
                    } else {
                        if ('Content-Type' === key) {
                            axios.defaults.headers.post[key] = headers[key];
                        } else {
                            instance.defaults.headers.common[key] = headers[key];
                        }
                    }
                })
        }
    }
}

// cancel  
const Cancel = (cb) => (target, property, descriptor) => {
    if (descriptor && cb) {
        descriptor.value._headers = Object.assign({}, descriptor.value._headers, {
                cancelToken: new CancelToken(ctoken => {
                    cb.call(target, ctoken);
                })
            });
    }
}

// 文件上传
const Multipart = (target, property, descriptor) => {
    if (descriptor) {
        descriptor.value._headers = Object.assign({}, descriptor.value._headers, {
                'Content-Type': 'multipart/form-data'
            });
    }
    return descriptor;
}

const FormUrlEncoded = (target, property, descriptor) => {
    if (descriptor) {
        descriptor.value._headers = Object.assign({}, descriptor.value._headers, {
                'Content-Type': 'application/x-www-form-urlencoded'
            });
    }
    return descriptor;
}

export {};