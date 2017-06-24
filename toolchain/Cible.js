"use strict";

var fs = require('fs');

class Cible {

    constructor(file){
        this.file = file;
        this.mp4box = new (require('mp4box').MP4Box)();
    }


    load(){
        this.stream = fs.readFileSync(this.file);
        this.buf = new Uint8Array(this.stream).buffer;
        this.buf.fileStart = 0;
        this.mp4box.appendBuffer(this.buf);
        return this;
    }

    getInfo() {
        return this.mp4box.getInfo();
    }

}

module.exports = Cible;