window.location.staticAssign = function(val) {
	window.history.pushState(null, null, val);
	window.dispatchEvent(new Event("popstate"));
};
export {};