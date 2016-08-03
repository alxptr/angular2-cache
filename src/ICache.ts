export interface ICache<TKey, TValue> {

    setCachedValue(key:TKey, value:TValue);

    getCachedValue(key:TKey);

    clear();
}
