import {Pipe} from '@angular/core';
import {DatePipe} from '@angular/common';

import {ZoneCached} from '../decorator/cache';

@Pipe({
    name: 'cached_date'
})
export class CachedDatePipe extends DatePipe {

    /**
     * @override
     */
    @ZoneCached()
    public transform(date:any, pattern?:string):string {
        return super.transform(date, pattern);
    }
}
