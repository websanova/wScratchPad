(function ($) {
  'use strict';

  function ScratchPad(el, options) {
    this.$el = $(el);
    this.options = options;

    this.init = false;
    this.enabled = true;

    this._generate();
  }

  ScratchPad.prototype = {
    _generate: function () {

      // Throw message if canvas is not supported.
      if (!$.support.canvas) {
        this.$el.append('Canvas is not supported in this browser.');
        return true;
      }

      // Setup canvas and context.
      this.canvas = document.createElement('canvas');
      this.ctx = this.canvas.getContext('2d');

      // Make sure it's at least relative.
      if (this.$el.css('position') === 'static') {
        this.$el.css('position', 'relative');
      }

      this.$img = $('<img src=""/>').attr('crossOrigin', '').css({position: 'absolute', width: '100%', height: '100%'});

      // Make sure we sett style width height here for elastic stretch
      // and better support for mobile if we are resizing the scratch pad.
      this.$scratchpad = $(this.canvas).css({position: 'absolute', width: '100%', height: '100%'});
      
      this.$scratchpad.bindMobileEvents();

      // Setup event handlers.
      this.$scratchpad
      .mousedown($.proxy(function (e) {

        // If disabled we just return true which menas
        // our our this.scratch will remain as false.
        if (!this.enabled) {
          return true;
        }

        this.canvasOffset = $(this.canvas).offset();
        
        this.scratch = true;
        this._scratchFunc(e, 'Down');
      }, this))
      .mousemove($.proxy(function (e) {
        if (this.scratch) {
          this._scratchFunc(e, 'Move');
        }
      }, this))
      .mouseup($.proxy(function (e) {
        if (this.scratch) {
          this.scratch = false;
          this._scratchFunc(e, 'Up');
        }
      }, this));

      // Run options
      this._setOptions();

      // Apepnd items
      this.$el.append(this.$img).append(this.$scratchpad);

      // Initialize and reset
      this.init = true;
      this.reset();
    },

    reset: function () {
      var _this = this,
          width = Math.ceil(this.$el.innerWidth()),
          height = Math.ceil(this.$el.innerHeight()),
          devicePixelRatio = window.devicePixelRatio || 1;

      // Set number of pixels required for getting scratch percentage.
      this.pixels = width * height;

      // We'll do a hard reset for the height here in case
      // we need to run this at differnt sizes.
      this.$scratchpad.attr('width', width).attr('height', height);

      this.canvas.setAttribute('width', width * devicePixelRatio);
      this.canvas.setAttribute('height', height * devicePixelRatio);
      this.ctx.scale(devicePixelRatio, devicePixelRatio);

      this.pixels = width * devicePixelRatio * height * devicePixelRatio;

      // Default to image hidden in case no bg or color is set.
      this.$img.hide();

      // Set bg.
      if (this.options.bg) {
        if (this.options.bg.charAt(0) === '#') {
          this.$el.css('backgroundColor', this.options.bg);
        }
        else {
          this.$el.css('backgroundColor', '');
          this.$img.attr('src', this.options.bg);
        }
      }

      // Set fg.
      if (this.options.fg) {
        if (this.options.fg.charAt(0) === '#') {
          this.ctx.fillStyle = this.options.fg;
          this.ctx.beginPath();
          this.ctx.rect(0, 0, width, height);
          this.ctx.fill();
          this.$img.show();
        }
        else {
          // Have to load image before we can use it.
          $(new Image())
          .attr('src', this.options.fg)
          .load(function () {
            _this.ctx.drawImage(this, 0, 0, width, height);
            _this.$img.show();
          });
        }
      }
    },

    clear: function () {
      this.ctx.clearRect(0, 0, Math.ceil(this.$el.innerWidth()), Math.ceil(this.$el.innerHeight()));
    },

    enable: function (enabled) {
      this.enabled = enabled === true ? true : false;
    },

    destroy: function () {
      this.$el.children().remove();
      $.removeData(this.$el, 'wScratchPad');
    },

    _setOptions: function () {
      var opt, func;

      for (opt in this.options) {
        this.options[opt] = this.$el.attr('data-' + opt) || this.options[opt];
        func = 'set' + opt.charAt(0).toUpperCase() + opt.substring(1);

        if (this[func]) {
          this[func](this.options[opt]);
        }
      }
    },

    setBg: function () {
      if (this.init) {
        this.reset();
      }
    },

    setFg: function () {
      this.setBg();
    },

    setCursor: function (cursor) {
      this.$el.css('cursor', cursor);
    },

    _scratchFunc: function (e, event) {
      e.pageX = Math.floor(e.pageX - this.canvasOffset.left);
      e.pageY = Math.floor(e.pageY - this.canvasOffset.top);
      
      this['_scratch' + event](e);
      
      if (this.options.realtime || event === 'Up') {
        if (this.options['scratch' + event]) {
          this.options['scratch' + event].apply(this, [e, this._scratchPercent()]);
        }
      }
    },

    _scratchPercent: function() {
      var hits = 0,
          imageData = this.ctx.getImageData(0,0, this.canvas.width, this.canvas.height);
      
      for (var i=0, ii=imageData.data.length; i<ii; i=i+4) {
        if (imageData.data[i] === 0 && imageData.data[i+1] === 0 && imageData.data[i+2] === 0 && imageData.data[i+3] === 0) {
          hits++;
        }
      }
      
      return (hits / this.pixels) * 100;
    },

    _scratchDown: function (e) {
      this.ctx.globalCompositeOperation = 'destination-out';
      this.ctx.lineJoin = 'round';
      this.ctx.lineCap = 'round';
      this.ctx.strokeStyle = this.options.color;
      this.ctx.lineWidth = this.options.size;
      
      //draw single dot in case of a click without a move
      this.ctx.beginPath();
      this.ctx.arc(e.pageX, e.pageY, this.options.size/2, 0, Math.PI*2, true);
      this.ctx.closePath();
      this.ctx.fill();
      
      //start the path for a drag
      this.ctx.beginPath();
      this.ctx.moveTo(e.pageX, e.pageY);
    },
    
    _scratchMove: function (e) {
      this.ctx.lineTo(e.pageX, e.pageY);
      this.ctx.stroke();
    },
    
    _scratchUp: function () {
      this.ctx.closePath();
    }
  };

  $.support.canvas = (document.createElement('canvas')).getContext;

  $.fn.wScratchPad = function (options, value) {
    function get() {
      var wScratchPad = $.data(this, 'wScratchPad');

      if (!wScratchPad) {
        wScratchPad = new ScratchPad(this, $.extend(true, {}, options));
        $.data(this, 'wScratchPad', wScratchPad);
      }

      return wScratchPad;
    }

    if (typeof options === 'string') {
      var wScratchPad,
          values = [],
          func = (value !== undefined ? 'set' : 'get') + options.charAt(0).toUpperCase() + options.substring(1),

          setOpt = function () {
            if (wScratchPad.options[options]) { wScratchPad.options[options] = value; }
            if (wScratchPad[func]) { wScratchPad[func].apply(wScratchPad, [value]); }
          },

          getOpt = function () {
            if (wScratchPad[func]) { return wScratchPad[func].apply(wScratchPad, [value]); }
            else if (wScratchPad.options[options]) { return wScratchPad.options[options]; }
            else { return undefined; }
          },

          runOpt = function () {
            wScratchPad = $.data(this, 'wScratchPad');

            if (wScratchPad) {
              if (wScratchPad[options]) { wScratchPad[options].apply(wScratchPad, [value]); }
              else if (value !== undefined) { setOpt(); }
              else {  values.push(getOpt()); }
            }
          };

      this.each(runOpt);

      return values.length ? (values.length === 1 ? values[0] : values) : this;
    }

    options = $.extend({}, $.fn.wScratchPad.defaults, options);

    return this.each(get);
  };

  $.fn.wScratchPad.defaults = {
    size        : 5,          // The size of the brush/scratch.
    bg          : '#cacaca',  // Background (image path or hex color).
    fg          : '#6699ff',  // Foreground (image path or hex color).
    realtime    : true,       // Calculates percentage in realitime
    scratchDown : null,       // Set scratchDown callback.
    scratchUp   : null,       // Set scratchUp callback.
    scratchMove : null,       // Set scratcMove callback.
    cursor      : 'crosshair' // Set cursor.
  };

  $.fn.bindMobileEvents = function () {
    $(this).on('touchstart touchmove touchend touchcancel', function (event) {
      var touches = (event.changedTouches || event.originalEvent.targetTouches),
          first = touches[0],
          type = '';

      switch (event.type) {
      case 'touchstart':
        type = 'mousedown';
        break;
      case 'touchmove':
        type = 'mousemove';
        event.preventDefault();
        break;
      case 'touchend':
        type = 'mouseup';
        break;
      default:
        return;
      }

      var simulatedEvent = document.createEvent('MouseEvent'); 

      simulatedEvent.initMouseEvent(
        type, true, true, window, 1, 
        first.screenX, first.screenY, first.clientX, first.clientY, 
        false, false, false, false, 0/*left*/, null
      );

      first.target.dispatchEvent(simulatedEvent);
    });
  };
})(jQuery);