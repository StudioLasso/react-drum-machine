export default URL.createObjectURL(new Blob([ '(',
	function() {
		var timerID=null;
		var interval=100;

		self.onmessage=function(e){
			if (e.data=="start") {
				console.log("starting");
				timerID=setInterval(function(){postMessage("tick");},interval)
			}
			else if (e.data=="stop") {
				console.log("stopping");
				clearInterval(timerID);
				timerID=null;
			}
		};
	}.toString(),
')()'], {type: 'application/javascript'}));
