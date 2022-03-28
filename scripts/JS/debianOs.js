var DebianOS = /** @class */ (function () {
    function DebianOS(navbarHook, desktopHook, osMenuPannelHook, windowsContainerHook) {
        if (navbarHook === void 0) { navbarHook = "#navbar"; }
        if (desktopHook === void 0) { desktopHook = "#desktop"; }
        if (osMenuPannelHook === void 0) { osMenuPannelHook = desktopHook + " #osMenuPannelContainer"; }
        if (windowsContainerHook === void 0) { windowsContainerHook = desktopHook + " #windowsContainer"; }
        console.log("init class constructor");
        this.setnavBar(navbarHook);
        this.setDesktop(desktopHook);
        this.setOsMenuPannel(osMenuPannelHook);
        this.setWindowsContainer(windowsContainerHook);
    }
    //Initial set
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
        var testWindow = {
            description: "",
            logo: "url(../../ressources/app/Discord-Logo.png)",
            name: "discord"
        };
        this.createApp(testWindow);
        this.createApp(testWindow);
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
    DebianOS.prototype.createApp = function (application) {
        this.createAppWindow(application);
        this.addAppNavBar(application);
        console.log();
    };
    DebianOS.prototype.createAppWindow = function (application) {
        var window = document.createElement("div");
        window.classList.add("window");
        var topBar = document.createElement("div");
        topBar.classList.add("topBar");
        var appLogo = document.createElement("div");
        appLogo.classList.add("appLogo");
        appLogo.style.backgroundImage = application.logo;
        topBar.appendChild(appLogo);
        var appName = document.createElement("div");
        appName.classList.add("appName");
        appName.innerHTML = application.name;
        topBar.appendChild(appName);
        var navButton = document.createElement("div");
        navButton.classList.add("navButton");
        topBar.appendChild(navButton);
        window.appendChild(topBar);
        var core = document.createElement("div");
        core.classList.add("core");
        window.appendChild(core);
        console.log(window);
        this.setupWindowEventListener(window);
        this.windowsContainer.appendChild(window);
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
    DebianOS.prototype.addAppNavBar = function (app) {
        var osAppDiv = document.createElement("div");
        osAppDiv.classList.add("appContainer");
        osAppDiv.classList.add("appDesign");
        osAppDiv.style.backgroundImage = app.logo;
        this.navBar.appendChild(osAppDiv);
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
    DebianOS.prototype.addTestApp = function () {
        var appDiv = {
            description: "discord for test app",
            logo: "url(../../ressources/app/Discord-Logo.png)",
            name: "testApp"
        };
        this.addAppNavBar(appDiv);
    };
    return DebianOS;
}());
var OS = new DebianOS();
