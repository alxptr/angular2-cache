import {NgZoneGlobalCache} from './zone/NgZoneGlobalCache';
import {MemoryGlobalCache} from './memory/MemoryGlobalCache';

export const CACHE_PROVIDERS:any[] = [NgZoneGlobalCache, MemoryGlobalCache];
