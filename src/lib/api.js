window.tingting = {};
window.tingting.api = {};
window.tingting.api.targetUrl = "";
window.tingting.api.processResultByContentType = async function(response) {
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
        window.tingting.error.trigger('TingTing Front End Infrastructure API', response.statusText);
        throw new Error(response.statusText);
    }
};
window.tingting.api.get = async function(path, data) {
    const auth = window.tingting.auth;
    let params = Object.keys(data).map((i) => i + '=' + data[i]).join('&');
    let headers = new Headers();
    headers.append('Content-Type', 'text/plain');
    headers.append("Authorization", auth.get());
    let request = {
        method: "GET",
        mode: "cors",
        headers: headers
    };
    let response = await fetch(window.tingting.api.targetUrl + path + '?' + params, request);
    return window.tingting.api.processResultByContentType(response);
};
window.tingting.api.put = async function(path, data) {
    const auth = window.tingting.auth;
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
    let result = await fetch(window.tingting.api.targetUrl + path, request);
    return window.tingting.api.processResultByContentType(result);
};
window.tingting.api.delete = async function(path, json) {
    const Auth = window.tingting.auth;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append("Authorization", Auth.get());
    let request = {
        method: "DELETE",
        mode: "cors",
        headers: headers,
        body: JSON.stringify(json)
    };
    let result = await fetch(window.tingting.api.targetUrl + path, request);
    return window.tingting.api.processResultByContentType(result);
};
if (!document.head.querySelector('meta[name="tingting-api-url"]')) {
    throw new RangeError('You must specify API url in <meta name="tingting-api-url"> tag to use avalon-front-end-infrastructure module.');
} else {
    let metaTags = document.head.querySelector('meta[name="tingting-api-url"]').content.split(',');
    for (let m of metaTags) {
        let url = new window.URL(m);
        if (window.location.hostname === url.hostname) {
            window.tingting.api.targetUrl = m;
        }
    }
    if (!window.tingting.api.targetUrl) {
        window.tingting.api.targetUrl = metaTags[0];
    }
}