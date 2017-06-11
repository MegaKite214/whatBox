var $ = (element) => {
    return document.querySelector(element);
}

console.log("xd.js alpha");

$.__proto__.sel = (element) => {
    return document.querySelectorAll(element);
}

$.__proto__.get = (url,callback) => {
    let x = new XMLHttpRequest();
    x.onreadystatechange = () => {
    if (x.readyState==4 && x.status==200) 
       callback(x.responseText);
    }
    x.open('GET',url,true);
    x.send();
}

$.__proto__.load = (sel,url) => {
    $.get(url,dat => $(sel).innerHTML = dat);
}

$.__proto__.click = (selected,act) => {
    $.sel(selected).forEach((obj) => { obj.onclick = () => act(obj) });
}

var _ready_fns = [];
var ready = false;

$.__proto__.fin = (fn) => {
    if(ready) _ready_fns.push(fn);
    else fn();
}

window.onload = () => {
    console.log("pong!");
    ready = true;
    $.sel("include").forEach((o) => {
        $.get(o.getAttribute("href"),dat => o.innerHTML = dat);
    });
    console.log(_ready_fns);
    for(f in _ready_fns){
        console.log(f);
        _ready_fns[f]();
    }

}
