//////////////////////APPLICATION//////////////////////////
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Application = /** @class */ (function () {
    function Application(properties) {
        this.properties = {
            description: properties.description,
            link: properties.link,
            logo: properties.logo,
            name: properties.name,
            storeName: properties.storeName,
            appNumber: properties.appNumber
        };
    }
    Application.prototype.setAppNumber = function (appNumber) {
        this.properties.appNumber = appNumber;
    };
    Application.prototype.createAppWindow = function () {
        this.appWindow = document.createElement("div");
        this.appWindow.classList.add("window");
        this.appWindow.setAttribute("window_number", "" + this.properties.appNumber);
        var topBar = document.createElement("div");
        topBar.classList.add("topBar");
        var appLogo = document.createElement("div");
        appLogo.classList.add("appLogo");
        appLogo.style.backgroundImage = this.properties.logo;
        topBar.appendChild(appLogo);
        var appName = document.createElement("div");
        appName.classList.add("appName");
        appName.innerHTML = this.properties.name;
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
    Application.prototype.createAppNavBar = function () {
        this.navBar = document.createElement("div");
        this.navBar.classList.add("appContainer");
        this.navBar.classList.add("appDesign");
        this.navBar.setAttribute("windowNumber", "" + this.properties.appNumber);
        this.navBar.style.backgroundImage = this.properties.logo;
        return this.navBar;
    };
    Application.prototype.closeApp = function () {
        this.navBar.remove();
        this.appWindow.remove();
    };
    return Application;
}());
var DiscordApp = /** @class */ (function (_super) {
    __extends(DiscordApp, _super);
    function DiscordApp(appNumber) {
        var _this = this;
        var properties = {
            description: "",
            logo: "url(../../ressources/app/Discord-Logo.png)",
            name: "Discord",
            link: "https://discord.com/app",
            appNumber: appNumber,
            storeName: "discord"
        };
        _this = _super.call(this, properties) || this;
        if (appNumber) {
            _this.setAppNumber(appNumber);
        }
        return _this;
    }
    DiscordApp.prototype.getNewApp = function (appNumber) {
        return new DiscordApp(appNumber);
    };
    return DiscordApp;
}(Application));
var DebianOS = /** @class */ (function () {
    function DebianOS(navbarHook, desktopHook, osMenuPannelHook, windowsContainerHook) {
        if (navbarHook === void 0) { navbarHook = "#navbar"; }
        if (desktopHook === void 0) { desktopHook = "#desktop"; }
        if (osMenuPannelHook === void 0) { osMenuPannelHook = desktopHook + " #osMenuPannelContainer"; }
        if (windowsContainerHook === void 0) { windowsContainerHook = desktopHook + " #windowsContainer"; }
        this.appStorage = {};
        this.addAllApp();
        this.setnavBar(navbarHook);
        this.setDesktop(desktopHook);
        this.setOsMenuPannel(osMenuPannelHook);
        this.setWindowsContainer(windowsContainerHook);
    }
    //Initial set
    DebianOS.prototype.addAllApp = function () {
        this.addApp(new DiscordApp());
    };
    DebianOS.prototype.addApp = function (application) {
        this.appStorage[application.properties.storeName] = application;
    };
    DebianOS.prototype.setnavBar = function (navbarHook) {
        this.navBar = document.querySelector(navbarHook);
    };
    DebianOS.prototype.setDesktop = function (desktopHook) {
        this.isDown = false;
        this.desktop = document.querySelector(desktopHook);
        this.setDesktopBackground();
        this.enableDocumentHandle();
    };
    DebianOS.prototype.enableDocumentHandle = function () {
        var _this = this;
        document.addEventListener("mouseup", function () {
            _this.isDown = false;
        }, true);
        document.addEventListener("mousemove", function (event) {
            event.preventDefault();
            if (_this.isDown) {
                var mousePosition = {
                    x: event.clientX,
                    y: event.clientY
                };
                _this.currentFocusedWindow.style.left = (mousePosition.x + _this.offset[0]) + 'px';
                _this.currentFocusedWindow.style.top = (mousePosition.y + _this.offset[1]) + 'px';
            }
        });
    };
    DebianOS.prototype.setOsMenuPannel = function (osMenuHook) {
        this.osMenuPannel = document.querySelector(osMenuHook);
        this.setOSMenu();
        this.setOsMenuPannelContent();
    };
    DebianOS.prototype.setWindowsContainer = function (windowsContainerHook) {
        this.windowsContainer = document.querySelector(windowsContainerHook);
        this.desktopManager = [];
        this.createApp("discord");
    };
    //Desktop functions
    DebianOS.prototype.setDesktopBackground = function () {
        var backGroundUrl = "url(../../ressources/os/kali-layers-16x9.png)";
        this.desktop.style.backgroundImage = backGroundUrl;
    };
    DebianOS.prototype.setOsMenuPannelContent = function () {
        console.log(this.osMenuPannel.children);
        this.setOsMenuPannelContentUserAccount(this.osMenuPannel.children[0]);
        this.setOsMenuPannelContentSearchBar(this.osMenuPannel.children[1]);
        this.setOsMenuPannelContentleftSubPannel(this.osMenuPannel.children[2]);
        this.setOsMenuPannelContentrightSubPannel(this.osMenuPannel.children[3]);
        this.setOsMenuPannelContentbottomSubPannel(this.osMenuPannel.children[4]);
    };
    DebianOS.prototype.setOsMenuPannelContentUserAccount = function (target) {
        var userLogo = target.children[0];
        var userName = target.children[1];
    };
    DebianOS.prototype.setOsMenuPannelContentSearchBar = function (target) {
    };
    DebianOS.prototype.setOsMenuPannelContentleftSubPannel = function (target) {
    };
    DebianOS.prototype.setOsMenuPannelContentrightSubPannel = function (target) {
    };
    DebianOS.prototype.setOsMenuPannelContentbottomSubPannel = function (target) {
    };
    DebianOS.prototype.getNewAppNumber = function () {
        return this.desktopManager.length;
    };
    DebianOS.prototype.createApp = function (appStorageName) {
        var appNumber = this.getNewAppNumber();
        console.log(this.appStorage);
        var newApp = this.appStorage[appStorageName].getNewApp(appNumber);
        this.addAppToDOM(newApp);
        this.desktopManager.push(newApp);
    };
    DebianOS.prototype.addAppToDOM = function (application) {
        this.windowsContainer.appendChild(application.createAppWindow());
        this.navBar.appendChild(application.createAppNavBar());
    };
    DebianOS.prototype.closeApp = function (appNumber) {
    };
    DebianOS.prototype.setupWindowEventListener = function (window) {
        var _this = this;
        var topBar = window.children[0];
        // topBar.addEventListener("click", (ev:MouseEvent) => {
        //     alert("coucou")
        // })
        topBar.addEventListener("mousedown", function (ev) {
            if (_this.currentFocusedWindow != undefined) {
                _this.currentFocusedWindow.style.zIndex = "0";
            }
            _this.currentFocusedWindow = window;
            _this.currentFocusedWindow.style.zIndex = "20";
            _this.mouseDownEvent(ev);
        }, true);
        var navButton = topBar.children[2];
        var windowNumber = parseInt(window.getAttribute("window_number"));
        navButton.children[2].addEventListener("click", function () {
            _this.closeApp(windowNumber);
        });
    };
    DebianOS.prototype.mouseDownEvent = function (event) {
        this.isDown = true;
        this.offset = [
            this.currentFocusedWindow.offsetLeft - event.clientX,
            this.currentFocusedWindow.offsetTop - event.clientY
        ];
    };
    //NavBar functions 
    DebianOS.prototype.setOSMenu = function () {
        this.osMenu = {
            logo: "url(../../ressources/os/osLogo.png)"
        };
        this.addOsMenu(this.osMenu);
    };
    DebianOS.prototype.addOsMenu = function (osMenuInfo) {
        var _this = this;
        var osMenuDiv = document.createElement("div");
        osMenuDiv.id = "osMenuDesign";
        osMenuDiv.classList.add("appContainer");
        osMenuDiv.style.backgroundImage = osMenuInfo.logo;
        osMenuDiv.addEventListener("click", function () {
            _this.toogleMenu();
        });
        this.navBar.appendChild(osMenuDiv);
    };
    DebianOS.prototype.toogleMenu = function () {
        if (this.osMenuPannel.style.height == "" || this.osMenuPannel.style.height == "0%") {
            this.osMenuPannel.style.height = "60%";
            this.osMenuPannel.style.borderBottom = "solid 2px grey";
        }
        else {
            this.osMenuPannel.style.height = "0%";
            this.osMenuPannel.style.borderBottom = "none";
        }
    };
    return DebianOS;
}());
var OS = new DebianOS();
