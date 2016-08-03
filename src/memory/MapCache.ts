import {ICache} from '../ICache';

export class MapCache<TKey, TValue> implements ICache<TKey, TValue> {

    private _cache:Map<TKey, TValue> = new Map<any, any>();

    /**
     * @override
     */
    public setCachedValue(key:TKey, value:TValue) {
        this._cache.set(key, value);
    }

    /**
     * @override
     */
    public getCachedValue(key:TKey):TValue {
        return this._cache.get(key);
    }

    /**
     * @override
     */
    public clear() {
        return this._cache.clear();
    }

    /**
     * @override
     */
    public size() {
        return this._cache.size;
    }
}
