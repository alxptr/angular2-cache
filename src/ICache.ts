export interface ICache<TKey, TValue> {

    setCachedValue(key:TKey, value:TValue);

    getCachedValue(key:TKey):TValue;

    /**
     * Clear the cache
     */
    clear();

    /**
     * Get size of the cache
     */
    size():number;

    setEnableLogging(enabled:boolean);

    isLoggingEnabled();

    /**
     * It enables or disables the cache
     * @param enabled
     */
    setEnable(enabled:boolean);
}
