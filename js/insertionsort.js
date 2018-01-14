function insertionsort(/*imgData,ctx,*/width, heightArr, idx){
    var data = imgData.data;
    //for(;b_i<data.length;b_i+=4){
      //  for(;b_j<data.length-b_i-4;b_j+=4){
    var b_i = heightArr[idx].b_i;
    var b_j = heightArr[idx].b_j;
    var cmp = compare(data,b_j,b_j-4);
     if(cmp>0){
         swap(data,b_j,b_j-4);
         //ctx.clearRect(0, 0, 100, 100);
         ctx.putImageData(imgData, 0, 0);
         //sleep(100);
         heightArr[idx].b_j -= 4;
     }
     else{
        heightArr[idx].b_i += 4;
        heightArr[idx].b_j = heightArr[idx].b_i;
     }
       // }
    //}
    //b_j+=4;
   
    var base = heightArr[idx].start;
    
    if(heightArr[idx].b_j <= base){
        heightArr[idx].b_i += 4;
        heightArr[idx].b_j = heightArr[idx].b_i;

        //console.log("i: " + heightArr[idx].b_i + " j: " + heightArr[idx].b_j);       
    }

    if(heightArr[idx].b_i >=(base + width*4)){
        stopIntervalIS(idx);
    }


}
var stopItervalsLength = 0;
function stopIntervalIS(idx){
    //console.log("stop");
    stopItervalsLength++;
    clearInterval(intervals[idx]);
    if(stopItervalsLength == intervals.length-1){
        
        enableForm();
    }
}
function startIS(/*imgData,ctx,*/width){
    diableForm();
    stopItervalsLength = 0;
    var total = imgData.data.length/4;
    var height = total/width;
    console.log(height);
    heightArr = [];
    var tmp = 0;
    //height = 1;
    for(var i=0;i<height;i++){

        heightArr.push({ b_i: tmp+4, b_j: tmp+4, start: tmp } );
        tmp += width*4;
    }

    intervals = [];
    //b_i = 0;
    //b_j = 0;
    for(var i=0;i<height;i++){
      intervals.push(setInterval(insertionsort,1,/*imgData,ctx,*/width, heightArr, i));
    }
}

function btnIS(){
    startIS(w);
}