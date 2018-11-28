# Angular InlineScriptComponent

Angular to [prevent script downloads on demand](https://github.com/angular/angular/issues/4903#issuecomment-151073263) from Components removes `<script>` tag from templates. `InlineScriptComponent` allows insert javascript code into your page, using dynamically creating a tag `<script>`.

Supports Server Side Rendering whit [Angular Universal](https://angular.io/guide/universal).

## Setup
Install library
```
npm install --save-dev @ng-assets/inline-script
```
Import `InlineScriptModule` into the root module or to any other module

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
    InlineScriptModule
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
```
or add a declaration for `InlineScriptComponent`
```typescript
import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { InlineScriptComponent } from '@ng-assets/inline-script'

import { AppComponent } from './app.component'

@NgModule({
  declarations: [
    AppComponent,
    InlineScriptComponent
  ],
  imports: [
    BrowserModule
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
<nga-inline-script>
  console.log({{ message }})
</nga-inline-script>
```
Script will correctly execute and display `It's work!` in the console

