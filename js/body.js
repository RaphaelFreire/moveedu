Notification.requestPermission().then(function(result) {
	if (result === "denied") {
		console.log("A permissão não foi concedida. Permitir uma nova tentativa.");
		return;
	}
	if (result === "default") {
		console.log("O pedido de permissão foi recusado.");
		return;
	}
	// Do something with the granted permission.
});
