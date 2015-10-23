(function ( $ ) {
	
	var gridClassName = 'rv-grid';
	var cellClassName = 'rv-cell';
	var cellPrerssedClassName = 'rv-cell-pressed';
	var cellReleasedClassName = 'rv-cell-released';
	var defaults = {
				/*cellWidth: 30,
				cellHeight: 21,*/
				fillStartCorner: 'LeftTop', // LeftTop, LeftBottom, RightTop, RightBottom.
				fillDirection: 'Horizontal', // Horizontal, Vertical
				gridWidth: 10,
				gridHeight: 8};

	var methods = {
        init : function(options) {
			var settings = $.extend({}, defaults );
			settings = $.extend(settings, options );
			
			// Clear html to reinitialize (in case if it was initialized before).
			this.empty();
			this.addClass(gridClassName);
			
			/* OLD LOGIC FOR POSITION BY COORDINATES - CAN BE MODIFIED TO USE CUSTOM SHAPE FILLING */
			/*function getX(idx){
				switch(settings['fillStartCorner']){
					case 'RightTop':
					case 'RightBottom':
						if(settings['fillDirection'] === 'Vertical'){
							return settings['gridWidth'] - Math.floor(idx/settings['gridHeight']) - 1;
						} else {
							return settings['gridWidth'] - idx % settings['gridWidth'] - 1;
						}
					case 'LeftTop':
					case 'LeftBottom':
					default:
						if(settings['fillDirection'] === 'Vertical'){
							return Math.floor(idx/settings['gridHeight']);
						} else {
							return idx % settings['gridWidth'];
						}
				}
			}
        
			function getY(idx){
				switch(settings['fillStartCorner']){
					case 'LeftBottom':
					case 'RightBottom':
						if(settings['fillDirection'] === 'Vertical'){
							return settings['gridHeight'] - idx % settings['gridHeight'] - 1;
						} else {
							return settings['gridHeight'] - Math.floor(idx/settings['gridWidth']) - 1;
						}
					case 'LeftTop':
					case 'RightTop':
					default:
						if(settings['fillDirection'] === 'Vertical'){
							return idx % settings['gridHeight'];
						} else {
							return Math.floor(idx/settings['gridWidth']);
						}
				}
			}

			// Create and initialize cells.
			var count = settings['gridWidth'] * settings['gridHeight'];
			for(var i = 0; i < count; i++){
				var x = getX(i);
				var y = getY(i);
				
				var top = y * settings['cellHeight'] + 'px';
				var left = x * settings['cellWidth'] + 'px';

				var cell = $('<div>').text(i)
					.addClass(cellClassName)
					.attr('data-idx', i)
					.css({'top': top,
							 'left':left,
							 'height':settings['cellHeight'] + 'px',
							 'width':settings['cellWidth'] + 'px'});
							 
				this.append(cell);
			}
			*/
			function getIndex(x, y){
				var w = settings['gridWidth'];
				var h = settings['gridHeight'];
				switch(settings['fillStartCorner']){
					case 'RightTop':
						if(settings['fillDirection'] === 'Vertical'){
							return (w - x - 1)  * h + y;
						} else {
							return (w - x - 1)  + y * w;
						}
					case 'RightBottom':
						if(settings['fillDirection'] === 'Vertical'){
							return (h - y - 1) + h * (w - x - 1) ;
						} else {
							return (w - x - 1) + w * (h - y - 1);
						}
					case 'LeftBottom':
						if(settings['fillDirection'] === 'Vertical'){
							return (h - y - 1) + h * x;
						} else {
							return x + w * (h - y - 1);
						}
					case 'LeftTop':
					default:
						if(settings['fillDirection'] === 'Vertical'){
							return x * h + y;
						} else {
							return x + y * w;
						}
				}
			}

			// NEW LOGIC - rectangle shape only.
			for(var y = 0; y < settings['gridHeight']; y++){
				var row = $('<div>').addClass('rv-row');
				for(var x = 0; x < settings['gridWidth']; x++){
					var idx = getIndex(x, y);
					var cell = $('<div>').text(idx)
					.addClass(cellClassName)
					.addClass(cellReleasedClassName)
					.attr('data-idx', idx);

				row.append(cell);
				}
				this.append(row);
			}
			
			return this;
        },
		setState: function(idx, state){
			var add, remove;
			if(state){
				add = cellPrerssedClassName;
				remove = cellReleasedClassName;
			} else {
				add = cellReleasedClassName;
				remove = cellPrerssedClassName;
			}
			
			this.find('.' + cellClassName + '[data-idx='+idx+']').switchClass( remove, add, 400);
		}
    };
	
	 $.fn.reveal = function(methodOrOptions) {
        if ( methods[methodOrOptions] ) {
            return methods[ methodOrOptions ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
            // Default to "init"
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  methodOrOptions + ' does not exist on jQuery.reveal' );
        }    
    };
 
}( jQuery ));