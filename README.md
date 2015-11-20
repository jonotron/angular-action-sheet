# slidey-pane
a directive that provides content in a pane that slides out like a drawer

This directive provides very a very simple content area that you can slide
in and out much like a modal with hopes of being less obtrusive than a modal
and more responsive on small screens.

**Note**: This project is unstable and very likely to change

## Installation

```
npm install --save slidey-pane
```

Include the directive in your html

```html
<script src="node_modules/slidey-pane/slidey-pane.js"></script>
```

Add `jbSlideyPane` to your module's dependencies

```js
angular.module('MyApp', ['jbSlideyPane']);
```

You'll probably want the styles too (for now, just .scss is provided)

```scss
@import "node_modules/slidey-pane/styles/sass/styles";
```

## Usage

Just use the `jb-slidey-pane` directive somewhere and add your content:

```html
<jb-slidey-pane reveal="someboolean" on-close="callWhenClosed()">
  <div>your content here</div>
</jb-slidey-pane>
```

If you want to create custom pane sizes, just define some styles like this:

```css
.big > .jbsp-pane {
  width: 80%;
}

.med > .jbsp-pane {
  width: 50%;
}
```

then include the class on the `jb-slidey-pane` directive like this:

```html
<jb-slidey-pane class="big"></jb-slidey-pane>
```

**Optionally**: you can use the included `dist/sizes.css` which provides
`.jbsp-pane--big`, `.jbsp-pane--med`, `.jbsp-pane--small`.

**Note**: Currently this directive hacks a `.jbsp-clipped` class to the body when
the pane is in the revealed state. This will be fixed sometime to be less
hacky.

## Directive Attributes

#### `reveal`

`reveal` is watched. When it becomes true, the pane is revealed.

#### `on-close`

Provide any expression to be evaluated when the user clicks the close button
on the pane.

#### `size`

A bit of a hacky solution at the moment to control the size of the pane. Can
be any of `big`, `med`, `small`. 

This functionality is almost certianly going to change soon.


# TODO

Lots of things!
