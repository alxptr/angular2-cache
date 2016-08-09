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

    constructor(parts?:Array<any>) {
        this.parts = parts || [];
    }

    public static make(...args:Array<any>):CacheKeyBuilder {
        return new CacheKeyBuilder(
            Array.from(arguments)
        );
    }

    public append(...parts:any[]):CacheKeyBuilder {
        if (!isBlank(parts)) {
            parts.forEach((part:any) => {
                let preparedPart = part;

                if (part instanceof Date) {
                    preparedPart = (part as Date).getTime();
                } else if (!isBlank(part) && part.constructor) {
                    preparedPart = part.constructor.name;
                }
                this.parts.push(preparedPart);
            });
        }
        return this;
    }

    public build():string {
        return this.parts.join('.');
    }
}
