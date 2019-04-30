import { Observable, ReplaySubject } from 'rxjs'
import { dynamicImport } from '../utils'
import { map, tap } from 'rxjs/operators'

export abstract class AsyncInitializer<T extends Readonly<T>> {

  private internalReady = false

  private internalModule: T

  private internalSubject = new ReplaySubject<T>(1)

  public get ready$ (): Observable<T> {
    if (!this.ready) {
      this.loadModule().subscribe((module: T) => this.internalSubject.next(module))
    }

    return this.internalSubject.asObservable()
  }

  public get ready (): boolean {
    return this.internalReady
  }

  public get module (): T {
    return this.internalModule
  }

  protected abstract getModuleAsync (): Promise<T>

  protected abstract init (): (source: Observable<T>) => Observable<T>

  private loadModule (): Observable<T> {
    const moduleImport = this.getModuleAsync()

    return dynamicImport<T>(moduleImport).pipe(
      tap((module: T) => {
        this.internalReady = true
        this.internalModule = Object.freeze(module)
      }),
      map(() => this.internalModule),
      this.init()
    )
  }
}
