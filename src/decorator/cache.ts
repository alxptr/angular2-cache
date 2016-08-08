import {Type} from '@angular/core';

import {
    isBlank
} from '@angular/common/src/facade/lang';

import {generateUUID} from '../Utils';

import {CacheTypeEnum} from '../CacheTypeEnum';
import {ICache} from '../ICache';
import {NgZoneCache} from '../zone/NgZoneCache';
import {MemoryCache} from '../memory/MemoryCache';

interface ICacheProvider {
    provideCache():ICache<any, any>;
}

class ZoneCacheProvider implements ICacheProvider {

    /**
     * @override
     */
    public provideCache():ICache<any, any> {
        return NgZoneCache.INSTANCE;
    }
    
    public static INSTANCE:ICacheProvider = new ZoneCacheProvider();
}

class MemoryCacheProvider implements ICacheProvider {

    private cache:ICache<any, any> = new MemoryCache<any, any>();

    /**
     * @override
     */
    public provideCache():ICache<any, any> {
        return this.cache;
    }

    public static INSTANCE:ICacheProvider = new MemoryCacheProvider();
}

function cache(cacheType:CacheTypeEnum) {

    const uniqueCacheKey:string = generateUUID();
    const arrayConcatFn:Function = Array.prototype.concat;

    let cacheProvider:ICacheProvider;

    switch (cacheType) {
        case CacheTypeEnum.ZONE:
            cacheProvider = ZoneCacheProvider.INSTANCE;
            break;
        case CacheTypeEnum.MEMORY:
            cacheProvider = MemoryCacheProvider.INSTANCE;
            break;
    }

    return function (target:Object, propertyKey:string, descriptor:TypedPropertyDescriptor<any>) {
        const originalMethod:Type = descriptor.value;

        descriptor.value = function (...args:any[]) {
            const cache:ICache<string, any> = cacheProvider.provideCache();
            if (isBlank(cache)) {
                return originalMethod.apply(this, args);
            }

            let result:any;

            let compositeKeyArray:Array<string> = [
                uniqueCacheKey,
                this /** If there are no input arguments of the function, then we should override toString() with the specific object key **/
            ];
            if (args.length) {
                compositeKeyArray = arrayConcatFn.apply(compositeKeyArray, args);
            }

            const compositeKey:string = compositeKeyArray.join('.');

            result = cache.getCachedValue(compositeKey);
            if (typeof result !== "undefined") {
                return result;
            }

            cache.setCachedValue(compositeKey, result = originalMethod.apply(this, args));
            return result;
        };
        return descriptor;
    }
}

export function ZoneCached(...args:any[]) {
    return cache(CacheTypeEnum.ZONE);
}

export function MemoryCached(...args:any[]) {
    return cache(CacheTypeEnum.MEMORY);
}

export function SessionCached(...args:any[]) {
    return cache(CacheTypeEnum.SESSION);
}

export function StorageCached(...args:any[]) {
    return cache(CacheTypeEnum.STORAGE);
}

export function FileCached(...args:any[]) {
    return cache(CacheTypeEnum.FILE);
}
