import {
    Pipe,
    PipeTransform,
    LOCALE_ID,
    Inject,
    OpaqueToken
} from '@angular/core';

import {DatePipe} from '@angular/common';

import {ZoneCached, MemoryCached} from '../decorator/cache';

export abstract class CachedDatePipe implements PipeTransform {

    protected datePipe:DatePipe;

    constructor(locale:OpaqueToken) {
        this.datePipe = new DatePipe(locale.toString());
    }

    /**
     * @override
     */
    abstract transform(date:any, pattern?:string):string;
}

@Pipe({
    name: 'zoneCachedDate'
})
export class ZoneCachedDatePipe extends CachedDatePipe {

    constructor(@Inject(LOCALE_ID) locale:OpaqueToken) {
        super(locale);
    }

    /**
     * @override
     */
    @ZoneCached()
    public transform(date:any, pattern?:string):string {
        return this.datePipe.transform(date, pattern);
    }
}

@Pipe({
    name: 'memoryCachedDate'
})
export class MemoryCachedDatePipe extends CachedDatePipe {

    constructor(@Inject(LOCALE_ID) locale:OpaqueToken) {
        super(locale);
    }

    /**
     * @override
     */
    @MemoryCached()
    public transform(date:any, pattern?:string):string {
        return this.datePipe.transform(date, pattern);
    }
}
