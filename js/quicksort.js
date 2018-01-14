var stateArr = [];
var stateObj = {};
var maxDepth = 0;
var  frames = [];
function quickSort(arr, left, right, base, iteration, width){
    var len = arr.length, 
    pivot,
    partitionIndex;
 
 
   if(left < right){
     pivot = right;
     partitionIndex = partition(arr, pivot, left, right);
     //console.log(arr);
     //if(iteration>=stateArr.length){
         if(stateObj[base] == undefined){
             stateObj[base] = [];
         }

         stateObj[base].push(arr.slice());
         maxDepth = Math.max(maxDepth,stateObj[base].length);
        //stateArr.push(arr.slice());
     /*}
     else{

        //console.log(width*4);
        var tmpArr = stateArr[iteration];
        for(var i = base;i<width*4;i++){
            if(tmpArr[i] != arr[i]){
                console.log("change");
            }
            tmpArr[i] = arr[i];
        }

     }*/
    //sort left and right
    quickSort(arr, left, partitionIndex - 4, base, iteration + 1,width);
    quickSort(arr, partitionIndex + 4, right, base, iteration + 1, width);
   }
   return arr;
 }
 
 function partition(arr, pivot, left, right){
    var pivotValue = getVal(arr,pivot),
        partitionIndex = left;
 
    for(var i = left; i < right; i+=4){
     if(getVal(arr,i) > pivotValue){
       swap(arr, i, partitionIndex);
       partitionIndex+=4;
     }
   }
   swap(arr, right, partitionIndex);
   return partitionIndex;
 }


function getVal(arr, idx){
    var sum = 0;
    for(var i=0;i<3;i++){
        sum += Math.pow(arr[idx+i],i+1);
    }
    return sum;
}
function btnQS(){
 //c = [1,2,22,8,1,45,7];
 //c = [255,0,255,255, 255,255,255,255 ,0,0,0,255, 255,0,0,255];
 //quickSort(c,0,c.length-4);
 //console.log(stateArr);
    startQS(w);
}

function startQS(/*imgData,ctx,*/width){
    diableForm();
   
    var total = imgData.data.length/4;
    var height = total/width;
    console.log(height);
    heightArr = [];
    var tmp = 0;
    var initialdata = imgData.data.slice();
    //height = 1;
    for(var i=0;i<height;i++){

        //heightArr.push({ b_i: tmp, b_j: tmp, start: tmp } );
        quickSort(initialdata, tmp, tmp + width*4 - 4, tmp, 0, width)
        tmp += width*4;

    }
    //console.log(stateArr);
    /*for(var i = 1;i<stateArr.length;i++){
        if(stateArr[i-1] == stateArr[i]){
           // console.log("same");
        }
    }*/
    createFrames(width);
    printState();
}

function printState(){
    qsI = 0;
    //imgData.data = stateArr[3];
    ctx.putImageData(imgData, 0, 0);
    qsInterval = setInterval(updateCanvas,50);
}

function createFrames(width){

    frames = [];
    for(var i=0;i<maxDepth;i++){
        frames.push([]);
    }

    for(var i=0;i<maxDepth;i++){
        for(var base in stateObj){
            base = parseInt(base);
            var curArr = stateObj[base][i];
            if(curArr == undefined){
                curArr = stateObj[base][stateObj[base].length - 1];
            }
            $tmpslice = curArr.slice(base,base+width*4);
            for(var j=0;j<$tmpslice.length;j++){
                frames[i].push($tmpslice[j]);
            }
            //frames[i] = frames[i].concat($tmparr);
        }
    }
    stateObj = {};
    return frames;
}


function updateCanvas(){
    for(var i=0;i<imgData.data.length;i++){
        imgData.data[i] = frames[qsI][i];
    }

    //console.log("canvas");
    ctx.putImageData(imgData, 0, 0);
    qsI++;
    if(qsI >= frames.length){
        clearInterval(qsInterval);
        enableForm();
    }
}
