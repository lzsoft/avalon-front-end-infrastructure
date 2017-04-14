'use strict';
window.Lzsoft.Api.targetUrl = "";
if (!document.head.querySelector('meta[name="lzsoft-api-url"]')) {
    throw new RangeError('You must specify API url in <meta name="lzsoft-api-url" /> tag to use avalon-front-end-infrastructure module.');
} else {
    let metaTags = document.head.querySelector('meta[name="lzsoft-api-url"]').content.split(',');
    for (let i = 0; i < metaTags.length; i++) {
        let m = metaTags[i];
        let url = new window.URL(m);
        if (window.location.hostname === url.hostname) {
            window.Lzsoft.Api.targetUrl = m;
        }
    }
    if (!window.Lzsoft.Api.targetUrl) {
        window.Lzsoft.Api.targetUrl = metaTags[0];
    }
}
window.Lzsoft.Api.Get = async function(path, json) {
    const Auth = window.Lzsoft.Auth;
    let params = Object.keys(json).map((i) => i + '=' + json[i]).join('&');
    let headers = new Headers();
    headers.append('Content-Type', 'text/plain');
    headers.append("Authorization", Auth.Get());
    let request = {
        method: "GET",
        mode: "cors",
        headers: headers
    };
    let result = await fetch(window.Lzsoft.Api.targetUrl + path + '?' + params, request);
    switch (result.headers.get('Content-Type')) {
        case 'application/json':
            return result.json();
        case 'multipart/form-data':
            return result.formData();
        case 'text/plain':
            return result.text();
        default:
            return result.blob();
    }
}
window.Lzsoft.Api.Put = async function(path, data) {
    const Auth = window.Lzsoft.Auth;
    let headers = new Headers();
    switch (true) {
        case data instanceof window.File:
            headers.set('Content-Type', data.type);
            break;
        case typeof data === 'object':
            headers.set('Content-Type', 'application/json');
            data = JSON.stringify(data);
            break;
        case typeof data === 'string':
            headers.set('Content-Type', 'text/plain');
            break;
    }
    headers.append("Authorization", Auth.Get());
    let request = {
        method: "PUT",
        mode: "cors",
        headers: headers,
        body: data
    };
    let result = await fetch(window.Lzsoft.Api.targetUrl + path, request);
    switch (result.headers.get('Content-Type')) {
        case 'application/json':
            return result.json();
        case 'multipart/form-data':
            return result.formData();
        case 'text/plain':
            return result.text();
        default:
            return result.blob();
    }
}
window.Lzsoft.Api.Delete = async function(path, json) {
    const Auth = window.Lzsoft.Auth;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append("Authorization", Auth.Get());
    let request = {
        method: "DELETE",
        mode: "cors",
        headers: headers,
        body: JSON.stringify(json)
    };
    let result = await fetch(window.Lzsoft.Api.targetUrl + path, request);
    switch (result.headers.get('Content-Type')) {
        case 'application/json':
            return result.json();
        case 'multipart/form-data':
            return result.formData();
        case 'text/plain':
            return result.text();
        default:
            return result.blob();
    }
}
