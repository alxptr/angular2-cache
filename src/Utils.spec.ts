import {CacheKeyBuilder} from './Utils';

describe('Utils', ()=> {

    describe('Checking the CacheKeyBuilder', ()=> {

        describe('No constructor parameters', ()=> {
            it('No constructor parameters. Test1', ()=> {
                expect(CacheKeyBuilder.make().append(1).append(2).build()).toEqual('1.2');
            });

            it('No constructor parameters. Test2', ()=> {
                const date:Date = new Date('01/01/2016');
                expect(CacheKeyBuilder.make().append('key').append(date).build()).toEqual('key.1451595600000');
            });

            it('No constructor parameters. Test3', ()=> {
                const date:Date = new Date('01/01/2016');
                expect(CacheKeyBuilder.make().append(date).build()).toEqual('1451595600000');
            });

            it('No constructor parameters. Test4', ()=> {
                expect(CacheKeyBuilder.make().build()).toEqual('');
            });
        });

        describe('Constructor parameters are present', ()=> {
            it('Constructor parameters are present. Test1', ()=> {
                expect(CacheKeyBuilder.make(1).append(2).append(3).build()).toEqual('1.2.3');
            });

            it('Constructor parameters are present. Test2', ()=> {
                const date:Date = new Date('01/01/2016');
                expect(CacheKeyBuilder.make("key").append(date).build()).toEqual('key.1451595600000');
            });

            it('Constructor parameters are present. Test3', ()=> {
                const date:Date = new Date('01/01/2016');
                expect(CacheKeyBuilder.make([1, 2, 3]).append(date).build()).toEqual('1.2.3.1451595600000');
            });

            it('Constructor parameters are present. Test4', ()=> {
                expect(CacheKeyBuilder.make([[1, 2, 3], 4, [5, 6]]).append([7, 8, [9, 10]]).build()).toEqual('1.2.3.4.5.6.7.8.9.10');
            });

            it('Constructor parameters are present. Test5', ()=> {
                const date:Date = new Date('01/01/2016');
                expect(CacheKeyBuilder.make(1, 2, 3, 4, 5).append(6, 7, 8, 9, date).build()).toEqual('1.2.3.4.5.6.7.8.9.1451595600000');
            });
        });

        describe('User instance of class as parameter', ()=> {
            it('User class as parameter. Test1', ()=> {
                class Test {
                    toString() {
                        return "2";
                    }
                }
                expect(CacheKeyBuilder.make(1).append(new Test()).append(3).build()).toEqual('1.2.3');
            });

            it('User class as parameter. Test2', ()=> {
                class Test {
                    toString():string {
                        return CacheKeyBuilder.make()
                            .appendObjectName(this)
                            .append(2)
                            .build();
                    }
                }
                expect(CacheKeyBuilder.make(1).append(new Test()).append(3).build()).toEqual('1.Test.2.3');
            });

            it('User class as parameter. Test3', ()=> {
                class Test {
                    toString():string {
                        return CacheKeyBuilder.make()
                            .appendObjectName(this)
                            .build();
                    }
                }
                expect(CacheKeyBuilder.make(new Test()).append([new Test(), new Test()]).append(100500).build()).toEqual('Test.Test.Test.100500');
            });

            it('User class as parameter. Test4', ()=> {
                class Test {
                }
                expect(CacheKeyBuilder.make(1).append(new Test()).append(3).build()).toEqual('1.Test.3');
            });
        });

        describe('Primitive wrapper as parameter', ()=> {
            it('Primitive wrapper as parameter. Test1', ()=> {
                expect(CacheKeyBuilder.make(1).append("2").append(false).build()).toEqual('1.2.false');
            });
        });

        describe('Null and undefined as parameter', ()=> {
            it('Null and undefined as parameter. Test1', ()=> {
                expect(CacheKeyBuilder.make(null, null).append(null).append(undefined).build()).toEqual('null.null.null.undefined');
            });
        });
    });
});
