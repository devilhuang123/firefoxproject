function Assert(condition, message) {
    if (!condition) {
    	alert(message || "Assertion failed");
        throw message || "Assertion failed";
    }
}