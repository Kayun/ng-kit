import { Observable, from } from 'rxjs'
import { map } from 'rxjs/operators'

export function dynamicImport<T> (module: Promise<T>): Observable<T> {
  return from(module).pipe(
    map((m: any) => (m.default || m) as T)
  )
}
