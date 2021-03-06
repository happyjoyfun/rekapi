;(function rekapiCore (global) {
  
  if (!_) {
    throw 'underscore.js is required for Kapi.';
  }
  
  if (!Tweenable) {
    throw 'shifty.js is required for Kapi.';
  }
  
  var gk
      ,defaultConfig;
  
  /**
   * @param {HTMLCanvas} canvas
   * @param {string} dimension The dimension (either "height" or "width") to
   *    get or set.
   * @param {number} opt_new_size The new value to set for `dimension`.
   */
  function canvas_dimension (canvas, dimension, opt_new_size) {
    if (typeof opt_new_size !== 'undefined') {
      canvas[dimension] = opt_new_size;
      canvas.style[dimension] = opt_new_size + 'px';
    }
    
    return canvas[dimension];
  }
  
  /**
	 * Sorts an array numerically, from smallest to largest.
	 * @param {Array} array The Array to sort.
	 * @returns {Array} The sorted Array.
	 */
  function sortNumerically (array) {
		return array.sort(function (a, b) {
			return a - b;
		});
	}
  
  function noop () {
    // NOOP!
  }
  
  defaultConfig = {
    'fps': 30
  };
  
  /**
   * @param {HTMLCanvas} canvas
   * @param {Object} config
   * @param {Object} events
   */
  gk = global.Kapi || function Kapi (canvas, config, events) {
    this.canvas = canvas;
    this.canvas_context = canvas.getContext('2d');
    
    this.config = {};
    this._actors = {};
    this._drawOrder = [];
    _.extend(this.config, config);
    _.defaults(this.config, defaultConfig);
    
    return this;
  };
  
  gk.prototype.height = function (opt_height) {
    return canvas_dimension(this.canvas, 'height', opt_height);
  };
  
  gk.prototype.width = function (opt_width) {
    return canvas_dimension(this.canvas, 'width', opt_width);
  };
  
  /**
   * Get or set a style on the Kapi canvas.
   * @param {string} styleName
   * @param {number|string} opt_styleValue The value to set for `styleName`
   */
  gk.prototype.canvas_style = function (styleName, opt_styleValue) {
    if (typeof opt_styleValue !== 'undefined') {
      this.canvas.style[styleName] = opt_styleValue;
    }
    
    return this.canvas.style[styleName];
  }
  
  /**
   * Gets the 2d context of the Kapi's canvas.
   */
  gk.prototype.context = function () {
    return this.canvas_context;
  };
  
  
  /**
   * @param {number} millisecond
   */
  gk.prototype.render = function (millisecond) {
    var i, len
        ,currentActor;
    
    len = this._drawOrder.length;
    
    for (i = 0; i < len; i++) {
      currentActor = this._drawOrder[i];
    }
  };
  
  
  /**
   * @param {Kapi.Actor} actor
   * @param {Object} initialState
   */
  gk.prototype.add = function (actor, initialState) {
    actor.set(initialState);
    this._actors[actor.id] = actor;
    this._drawOrder.push(actor.id);
  };
  
  gk.util = {};
  
  _.extend(gk.util, {
    'noop': noop
    ,'sortNumerically': sortNumerically
  });
  
  
  global.Kapi = gk;
  
} (this));