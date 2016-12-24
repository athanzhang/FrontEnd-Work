function arrayToList(arr) {
           var list = {};
           var len = arr.length;                     
           if(len-1==0) {
               return {
                   value:arr[len-1],
                   rest:null
               }
           }
           else {
               list = {
                   value:arr[0],
                   rest:arrayToList(arr.slice(1,len))
               }
               
           }
           return list;
       }



function listToArray(list) {
           var arr = [];
           function listDecode(list) {
             if(list.rest == null) {
               arr.push(list.value);
               return arr;
             }
             else {
                 arr.push(list.value);
                 list = list.rest;
                 listDecode(list);
                }
           }
           listDecode(list);
           return arr;
           
       }