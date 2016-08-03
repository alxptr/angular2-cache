import {
    Injectable,
    NgZone
} from '@angular/core';

import {LoggerFactory, ILogger} from 'angular2-smart-logger';

import {ICache} from '../ICache';
import {MapCache} from '../memory/MapCache';

@Injectable()
export class NgZoneCache extends NgZone implements ICache<string, any> {

    private static logger:ILogger = LoggerFactory.makeLogger(NgZoneCache);

    private cache:ICache<string, any> = new MapCache<string, any>();

    constructor() {
        super({enableLongStackTrace: false});

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
        this.onUnstable.subscribe(() => {
            if (NgZoneCache.logger.isDebugEnabled()) {
                NgZoneCache.logger.debug(`[$NgZoneCache][onUnstable.subscribe] Initialize the cache context zone`);
            }
            this.cache.clear();
        });

        /**
         * Notifies when the last `onMicrotaskEmpty` has run and there are no more microtasks, which
         * implies we are about to relinquish VM turn.
         * This event gets called just once.
         */
        this.onStable.subscribe(() => {
            if (NgZoneCache.logger.isDebugEnabled()) {
                NgZoneCache.logger.debug(`[$NgZoneCache][onStable.subscribe] Destruction the cache context zone. The cache with size ${this.size()} will be cleared`);
            }
            this.cache.clear();
        });

        NgZoneCache.$$self = this;
    }

    /**
     * @override
     */
    public setCachedValue(key:string, value:any) {
        this.cache.setCachedValue(key, value);

        if (NgZoneCache.logger.isDebugEnabled()) {
            NgZoneCache.logger.debug('[$NgZoneCache][setCachedValue] The value', value, 'with the key', key, 'has been put into the cache');
        }
    }

    /**
     * @override
     */
    public getCachedValue(key:string):any {
        const value:any = this.cache.getCachedValue(key);
        if (NgZoneCache.logger.isDebugEnabled() && typeof value !== "undefined") {
            NgZoneCache.logger.debug('[$NgZoneCache][getCachedValue] The value', value, 'with the key', key, 'has been retrieved from the cache');
        }
        return value;
    }

    /**
     * @override
     */
    public clear() {
        return this.cache.clear();
    }

    /**
     * @override
     */
    public size() {
        return this.cache.size();
    }

    public static $$self:ICache<string, any>;
}
