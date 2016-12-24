function deepEqual(val1,val2) {
        
        if(typeof val1 != "object" && typeof val2 != "object") {
            if(val1 == val2) {
                return true;
            }
            else 
            {
                return false;
            }
        }

        else if(typeof val1 == "object" && typeof val2 == "object") {
            var arr1 = [];
            var arr2 = [];
            for(prop1 in val1) {
                arr1.push(prop1);
            }
            for(prop2 in val2) {
                arr2.push(prop2);
            }
            if(arr1.length != arr2.length) {
                return false;
            }
            else {
                var cal=0;
                var len = arr1.length;
                //compare the property
                for(var i=0;i<len;i++) {
                    if(arr1[i] == arr2[i]) {
                //compare the object                 
                        if(deepEqual(val1[arr1[i]],val2[arr2[i]])) {
                            cal++;
                        }
                        else {
                            return false;
                        }
                    }
                    else {
                        return false;
                    }

                    if(cal==len) {
                        return true;
                    }
                }
                

            }
        }

        
    }