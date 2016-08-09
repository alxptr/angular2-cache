import {
    isBlank
} from '@angular/common/src/facade/lang';

export function generateUUID() {
    let currentDate:number = Date.now();

    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const result:number = (currentDate + Math.random() * 16) % 16 | 0;
        currentDate = Math.floor(currentDate / 16);
        return (c == 'x' ? result : (result & 0x3 | 0x8)).toString(16);
    });
}

export class CacheKeyBuilder {

    private parts:Array<any>;

    private static DEFAULT_CONSTRUCTORS:string[] = ["Number", "Boolean", "String", "RegExp", "Symbol"];

    constructor(parts?:Array<any>) {
        this.parts = parts || [];
    }

    public static make(...args:Array<any>):CacheKeyBuilder {
        return new CacheKeyBuilder(
            Array.from(arguments)
        );
    }

    public append(...parts:any[]):CacheKeyBuilder {
        parts.forEach((part:any) => {
            if (Array.isArray(part)) {
                (part as Array<any>).forEach((partItem:any) => {
                    this.append(partItem);
                });
            } else if (part instanceof Date) {
                this.parts.push((part as Date).getTime());
            } else if (!isBlank(part)
                && CacheKeyBuilder.DEFAULT_CONSTRUCTORS.indexOf(part.constructor.name) === -1) {
                this.parts.push(part.constructor.name);
            } else {
                this.parts.push(part);
            }
        });
        return this;
    }

    public build():string {
        return this.parts.join('.');
    }
}
