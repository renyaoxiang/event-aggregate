(function($) {

	$.extend({
		_topicList : [],
		publish : function(topic) {
			if (!topic || !this._topicList[topic]) {
				return;
			}
			var topicList = this._topicList[topic];
			var argList = Array.prototype.slice.call(arguments);
			var args = argList.slice(0, 1);
			if (argList.length > 1) {
				args.push(argList.slice(1));
			}
			for (var i = 0; i < topicList.length; i++) {
				if (topicList[i]) {
					topicList[i].triggerHandler.apply(topicList[i], args);
				}
			}
		},
		subscribe : function(topic, callback) {
			if (!topic) {
				throw "topic name can not be null";
			}
			if (!this._topicList[topic]) {
				this._topicList[topic] = [];
			}
			var topicUnit = $({});
			topicUnit.on(topic, function() {
				var args = Array.prototype.slice.call(arguments);
				callback.apply(this, args.slice(1));
			});
			topicUnit._topic = topic;
			this._topicList[topic].push(topicUnit);
			return topicUnit;
		},
		unpublish : function(topic) {
			if (!topic) {
				throw "topic can not be null";
			}
			if (this._topicList[topic]) {
				delete this._topicList[topic];
			}
		},
		unsubscribe : function(topicUnit) {
			if (!topicUnit || !topicUnit._topic) {
				throw "topic can not be null";
			}
			if (!this._topicList[topicUnit._topic]) {
				return;
			}
			var topicList = this._topicList[topicUnit._topic];
			for (var i = 0; i < topicList.length; i++) {
				if (topicList[i] == topicUnit) {
					topicList[i] = null;
				}
			}
		}
	});

})(jQuery);
