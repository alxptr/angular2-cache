import {ICache} from '../ICache';

export class MapCache<TKey, TValue> implements ICache<TKey, TValue> {

    private cache:Map<TKey, TValue> = new Map<any, any>();

    /**
     * @override
     */
    public setCachedValue(key:TKey, value:TValue) {
        this.cache.set(key, value);
    }

    /**
     * @override
     */
    public getCachedValue(key:TKey) {
        return this.cache.get(key);
    }

    /**
     * @override
     */
    public clear() {
        return this.cache.clear();
    }
}
