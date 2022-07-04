

export const useId=(startsWith)=>(startsWith||"")+"_"+Math.random().toString(36).slice(2);
export const areEqualArrays=(array0,array1)=>{
    let areEqual=true;
    const {length}=array0;
    if(length===array1.length){
        let i=0;
        while(areEqual&&(i<length)){
            if(!array1.includes(array0[i])){
                areEqual=false;
            }
            i++;
        }
    }
    else{
        areEqual=false;
    }
    return areEqual;
}

//Can it be written in 2x2x2x....x2 format 
export const isLog2=(number)=>{
    //it should be divided by 2 (number of participants per match) but as it's log2 division won't actually make a difference;
    const log2=Math.log2(number /* devided by 2 */);
    return log2===Math.floor(log2);
}
