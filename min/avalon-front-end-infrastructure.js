window.HTMLElement.prototype.importCustomElementTemplateFromHTMLImport=function(){this.innerHTML=document.querySelector('link[href*="'+this.tagName.toLowerCase()+'.html"]').import.querySelector("template").innerHTML};const fs=require?require("fs"):null;if(window.HTMLScriptElement.prototype.loadSameNameHTML=function(t){fs?fs.readFile(document.currentScript.src.substr(0,document.currentScript.src.length-3)+".html",function(n,e){if(n)throw n;t(e)}):fetch(document.currentScript.src.substr(0,document.currentScript.src.length-3)+".html").then(function(n){n.text().then(function(n){t(n)},function(t){throw t})},function(t){throw t})},HTMLTemplateElement.prototype.getFirstElementChild=function(){let t=document.createElement("div");return t.innerHTML=this.innerHTML,t.firstElementChild},window.location.staticAssign=function(t){window.history.pushState(null,null,t),window.dispatchEvent(new Event("popstate"))},window.location.getPathLastSegment=function(){window.location.path;return window.location.pathname.split("/").pop()},window.location.getParam=function(t){let n={},e=window.location.search.substr(1).split("&");for(let t=0;t<e.length;t++){let i=e[t].split("=");n[i[0]]=i[1]}return n[t]||""},window.Math.randomRange=function(t,n){return Math.floor(Math.random()*(n-t+1))+t},window.Number.prototype.toRad=function(){return this*Math.PI/180},window.Math.calculateDistance=function(t,n,e,i){let o=(e-t).toRad(),r=(i-n).toRad(),a=Math.sin(o/2)*Math.sin(o/2)+Math.cos(t.toRad())*Math.cos(e.toRad())*Math.sin(r/2)*Math.sin(r/2);return 6371*(2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a)))},window.tingting={},window.tingting.api={},window.tingting.api.targetUrl="",window.tingting.api.processResultByContentType=async function(t){if(200!==t.status)throw window.tingting.error.trigger("TingTing Front End Infrastructure API",t.statusText),new Error(t.statusText);switch(t.headers.get("Content-Type")){case"application/json":return await t.json();case"multipart/form-data":return await t.formData();case"text/plain":case"text/html":return await t.text();default:return await t.blob()}},window.tingting.api.get=async function(t,n){const e=window.tingting.auth;let i=Object.keys(n).map(t=>t+"="+n[t]).join("&"),o=new Headers;o.append("Content-Type","text/plain"),o.append("Authorization",e.get());let r={method:"GET",mode:"cors",headers:o},a=await fetch(window.tingting.api.targetUrl+t+"?"+i,r);return window.tingting.api.processResultByContentType(a)},window.tingting.api.put=async function(t,n){const e=window.tingting.auth;let i=new Headers;switch(!0){case n instanceof window.File:i.set("Content-Type",n.type);break;case"object"==typeof n:i.set("Content-Type","application/json"),n=JSON.stringify(n);break;case"string"==typeof n:i.set("Content-Type","text/plain")}i.append("Authorization",e.get());let o={method:"PUT",mode:"cors",headers:i,body:n},r=await fetch(window.tingting.api.targetUrl+t,o);return window.tingting.api.processResultByContentType(r)},window.tingting.api.delete=async function(t,n){const e=window.tingting.auth;let i=new Headers;i.append("Content-Type","application/json"),i.append("Authorization",e.get());let o={method:"DELETE",mode:"cors",headers:i,body:JSON.stringify(n)},r=await fetch(window.tingting.api.targetUrl+t,o);return window.tingting.api.processResultByContentType(r)},!document.head.querySelector('meta[name="tingting-api-url"]'))throw new RangeError('You must specify API url in <meta name="tingting-api-url"> tag to use avalon-front-end-infrastructure module.');{let t=document.head.querySelector('meta[name="tingting-api-url"]').content.split(",");for(let n of t){let t=new window.URL(n);window.location.hostname===t.hostname&&(window.tingting.api.targetUrl=n)}window.tingting.api.targetUrl||(window.tingting.api.targetUrl=t[0])}window.tingting.auth={};{let t=null;window.tingting.auth.set=function(n){t=n},window.tingting.auth.get=function(){return t}}window.tingting.error={},window.tingting.error.e=new Set,window.tingting.error.register=function(t){window.tingting.error.e.add(t)},window.tingting.error.unregister=function(t){window.tingting.error.e.delete(t)},window.tingting.error.trigger=function(t,n){for(let e of window.tingting.error.e)e.dispatchEvent(new CustomEvent("ERROR",{detail:{source:t,text:n}}))},window.tingting.util={},window.tingting.util.sleep=function(t){return new Promise(n=>setTimeout(n,t))};