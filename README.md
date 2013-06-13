# wScratchPad.js

A jQuery plugin to mimic a scratch card or pad behaviour.  Allowing you to scratch off an overlay as either a color or image.

* [View the wScratchPad demo](http://wscratchpad.websanova.com)
* [Download the lastest version of wScratchPad](https://github.com/websanova/wScratchPad/tags)


## Related Plugins

* [wPaint](http://wpaint.websanova.com) - Simple paint drawing plugin.
* [wColorPicker](http://wcolorpicker.websanova.com) - Color pallette seleciton plugin.


## Settings

Available options with notes, the values here are the defaults.

```javascript
$('#elem').wScratchPad({
    width         : 210,                 // set width - best to match image width
    height        : 100,                 // set height - best to match image height
    image         : 'images/slide1.jpg', // set image path
    image2        : null,                // set overlay image path - if set color is not used
    color         : '#336699',           // set scratch color - if image2 is not set uses color
    overlay       : 'none',              // set the type of overlay effect 'none', 'lighter' - only used with color
    size          : 10,                  // set size of scratcher
    scratchDown   : null,                // scratchDown callback
    scratchUp     : null,                // scratchUp callback
    scratchMove   : null,                // scratcMove callback
    cursor        : null                 // Set path to custom cursor
});
```

## Examples

Include the following files:

```js
<script type="text/javascript" src="./wScratchPad.js"></script>
<link rel="Stylesheet" type="text/css" href="./wScratchPad.css" />
```

### percent scratched

```js
$("#elem").wScratchPad({
    scratchDown: function(e, percent){ console.log(percent); },
    scratchMove: function(e, percent){ console.log(percent); },
    scratchUp: function(e, percent){ console.log(percent); }
});
```

### updat eon the fly

```js
var sp = $("#wScratchPad").wScratchPad();

sp.wScratchPad('width', '200');
sp.wScratchPad('image', './images/winner.png');
sp.wScratchPad('image2', './images/scratch-to-win.png');
sp.wScratchPad('cursor', './cursors/coin.png');
sp.wScratchPad('reset');
```

### custom cursor:

You can init the scratch pad with a custom cursor by setting a path to an image using the cursor option.

```js
$("#wScratchPad").wScratchPad({
    cursor:'./cursors/mario.png'
});
```

### methods

```js
$('#elem').wScratchPad('reset');
$('#elem').wScratchPad('clear');
$('#elem').wScratchPad('enabled', <boolean>);
```


## Resources

* [More jQuery plugins by Websanova](http://websanova.com/plugins)
* [jQuery Plugin Development Boilerplate](http://www.websanova.com/tutorials/jquery/jquery-plugin-development-boilerplate)
* [The Ultimate Guide to Writing jQuery Plugins](http://www.websanova.com/tutorials/jquery/the-ultimate-guide-to-writing-jquery-plugins)


## License

MIT licensed

Copyright (C) 2011-2012 Websanova http://www.websanova.com