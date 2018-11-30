# Angular InlineScriptComponent

Angular to [prevent script downloads on demand](https://github.com/angular/angular/issues/4903#issuecomment-151073263) from Components removes `<script>` tag from templates. `InlineScriptComponent` allows insert javascript code into your page, using dynamically creating a tag `<script>`.

Supports Server Side Rendering whit [Angular Universal](https://angular.io/guide/universal).

## Setup
Install library
```
npm install --save-dev @ng-assets/inline-script
```
Import `InlineScriptModule` into the root module

```typescript
import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { InlineScriptModule } from '@ng-assets/inline-script'

import { AppComponent } from './app.component'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    InlineScriptModule.forRoot()
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
```
In the component template add component `<nga-inline-script>`
```typescript
export class AppComponent {
  public message = 'It`s work!';
}
```
```html
<nga-inline-script script="
  (function(w) {
    w.field = '{{ message }}'
    console.log(w.field)
  })(window)
"></nga-inline-script>
```
or
```typescript
export class AppComponent {
  public message = 'It`s work!';
  
  public script = `
    (function(w) {
      w.field = '${ this.message }'
      console.log(w.field)
    })(window)
  `
}
```
```html
<nga-inline-script [script]="script"></nga-inline-script>
```
Script will correctly execute and display `It's work!` in the console

