export interface ICache<TKey, TValue> {

    setCachedValue(key:TKey, value:TValue);

    getCachedValue(key:TKey):TValue;

    clear();

    size():number;

    setEnableLogging(enabled:boolean);

    isLoggingEnabled();
}
