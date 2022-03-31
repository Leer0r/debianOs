"use strict";
exports.__esModule = true;
var Application = /** @class */ (function () {
    function Application(name, logo, description, link, appNumber) {
        this.name = name;
        this.logo = logo;
        this.description = description;
        this.link = link;
        this.appNumber = appNumber;
    }
    Application.prototype.createAppWindow = function () {
        this.appWindow = document.createElement("div");
        this.appWindow.classList.add("window");
        this.appWindow.setAttribute("window_number", "" + this.appNumber);
        var topBar = document.createElement("div");
        topBar.classList.add("topBar");
        var appLogo = document.createElement("div");
        appLogo.classList.add("appLogo");
        appLogo.style.backgroundImage = this.logo;
        topBar.appendChild(appLogo);
        var appName = document.createElement("div");
        appName.classList.add("appName");
        appName.innerHTML = this.name;
        topBar.appendChild(appName);
        var navButton = document.createElement("div");
        navButton.classList.add("navButton");
        var reduceButton = document.createElement("div");
        reduceButton.classList.add("reduceButton");
        reduceButton.innerHTML = "-";
        navButton.appendChild(reduceButton);
        var fullscreenButton = document.createElement("div");
        fullscreenButton.classList.add("fullscreenButton");
        fullscreenButton.innerHTML = "^";
        navButton.appendChild(fullscreenButton);
        var closeButton = document.createElement("div");
        closeButton.classList.add("closeButton");
        closeButton.innerHTML = "x";
        navButton.appendChild(closeButton);
        topBar.appendChild(navButton);
        this.appWindow.appendChild(topBar);
        var core = document.createElement("div");
        core.classList.add("core");
        this.appWindow.appendChild(core);
        console.log(window);
        return this.appWindow;
    };
    Application.prototype.addAppNavBar = function () {
        this.navBar = document.createElement("div");
        this.navBar.classList.add("appContainer");
        this.navBar.classList.add("appDesign");
        this.navBar.setAttribute("windowNumber", "" + this.appNumber);
        this.navBar.style.backgroundImage = this.logo;
        return this.navBar;
    };
    return Application;
}());
exports["default"] = Application;
