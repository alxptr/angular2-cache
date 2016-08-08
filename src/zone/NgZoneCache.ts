import {
    Injectable,
    Inject,
    NgZone
} from '@angular/core';

import {LoggerFactory, ILogger} from 'angular2-smart-logger';

import {ICache} from '../ICache';
import {MemoryCache} from '../memory/MemoryCache';

@Injectable()
export class NgZoneCache extends MemoryCache<string, any> {

    private static zoneLogger:ILogger = LoggerFactory.makeLogger(NgZoneCache);

    constructor(@Inject(NgZone) ngZone:NgZone) {
        super();

        /**
         * The onUnstable & onStable are synchronized emitters, so we can use them.
         *
         * Consider the example:
         *
         *  setTimeout(() => {
         *      console.log('Zone 1');
         *      setTimeout(() => {
         *          console.log('Zone 2');
         *          setTimeout(() => {
         *              console.log('Zone 3');
         *          }, 10000);
         *      }, 10000);
         *  }, 10000);
         *
         * In the console we'll see:
         *
         *  [$NgZoneCache][onUnstable.subscribe] Initialize the cache context zone
         *  Zone 1
         *  [$NgZoneCache][setCachedValue]..
         *  ...
         *  [$NgZoneCache][onStable.subscribe] Destruction the cache context zone. The cache with size 14 will be cleared
         *  [$NgZoneCache][onUnstable.subscribe] Initialize the cache context zone
         *  Zone 2
         *  [$NgZoneCache][setCachedValue]..
         *  ...
         */

        /**
         * Notifies when code enters Angular Zone. This gets fired first on VM Turn.
         */
        ngZone.onUnstable.subscribe(() => {
            if (this.isLoggingEnabled()) {
                NgZoneCache.zoneLogger.debug(`[$NgZoneCache][onUnstable.subscribe] Initialize the cache context zone`);
            }
            this.clear();
        });

        /**
         * Notifies when the last `onMicrotaskEmpty` has run and there are no more microtasks, which
         * implies we are about to relinquish VM turn.
         * This event gets called just once.
         */
        ngZone.onStable.subscribe(() => {
            if (this.isLoggingEnabled()) {
                NgZoneCache.zoneLogger.debug(`[$NgZoneCache][onStable.subscribe] Destruction the cache context zone. The cache with size ${this.size()} will be cleared`);
            }
            this.clear();
        });

        NgZoneCache.INSTANCE = this;
    }

    public static INSTANCE:ICache<any, any>;
}
