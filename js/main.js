console.log("hii");
var w = 100;
var h = 100;
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.scale(4,4);
var imgData = ctx.createImageData(w, h);
function createRandom(data){
    for (var i = 0; i < data.length; i += 4) {
        data[i+0] = Math.floor(Math.random() * 255);
        data[i+1] = Math.floor(Math.random() * 255);
        data[i+2] = Math.floor(Math.random() * 255);
        data[i+3] = 255;
    }
}
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
var colors = [[255,0,0],[0,255,0],[0,0,255],[255,255,0],[0,255,255],[255,100,255],
[100,200,200],[135,44,36],[44,55,66],[200,235,222],[122,33,49],[255,220,222]];
var $tmparr = [];
for(var i=0;i<w;i++){

    //$tmparr.push([Math.floor(Math.random() * 256),Math.floor(Math.random() * 256),Math.floor(Math.random() * 256)]);
    $tmparr.push(colors[Math.floor(Math.random()*colors.length)]);
}



for(var i=0;i<h;i++){
    shuffleArray($tmparr);
    for(var j=0;j<w*4;j+=4){
        var base = i*w*4;
        imgData.data[base+j+0] = $tmparr[j/4][0];
        imgData.data[base+j+1] = $tmparr[j/4][1];
        imgData.data[base+j+2] = $tmparr[j/4][2];
        imgData.data[base+j+3] = 255;
    }
}
/*for (var i = 0; i < imgData.data.length; i += 4) {
    imgData.data[i+0] = Math.floor(Math.random() * 255);
    imgData.data[i+1] = Math.floor(Math.random() * 255);
    imgData.data[i+2] = Math.floor(Math.random() * 255);
    imgData.data[i+3] = 255;
}*/

ctx.putImageData(imgData, 0, 0);
//bubblesort(imgData,ctx);
function compare(data,left,right){
    var sumLeft = 0, sumRight = 0;
    for(var i=0;i<4;i++){
        sumLeft += Math.pow(data[left+i],i+1);        
        sumRight += Math.pow(data[right+i],i+1);
    }
    return sumLeft - sumRight;
}

function swap(data,left,right){
    for(var i=0;i<4;i++){
        var tmp = data[left+i];
        data[left+i] = data[right+i];
        data[right+i] = tmp;
    }
}
