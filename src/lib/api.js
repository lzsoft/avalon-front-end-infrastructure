window.avalon = {};
window.avalon.api = {};
window.avalon.api.targetUrl = "";
window.avalon.api.processResultByContentType = async function (response) {
    if (response.status === 200) {
        switch (response.headers.get('Content-Type')) {
            case 'application/json':
                return await response.json();
            case 'multipart/form-data':
                return await response.formData();
            case 'text/plain':
            case 'text/html':
                return await response.text();
            default:
                return await response.blob();
        }
    } else {
        window.avalon.error.trigger('Avalon Front End Infrastructure API', response.statusText);
        throw new Error(response.statusText);
    }
};
window.avalon.api.get = async function (path, data) {
    const auth = window.avalon.auth;
    let params = Object.keys(data).map((i) => i + '=' + data[i]).join('&');
    let headers = new Headers();
    headers.append('Content-Type', 'text/plain');
    headers.append("Authorization", auth.get());
    let request = {
        method: "GET",
        mode: "cors",
        headers: headers
    };
    let response = await fetch(window.avalon.api.targetUrl + path + '?' + params, request);
    return window.avalon.api.processResultByContentType(response);
};
window.avalon.api.put = async function (path, data) {
    const auth = window.avalon.auth;
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
    headers.append("Authorization", auth.get());
    let request = {
        method: "PUT",
        mode: "cors",
        headers: headers,
        body: data
    };
    let result = await fetch(window.avalon.api.targetUrl + path, request);
    return window.avalon.api.processResultByContentType(result);
};
window.avalon.api.delete = async function (path, json) {
    const Auth = window.avalon.auth;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append("Authorization", Auth.get());
    let request = {
        method: "DELETE",
        mode: "cors",
        headers: headers,
        body: JSON.stringify(json)
    };
    let result = await fetch(window.avalon.api.targetUrl + path, request);
    return window.avalon.api.processResultByContentType(result);
};
window.avalon.api.url = async function () {
    if (document.head.querySelector('meta[name="avalon-front-end-infrastructure-api-url"]')) {
        let metaTags = document.head.querySelector('meta[name="avalon-front-end-infrastructure-api-url"]').content.split(',');
        window.avalon.api.targetUrl = metaTags[0];
        for (let m of metaTags) {
            let url = new window.URL(m);
            if (window.location.hostname === url.hostname) {
                window.avalon.api.targetUrl = m;
            }
        }
    }
};
window.avalon.api.url();