import {
    Injectable
} from '@angular/core';

import {ICache} from '../ICache';
import {MemoryCache} from './MemoryCache';

@Injectable()
export class MemoryGlobalCache extends MemoryCache<any, any> {

    constructor() {
        super();

        MemoryGlobalCache.INSTANCE = this;
    }

    public static INSTANCE:ICache<any, any>;
}
