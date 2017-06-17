var $ = (element) => {
    return document.querySelector(element);
}

console.log("xd.js alpha");

$.__proto__.sel = (element) => {
    return document.querySelectorAll(element);
}

$.__proto__.get = (url) => {
    return new Promise((resolve) => {
        let x = new XMLHttpRequest();
        x.onreadystatechange = () => {
        if (x.readyState==4 && x.status==200) 
            resolve(x.responseText);
        }
        x.open('GET',url,true);
        x.send();
    });
    //fetch(url).then(callback);
}

$.__proto__.load = (sel,url) => {
    $.get(url).then((dat) => $(sel).innerHTML = dat);
}

$.__proto__.click = (selected,act) => {
    $.sel(selected).forEach((obj) => { obj.onclick = () => act(obj) });
}

$.__proto__.__priv = {
    ready: false,
    ready_fns: [],
    ldr_fns: []
};

$.__proto__.fin = (fn) => {
    if($.__priv.ready) $.__priv._ready_fns.push(fn);
    else fn();
}


window.onload = () => {
    console.log("pong!");
    $.__priv.ready = true;
    $.sel("include").forEach((o) => {
        $.get(o.getAttribute("href")).then(dat => o.innerHTML = dat);
    });
    console.log($.__priv._ready_fns);
    for(f in $.__priv._ready_fns){
        console.log(f);
        $.__priv._ready_fns[f]();
    }
    
}
