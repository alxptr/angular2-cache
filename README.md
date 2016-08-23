# angular2-cache

An implementation of cache at Angular2.

## Description

The cache service supports the following types of caching:  

1. **ZONE** based on [NgZone](https://angular.io/docs/ts/latest/api/core/index/NgZone-class.html) (the analogue of [Java ThreadLocal](https://docs.oracle.com/javase/8/docs/api/java/lang/ThreadLocal.html)) and the MemoryGlobalCache.  
    The NgZoneGlobalCache service and [@ZoneCached](https://www.typescriptlang.org/docs/handbook/decorators.html) decorator are accessible for use.  
    The zone cache is cleared after the "Zone" area will have finished its work.  
2. **MEMORY** based on [JavaScript Map](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Map).  
    The MemoryGlobalCache service and [@MemoryCached](https://www.typescriptlang.org/docs/handbook/decorators.html) decorator are accessible for use.  
    The memory cache is cleared after F5.  
3. STORAGE based on the Window.sessionStorage (in progress)  
4. SESSION based on the Window.sessionStorage (in progress)  
5. FILE based on the chrome.fileSystem (in progress)  

Also, the **zoneCachedDate**, **memoryCachedDate** cached [date pipes](https://angular.io/docs/ts/latest/api/common/index/DatePipe-class.html) are accessible now for use.  

## Installation

First you need to install the npm module:
```sh
npm install angular2-cache --save
```

## Use

**main.ts**

We should integrate the cache providers at first.

```typescript
import {CACHE_PROVIDERS} from 'angular2-cache';

export function main() {
    return bootstrap(App, [
        CACHE_PROVIDERS,
        ...
    ]);
}
```

**app.ts**

Then we should connect the appropriate the cache service (NgZoneGlobalCache, MemoryGlobalCache, etc..).  The each cache 
service has the public methods for setting configuration (setEnableLogging, setEnable or setCachedValue for setting the not lazy presets values).

```typescript
import {NgZoneGlobalCache, MemoryGlobalCache} from 'angular2-cache';

@Component({...})
export class App {

   constructor(@Inject(NgZoneGlobalCache) protected ngZoneCache:NgZoneGlobalCache,  // If we want to use ZONE cache
               @Inject(MemoryGlobalCache) protected memoryCache:MemoryGlobalCache,  // If we want to use MEMORY cache
               ...) 
   {
       ngZoneCache.setEnableLogging(false);                                         // By default, the smart logger is enabled
       memoryCache.setEnable(false);                                                // By default, the cache is enabled
       
       // We can also warm up the cache at first
       // memoryCache.setCachedValue(new Date('11/11/2020'), 100500);
       ...
   }
```

**Service.ts**
```typescript
import {CacheKeyBuilder} from 'angular2-cache';

export class Service {

    private id:string;              // Identifier of the service ("cloud-1", "cloud-2", ...)
    private expiration:string;      // Expiration date of the service ("Sun Jul 30 2017 03:00:00 GMT+0300 (Russia TZ 2 Standard Time)", ...)
    
    ...
    
    @ZoneCached()
    public getExpirationDate():Date {
        return this.expiration
            ? new Date(this.expiration)
            : null;
    }

    public isExpired():boolean {
        return this.getExpirationDate() !== null                    // The first invoke - the code of <getExpirationDate> is executed
            && this.getExpirationDate() > new Date('12/12/2019');   // The second invoke - the code of <getExpirationDate> is NOT executed, and the result is taken from the cache     
    }

    /**
     * @override
     */
    public toString():string {
        // It's very important to override the toString() if cached method has no input arguments because the engine
        // uses the global cache key for identifying the result of "getExpirationDate()" for the each service instance
        
        return CacheKeyBuilder.make()
            .appendObjectName(this)     // Don't pass the "this" parameter to "append" method into "toString" code section!
            .append(this.getId())
            .build();                   // The composite key: entity type + entity Id
    }
}
```

**Service2.ts**
```typescript
import {CacheKeyBuilder} from 'angular2-cache';

export class Service {

    private id:string;              // Identifier of the service ("cloud-1", "cloud-2", ...)
    private expiration:string;      // Expiration date of the service ("Sun Jul 30 2017 03:00:00 GMT+0300 (Russia TZ 2 Standard Time)", ...)
    
    ...
    
    // The global cache key for the result of "getExpirationDate()" contains product id and uses it automatically
    @ZoneCached()
    public getExpirationDateByProduct(product:Product):Date {
        return this.expiration
            ? new Date(this.expiration)
            : null;
    }

    public isExpiredByProduct(product:Product):boolean {
        return this.getExpirationDateByProduct(product) !== null                     // The first invoke - the code of <getExpirationDate> is executed
            && this.getExpirationDateByProduct(product) > new Date('12/12/2019');    // The second invoke - the code of <getExpirationDate> is NOT executed, and the result is taken from the cache     
    }
}

export class Product {

    private id:string;              // Identifier of the service ("product-1", "product-2", ...)

    /**
     * @override
     */
    public toString():string {
        // It's very important to override the toString() because the engine uses the global cache key for 
        // identifying the product instance
        
        return CacheKeyBuilder.make()
            .appendObjectName(this)     // Don't pass the "this" parameter to "append" method into "toString" code section!
            .append(this.getId())
            .build();                   // The composite key: entity type + entity Id
    }
}
```

**app.html**
```html
<span [innerHTML]='"Expires: <strong>{expirationDate}</strong>" | translate: { expirationDate: ( expirationDate | zoneCachedDate: "yyyy-MM-dd" ) }'>
</span>
```

## Publish

```sh
npm run deploy
```

## License

Licensed under MIT.