export function generateUUID() {
    let currentDate:number = Date.now();

    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const result:number = (currentDate + Math.random() * 16) % 16 | 0;
        currentDate = Math.floor(currentDate / 16);
        return (c == 'x' ? result : (result & 0x3 | 0x8)).toString(16);
    });
}

export function toCacheKey() {
    return Array.from(arguments).join('.');
}

export function toCacheKeyByArray(args:Array<any>) {
    return toCacheKey.apply(null, args);
}
