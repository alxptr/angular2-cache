import {Pipe} from '@angular/core';
import {DatePipe} from '@angular/common';

import {ZoneCached} from '../decorator/cache';

@Pipe({
    name: 'cachedDate'
})
export class CachedDatePipe extends DatePipe {

    constructor() {
        super();
    }

    /**
     * @override
     */
    @ZoneCached()
    public transform(date:any, pattern?:string):string {
        return super.transform(date, pattern);
    }
}
