import {
	Pipe,
	PipeTransform
} from '@angular/core';

import {DatePipe} from '@angular/common';

import {ZoneCached, MemoryCached} from '../decorator/cache';
import {getLocale} from "../Utils";

abstract class CachedDatePipe implements PipeTransform {

	protected datePipe: DatePipe = new DatePipe(getLocale());

	abstract transform(date: any, pattern?: string): string;
}

@Pipe({
	name: 'zoneCachedDate'
})
export class ZoneCachedDatePipe extends CachedDatePipe {

	/**
	 * @override
	 */
	@ZoneCached()
	public transform(date: any, pattern?: string): string {
		return this.datePipe.transform(date, pattern);
	}
}

@Pipe({
	name: 'memoryCachedDate'
})
export class MemoryCachedDatePipe extends CachedDatePipe {

	/**
	 * @override
	 */
	@MemoryCached()
	public transform(date: any, pattern?: string): string {
		return this.datePipe.transform(date, pattern);
	}
}
