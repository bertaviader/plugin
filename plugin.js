(function()
{
	var ChartWidgetPlugin = function(settings) {
		var self = this;
		var currentSettings = settings;

		var today = new Date();

		var currentData = [];
	
		
		
		self.render = function(container)
		{
			$(container).append('<link rel="stylesheet" href="http://cdnjs.cloudflare.com/ajax/libs/jqPlot/1.0.8/jquery.jqplot.min.css" />');

			var chartDiv = '<div id="' + currentSettings.id + '"</div>';
			 htmlElement = $(chartDiv);
      			$(element).append(htmlElement);
			
		}

		self.onSettingsChanged = function (newSettings) {
      			currentSettings = newSettings;
    		}

		var gettimeToday = function() {
			var dd = today.getDate();
			var mm = today.getMonth()+1; //January is 0!
			var yyyy = today.getFullYear();
			var hour = today.getHours();
			var mmin = today.getMinutes();

			if(dd<10) {
			    dd='0'+dd
			} 

			if(mm<10) {
			    mm='0'+mm
			} 

			today = yyyy+'-'+mm+'-'+dd+' '+hour+':'+mmin;
		}

		//funccio add mirar si nomes te 1 valor = [currentDate], altrament res. Despres el push

		var addSeries = function(dat) {
			if(currentData[0] == today) {
				currentData = [currentData];
			}
			var d = [today,dat]
			currentData.push(d);
		}
	
		self.onCalculatedValueChanged = function(settingName, newValue)
		{
			gettimeToday();
			if (settingName == 'res') {
				addSeries(newValue);
			}
			$.jqplot(currentSettings.id, [currentData], {
				axes:{
					xaxis:{
						renderer:$.jqplot.DateAxisRenderer,
						tickOptions:{formatString: '%H:%M:%S'}
					}				
				},
				series:[{lineWidth:4, markerOptions:{style:'square'}}]
			});
		}

		self.onDispose = function() {
		}
	};
	
	freeboard.loadWidgetPlugin({

		"type_name"   : "LineChart",
		"display_name": "Line Chart",
       		"description" : "Historial Line Chart",

		"external_scripts": [
			"http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js",
			"https://rawgit.com/svandecappelle/jQPlot/master/src/core/jquery.jqplot.js",
			"https://rawgit.com/svandecappelle/jQPlot/master/src/plugins/axis/jqplot.dateAxisRenderer.js"		
		],

		"fill_size" : true,
		"settings"    : [
			{
				"name": "id",
				"display_name": "id",
				"default_value": "chart1",
				"description": "dom element id of the chart (must be unique for multiple charts)"
		   	},
			{
				"name"        : "res",
				"display_name": "Response Time",
				"type"        : "calculated"
			},
			{
			     	"name":           "max_points",
			   	"display_name":   "Max Points",
				"type":           "number",
				"default_value":  30,
			     }
		],


	newInstance   : function(settings, newInstanceCallback)
		{
		newInstanceCallback(new myDatasourcePlugin(settings));
		}
	});

}());
        			
			

		
