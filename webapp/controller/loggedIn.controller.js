sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast",
	"sap/ui/core/Fragment"
], function (Controller, JSONModel, MessageToast, Fragment) {
	"use strict";
	return Controller.extend("Project.Decidalo.controller.loggedIn", {
		onInit: function () {
			var oData = {
				loginData: {
					user: ""
				}
			};
			var oModel = new JSONModel(oData);
			this.getView().setModel(oModel);
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("loggedIn").attachPatternMatched(this._onObejctMatched, this);
		},
		_onObejctMatched: function (oEvent) {
			var text = oEvent.getParameter("arguments").text;
			this.getView().getModel().setProperty("/loginData/user", text);
		},
		handleOpen: function (oEvent) {
			var oButton = oEvent.getSource();
			if (!this._actionSheet) {
				this._actionSheet = sap.ui.xmlfragment("Project.Decidalo.view.userButton", this);
				this.getView().addDependent(this._actionSheet);
			}
			this._actionSheet.openBy(oButton);
		},
		onLogoutButtonPress: function () {
			MessageToast.show("Sie wurden erfolgreich ausgeloggt");
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("Home");
		},
		/**
		 *@memberOf Project.Decidalo.controller.loggedIn
		 */
		action: function (oEvent) {
			var that = this;
			var actionParameters = JSON.parse(oEvent.getSource().data("wiring").replace(/'/g, "\""));
			var eventType = oEvent.getId();
			var aTargets = actionParameters[eventType].targets || [];
			aTargets.forEach(function (oTarget) {
				var oControl = that.byId(oTarget.id);
				if (oControl) {
					var oParams = {};
					for (var prop in oTarget.parameters) {
						oParams[prop] = oEvent.getParameter(oTarget.parameters[prop]);
					}
					oControl[oTarget.action](oParams);
				}
			});
			var oNavigation = actionParameters[eventType].navigation;
			if (oNavigation) {
				var oParams = {};
				(oNavigation.keys || []).forEach(function (prop) {
					oParams[prop.name] = encodeURIComponent(JSON.stringify({
						value: oEvent.getSource().getBindingContext(oNavigation.model).getProperty(prop.name),
						type: prop.type
					}));
				});
				if (Object.getOwnPropertyNames(oParams).length !== 0) {
					this.getOwnerComponent().getRouter().navTo(oNavigation.routeName, oParams);
				} else {
					this.getOwnerComponent().getRouter().navTo(oNavigation.routeName);
				}
			}
		},
		/**
		 *@memberOf Project.Decidalo.controller.loggedIn
		 */
		onTool1Press: function (oEvent) {
			alert("Hallo");
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("Tool1");
		}
	});
});