# angular2-cache

An implementation of cache at Angular2.

## Description

The cache service supports the following types of caching:  

1. **ZONE** via NgZone (the analogue of [Java ThreadLocal](https://docs.oracle.com/javase/8/docs/api/java/lang/ThreadLocal.html))
2. MEMORY (JavaScript heap) (in progress)  
3. STORAGE via Window.sessionStorage (in progress)  
4. SESSION via Window.sessionStorage (in progress)
5. FILE via chrome.fileSystem (in progress)

## Installation

First you need to install the npm module:
```sh
npm install angular2-cache --save
```

## Use

**main.ts**
```typescript
import {CACHE_PROVIDERS} from 'angular2-cache';

export function main() {
    return bootstrap(App, [
        CACHE_PROVIDERS,
        ...
    ]);
}
```

**Service.ts**
```typescript
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
        return this.getId();
    }
}
```

**Service2.ts**
```typescript
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
        return this.getId();
    }
}
```

## Publish

```sh
npm run deploy
```

## License

Licensed under MIT.