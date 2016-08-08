import {
    Pipe,
    PipeTransform
} from '@angular/core';

import {DatePipe} from '@angular/common';

import {ZoneCached, MemoryCached} from '../decorator/cache';

const DATE_PIPE:DatePipe = new DatePipe();

@Pipe({
    name: 'zoneCachedDate'
})
export class ZoneCachedDatePipe implements PipeTransform {

    /**
     * @override
     */
    @ZoneCached()
    public transform(date:any, pattern?:string):string {
        return DATE_PIPE.transform(date, pattern);
    }
}

@Pipe({
    name: 'memoryCachedDate'
})
export class MemoryCachedDatePipe implements PipeTransform {

    /**
     * @override
     */
    @MemoryCached()
    public transform(date:any, pattern?:string):string {
        return DATE_PIPE.transform(date, pattern);
    }
}
