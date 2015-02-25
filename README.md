# angular-action-sheet
a directive that provides content in a sheet that slides out like a drawer

This directive provides very a very simple content area that you can slide
in and out much like a modal with hopes of being less obtrusive than a modal
and more responsive on small screens.

**Note**: This project is unstable and very likely to change

## Installation

```
npm install --save angular-action-sheet
```

Include the directive in your html

```html
<script src="node_modules/angular-action-sheet/angular-action-sheet.js"></script>
```

Add `jbActionSheet` to your module's dependencies

```js
angular.module('MyApp', ['jbActionSheet']);
```

You'll probably want the styles too (for now, just .scss is provided)

```scss
@import "node_modules/angular-action-sheet/styles/sass/styles";
```

## Usage

Just use the `jb-action-sheet` directive somewhere and add your content:

```html
<jb-action-sheet reveal="someboolean" on-close="callWhenClosed()" size="'big'">
  <div>your content here</div>
</jb-action-sheet>
```

**Note**: Currently this directive hacks a `.jbas-clipped` class to the body when
the sheet is in the revealed state. This will be fixed sometime to be less
hacky.

## Directive Attributes

#### `reveal`

`reveal` is watched. When it becomes true, the sheet is revealed.

#### `on-close`

Provide any expression to be evaluated when the user clicks the close button
on the sheet.

#### `size`

A bit of a hacky solution at the moment to control the size of the sheet. Can
be any of `big`, `med`, `small`. 

This functionality is almost certianly going to change soon.


# TODO

Lots of things!
