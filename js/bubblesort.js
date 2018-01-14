
function bubblesort(/*imgData,ctx,*/width, heightArr, idx){
    var data = imgData.data;
    //for(;b_i<data.length;b_i+=4){
      //  for(;b_j<data.length-b_i-4;b_j+=4){
    var b_i = heightArr[idx].b_i;
    var b_j = heightArr[idx].b_j;
            var cmp = compare(data,b_j,b_j+4);
            if(cmp<0){
                swap(data,b_j,b_j+4);
                //ctx.clearRect(0, 0, 100, 100);
                ctx.putImageData(imgData, 0, 0);
                //sleep(100);
            }
       // }
    //}
    //b_j+=4;
    heightArr[idx].b_j += 4;
    var base = heightArr[idx].start;
    if(heightArr[idx].b_j >= base + width*4 - (b_i - base)-4){
        heightArr[idx].b_i += 4;
        if(idx == 0){
            //console.log(heightArr[0]);
        }
        //console.log("i: " + heightArr[idx].b_i + " j: " + heightArr[idx].b_j);
        if(heightArr[idx].b_i >= base + width*4){
            stopInterval(idx);
        }
        heightArr[idx].b_j = heightArr[idx].start;
    }

}
function stopInterval(idx){
    console.log("stop");
    clearInterval(intervals[idx]);
    if(idx == intervals.length-1){
        
        enableForm();
    }
}
function startBS(/*imgData,ctx,*/width){
    diableForm();
    
    var total = imgData.data.length/4;
    var height = total/width;
    console.log(height);
    heightArr = [];
    var tmp = 0;
    //height = 1;
    for(var i=0;i<height;i++){

        heightArr.push({ b_i: tmp, b_j: tmp, start: tmp } );
        tmp += width*4;
    }

    intervals = [];
    //b_i = 0;
    //b_j = 0;
    for(var i=0;i<height;i++){
      intervals.push(setInterval(bubblesort,1,/*imgData,ctx,*/width, heightArr, i));
    }
}



/*
var vv=0;
function b(){
    if(vv<=500)
    {
        document.getElementById("my").innerHTML = i;
        vv+=1;
        window.requestAnimationFrame(b);				
    }			
}
function start(){
    window.requestAnimationFrame(b);
}*/
function btnBS(){
    startBS(w);
       
}