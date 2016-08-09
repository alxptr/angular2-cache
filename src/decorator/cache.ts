import {Type} from '@angular/core';

import {
    isBlank
} from '@angular/common/src/facade/lang';

import {generateUUID, CacheKeyBuilder} from '../Utils';

import {CacheTypeEnum} from '../CacheTypeEnum';
import {ICache} from '../ICache';
import {ICacheProvider, getProviderByType} from './provider';

function cache(cacheType:CacheTypeEnum) {

    const uniqueCacheKey:string = generateUUID();
    const cacheProvider:ICacheProvider = getProviderByType(cacheType);

    return function (target:Object, propertyKey:string, descriptor:TypedPropertyDescriptor<any>) {
        const originalMethod:Type = descriptor.value;

        descriptor.value = function (...args:any[]) {
            const cache:ICache<string, any> = cacheProvider.provideCache();
            if (isBlank(cache)) {
                return originalMethod.apply(this, args);
            }

            const compositeKey:string = CacheKeyBuilder.make(
                uniqueCacheKey,
                this /** If there are no input arguments of the function, then we should override toString() with the specific object key **/
            )
                .append(args)
                .build();

            let result = cache.getCachedValue(compositeKey);
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
