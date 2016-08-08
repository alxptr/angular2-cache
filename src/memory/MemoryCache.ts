import {Cache} from '../Cache';
import {MapCache} from './MapCache';

export class MemoryCache<TKey, TValue> extends Cache<TKey, TValue> {

    constructor() {
        super(new MapCache<TKey, TValue>());
    }
}
