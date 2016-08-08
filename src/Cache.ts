import {LoggerFactory, ILogger} from 'angular2-smart-logger';

import {ICache} from './ICache';

export class Cache<TKey, TValue> implements ICache<TKey, TValue> {

    private static logger:ILogger = LoggerFactory.makeLogger(Cache);

    protected loggingEnable:boolean = true;

    constructor(private _cache:ICache<TKey, TValue>) {
    }

    /**
     * @override
     */
    public setCachedValue(key:TKey, value:TValue) {
        this._cache.setCachedValue(key, value);

        if (this.isLoggingEnabled()) {
            Cache.logger.debug('[Cache][setCachedValue] Set value to the cache. Key:', key, ', value: ', value, ', cache: ', this.constructor.name);
        }
    }

    /**
     * @override
     */
    public getCachedValue(key:TKey):TValue {
        const value:TValue = this._cache.getCachedValue(key);

        if (this.isLoggingEnabled() && typeof value !== "undefined") {
            Cache.logger.debug('[Cache][getCachedValue] Get value from the cache. Key:', key, ', value: ', value, ', cache: ', this.constructor.name);
        }
        return value;
    }

    /**
     * @override
     */
    public clear() {
        if (this.isLoggingEnabled()) {
            Cache.logger.debug(`[Cache][clear] Clear the cache. The cache has size ${this.size()}, cache: ${this.constructor.name}`);
        }
        this._cache.clear();
    }

    /**
     * @override
     */
    public size():number {
        return this._cache.size();
    }

    /**
     * @override
     */
    public setEnableLogging(enabled:boolean) {
        this.loggingEnable = enabled;
    }

    /**
     * @override
     */
    public isLoggingEnabled() {
        return this.loggingEnable && Cache.logger.isDebugEnabled();
    }
}
