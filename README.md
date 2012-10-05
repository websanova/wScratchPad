# wScratchPad.js

A jQuery plugin to simulate scratching a card/ticket/etc (mobile friendly). [Check out the live demo](http://www.websanova.com/plugins/scratchpad/html5).


## Settings

Available options with notes, the values here are the defaults.

```javascript
$('input, textarea').wScratchPad({
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

Update settings on the fly:

```javascript
$('input').wScratchPad('width', 300);
```

Retrieve settings, if more than one it will return an array otherwise just the value.

```javascript
console.log($('#elem').wScratchPad('size'));            // 10
console.log($('input').wScratchPad('size'));            // ['10', '10', '10']
```

## Functions

```javascript
$('#elem').wScratchPad('reset');
```

## Examples

Show percent scratched:

```html
<div id="wScratchPad"></div>

<div>
    percent scratched: <span id="percent_scratched"></span>
</div>

<script type="text/javascript">
    var sp = $("#wScratchPad").wScratchPad({
        scratchDown: function(e, percent){$("#percent_scratched").html(percent)},
        scratchMove: function(e, percent){$("#percent_scratched").html(percent)},
        scratchUp: function(e, percent){$("#percent_scratched").html(percent)}
    });
</script>
```

Update on the fly:

```html
<div id="wScratchPad"></div>

<script type="text/javascript">
    var sp = $("#wScratchPad").wScratchPad();

    sp.wScratchPad('width', '200');
    sp.wScratchPad('image', './images/winner.png');
    sp.wScratchPad('image2', './images/scratch-to-win.png');
    sp.wScratchPad('cursor', './cursors/coin.png');
    sp.wScratchPad('reset');
</script>
```

Init with custom cursor:

```html
<div id="wScratchPad"></div>

<script type="text/javascript">
    $("#wScratchPad").wScratchPad({
        cursor:'./cursors/mario.png'
    });
</script>
```


## License

MIT licensed

Copyright (C) 2011-2012 Websanova http://www.websanova.com