import {ICache} from '../ICache';
import {CacheTypeEnum} from '../CacheTypeEnum';
import {GlobalCachesInstances} from '../GlobalCachesInstances';

export interface ICacheProvider {
    provideCache():ICache<any, any>;
}

/**
 * Zone cache provider
 */
class ZoneCacheProvider implements ICacheProvider {

    /**
     * @override
     */
    public provideCache():ICache<any, any> {
        return GlobalCachesInstances.ZONE_INSTANCE;
    }

    public static INSTANCE:ICacheProvider = new ZoneCacheProvider();
}

/**
 * Memory cache provider
 */
class MemoryCacheProvider implements ICacheProvider {

    /**
     * @override
     */
    public provideCache():ICache<any, any> {
        return GlobalCachesInstances.MEMORY_INSTANCE;
    }

    public static INSTANCE:ICacheProvider = new MemoryCacheProvider();
}

export function getProviderByType(cacheType:CacheTypeEnum):ICacheProvider {
    switch (cacheType) {
        case CacheTypeEnum.ZONE:
            return ZoneCacheProvider.INSTANCE;
        case CacheTypeEnum.MEMORY:
            return MemoryCacheProvider.INSTANCE;
    }
    return null;
}
