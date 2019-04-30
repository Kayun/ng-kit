# NG-Assets Core Library
Classes and utilities for general purposes.

## Classes

### *AsyncInitializer\<T\>*

An abstract class that implements the interface for working with loading asynchronous
modules, through the mechanism of dynamic imports - [`import()`](https://webpack.js.org/api/module-methods/#import-1).

#### Methods
In the child class, you must implement two abstract methods:

- `protected abstract init(): (source: Observable<T>) => Observable<Readonly<T>>` - method is 
called when the required library/module is loaded and there is access to it inside the class.
Acts as an asynchronous constructor. If, after loading the module, no additional configurations
are required, then an observer is simply forwarding:
```typescript
protected init(): (source: Observable<T>) => Observable<T> {
  return (source: Observable<T>) => source;
}
```
- `protected abstract getModuleAsync(): Promise<T>;` - loads a module on demand using dynamic import.
Simple implementation:
```typescript
protected getModuleAsync(): Promise<T> {
  return import('some-ouside-library');
}
```

#### Fields
- `public ready$: Observable<any>` - provides a cold subscription to an event asynchronous class
initialization. Emits an event after loading a module and executing a method `#init()`.
Inside it uses `ReplaySubject`, so asynchronous readiness of the class can be tracked by
subscribing to event after the moment of initialization.
- `public ready: boolean` - synchronous class readiness status for use. Returns `true` if the
external module was loaded successfully and no errors occurred during the class initialization
process.
- `public module: Readonly<any>` - reference to the object of the loaded module. Returns a frozen
object readable, `return Object.freeze (module)`.

#### Note
The `AsyncInitializer` class is used if you need some kind of third-party library that is needed
on demand and is not needed at the time of application initialization.

Subscribing to a class initialization event (`ready$`) needs **ONLY** outside the class.
Subscribe to the constructor of the same class breaks all the logic of lazy loading the module,
in most cases.

#### Example
```typescript
import { AsyncInitializer } from '@ng-assets/core';

export interface LibraryApi {
  generateId(): string
}

@Injectable()
export class SomeService extends AsyncInitializer<LibraryApi> {
  
  public get id(): string {
    return this.internalId
  }
  
  private internalId: string;
  
  constructor() {
    super();
  }
  
  public generateId(): string {
    return this.module.generateId()
  }
  
  protected init(): (source: Observable<LibraryApi>) => Observable<LibraryApi> {
    return (source: Observable<LibraryApi>) => source.pipe(
      tap((library: LibraryApi) => {
        this.internalId = library.generateId()
      })
    );
  }

  protected getModuleAsync(): Promise<LibraryApi> {
    return import(
      /* webpackChunkName: "library-chunk" */
      'library'
    );
  }
}
```

In the component class, we initialize the loading of the module:
```typescript
@Component({...})
export class SomeComponent implements OnInit {
  
  constructor(
    private service: SomeService
  ) {}
  
  public ngOnInit(): void {
    this.service.ready$.subscribe((library: LibraryApi) => {
      // class ready for use
      console.log(this.service.id)
    })
  }
}
```

### *IdGenerator*

Abstract class, acts as an interface. Since Angular does not support dependency injection on
interfaces, you can use an abstract class to get around this javascript.

#### Methods
In the child class, you must implement one abstract method:

- `public abstract getId (): string` - returns `id`, id depends on the implementation of a particular class

## Utils

### *dynamicImport*

#### Signature
`dynamicImport<T> (module: Promise<T>): Observable<T>`

#### Note
Used for es6 dynamic import, for normalizing an imported module.

#### Example
```typescript
const moduleImport = import('some-library');

dynamicImport<any>(moduleImport).subscribe(library => {
  library.method()
})
```
