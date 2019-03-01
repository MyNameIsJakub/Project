sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast"
], function (Controller, JSONModel, MessageToast) {
	"use strict";
	return Controller.extend("Project.Decidalo.controller.Home", {
		onInit: function () {
			var oData = {
				loginData: {
					eMail: "",
					password: ""
				}
			};
			var oModel = new JSONModel(oData);
			this.getView().setModel(oModel);
		},
		onLoginButtonPress: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			var eMail = this.getView().getModel().getProperty("/loginData/eMail");
			var password = this.getView().getModel().getProperty("/loginData/password");
			if (eMail == "123" && password == "123") {
				oRouter.navTo("loggedIn", {
					text: eMail
				});
				MessageToast.show("Sie wurden erfolgreich eingeloggt");
			} else {
				MessageToast.show("Bitte Eingaben überprüfen");
			}
		},
	});
});