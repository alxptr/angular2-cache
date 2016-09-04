import {NgModule} from '@angular/core';

import {CACHE_PROVIDERS} from "./CacheProviders";
import {ZoneCachedDatePipe, MemoryCachedDatePipe} from "./pipe/CachedDatePipe";

@NgModule({
	providers: CACHE_PROVIDERS,
	declarations: [
		ZoneCachedDatePipe,
		MemoryCachedDatePipe
	],
	exports: [
		ZoneCachedDatePipe,
		MemoryCachedDatePipe
	]
})
export class CacheModule {
}
