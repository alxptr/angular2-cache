import {
    Injectable
} from '@angular/core';

import {MemoryCache} from './MemoryCache';
import {GlobalCachesInstances} from '../GlobalCachesInstances';

@Injectable()
export class MemoryGlobalCache extends MemoryCache<any, any> {

    constructor() {
        super();

        GlobalCachesInstances.MEMORY_INSTANCE = this;
    }
}
