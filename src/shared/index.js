import singledata from "./SingleData.json";
import doubledata from "./DoubleData.json";


export const data={single:singledata,double:doubledata};
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
