import {
    NgZone,
    provide
} from '@angular/core';

import {NgZoneCache} from './zone/NgZoneCache';

export const CACHE_PROVIDERS:any[] = [
    provide(NgZone, {
        useClass: NgZoneCache
    })
];
