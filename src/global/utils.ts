export function isNullOrUndefined(value: any): boolean{
    return value === null || value === undefined;
}

export function promisify(fun){
    return (...args) => {
        return new Promise((resolve, reject) => {
            fun.apply(null, args.concat((err, success) => {
                if(err){
                    reject(err);
                } else {
                    resolve(success);
                }
            }));
        });  
    }
}