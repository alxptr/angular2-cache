import {
    Pipe,
    PipeTransform
} from '@angular/core';

import {DatePipe} from '@angular/common';

import {ZoneCached} from '../decorator/cache';

@Pipe({
    name: 'cachedDate'
})
export class CachedDatePipe implements PipeTransform {

    private pipe:DatePipe = new DatePipe();

    /**
     * @override
     */
    @ZoneCached()
    public transform(date:any, pattern?:string):string {
        return this.pipe.transform(date, pattern);
    }
}
