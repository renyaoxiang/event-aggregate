/** 注册事件 */
var topicListener = $.subscribe("topic/action",function(data1,data2){console.log(data1,data2)});
/** 发布事件 */
$.publish("topic/action",{a:1},{b:2});
/** 取消注册的事件 */
$.unsubscribe(topicListener);
/** 取消某个主题的全部注册事件 */
$.unpublish("topic/action");
