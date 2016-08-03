import {
    Injectable,
    NgZone
} from '@angular/core';

import {ICache} from '../ICache';
import {MapCache} from '../memory/MapCache';

@Injectable()
export class NgZoneCache extends NgZone implements ICache<string, any> {

    private cache:ICache<string, any> = new MapCache<string, any>();

    constructor() {
        super({enableLongStackTrace: false});

        this.onUnstable.subscribe(() => {
            /**
             * Notifies when code enters Angular Zone. This gets fired first on VM Turn.
             */
            this.cache.clear();
        });

        this.onStable.subscribe(() => {
            /**
             * Notifies when the last `onMicrotaskEmpty` has run and there are no more microtasks, which
             * implies we are about to relinquish VM turn.
             * This event gets called just once.
             */
            this.cache.clear();
        });

        NgZoneCache.$$self = this;
    }

    /**
     * @override
     */
    public setCachedValue(key:string, value:any) {
        this.cache.setCachedValue(key, value);
    }

    /**
     * @override
     */
    public getCachedValue(key:string) {
        return this.cache.getCachedValue(key);
    }

    /**
     * @override
     */
    public clear() {
        return this.cache.clear();
    }

    public static $$self:ICache<string, any>;
}
