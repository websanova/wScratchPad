# wScratchPad.js

A jQuery plugin to mimic a scratch card or pad behaviour.  Allowing you to scratch off an overlay as either a color or image.

* [View the wScratchPad demo](http://wscratchpad.websanova.com)
* [Download the lastest version of wScratchPad](https://github.com/websanova/wScratchPad/tags)


## Related Plugins

* [wPaint](http://wpaint.websanova.com) - Simple paint drawing plugin.
* [wColorPicker](http://wcolorpicker.websanova.com) - Color pallette seleciton plugin.


## Settings

Available options with notes, the values here are the defaults.

```js
$('#elem').wScratchPad({
  size        : 5,          // The size of the brush/scratch.
  bg          : '#cacaca',  // Background (image path or hex color).
  fg          : '#6699ff',  // Foreground (image path or hex color).
  realtime    : true,       // Calculates percentage in realitime.
  scratchDown : null,       // Set scratchDown callback.
  scratchUp   : null,       // Set scratchUp callback.
  scratchMove : null,       // Set scratcMove callback.
  cursor      : 'crosshair' // Set cursor.
});
```

Note on `realtime`, if set to `false` this will only send percentage calculations to the `scratchUp` and should be used to increase performance.

Note on `bg` and `fg`, these can be eitehr a valid hex color beginning with `#` otherwise it will default to trying to set an image.

## Examples

Include the following files:

```js
<script type="text/javascript" src="./wScratchPad.min.js"></script>
```

### Percent scratched

```js
$("#elem").wScratchPad({
  scratchDown: function(e, percent){ console.log(percent); },
  scratchMove: function(e, percent){ console.log(percent); },
  scratchUp: function(e, percent){ console.log(percent); }
});
```

### Update on the Fly

```js
var sp = $("#elem").wScratchPad();

sp.wScratchPad('size', 5);
sp.wScratchPad('cursor', 'url("./cursors/coin.png") 5 5, default');

// Or directly with element.

$("#elem").wScratchPad('image', './images/winner.png');
```

### Methods

```js
$('#elem').wScratchPad('reset');
$('#elem').wScratchPad('clear');
$('#elem').wScratchPad('enabled', <boolean>);
```


## Resources

* [More jQuery plugins by Websanova](http://websanova.com/plugins)
* [Websanova JavaScript Extensions Project](http://websanova.com/extensions)
* [jQuery Plugin Development Boilerplate](http://wboiler.websanova.com)
* [The Ultimate Guide to Writing jQuery Plugins](http://www.websanova.com/blog/jquery/the-ultimate-guide-to-writing-jquery-plugins)


## License

MIT licensed

Copyright (C) 2011-2012 Websanova http://www.websanova.com