var DebianOS = /** @class */ (function () {
    function DebianOS(navbarHook, desktopHook, osMenuPannel) {
        if (navbarHook === void 0) { navbarHook = "#navbar"; }
        if (desktopHook === void 0) { desktopHook = "#desktop"; }
        if (osMenuPannel === void 0) { osMenuPannel = "#osMenuPannelContainer"; }
        console.log("init class constructor");
        this.setnavBar(navbarHook);
        this.setDesktop(desktopHook);
        this.setOSMenu();
        this.addTestApp();
        this.setDesktopBackground();
    }
    DebianOS.prototype.setnavBar = function (navbarHook) {
        this.navBar = document.querySelector(navbarHook);
    };
    DebianOS.prototype.setDesktop = function (desktopHook) {
        this.desktop = document.querySelector(desktopHook);
    };
    DebianOS.prototype.setOsMenuPannel = function (osMenuHook) {
        this.osMenuPanel = document.querySelector(osMenuHook);
    };
    //Desktop functions
    DebianOS.prototype.setDesktopBackground = function () {
        var backGroundUrl = "url(../../ressources/os/kali-layers-16x9.png)";
        this.desktop.style.backgroundImage = backGroundUrl;
    };
    //NavBar functions 
    DebianOS.prototype.setOSMenu = function () {
        this.osMenu = {
            logo: "url(../../ressources/os/osLogo.png)"
        };
        this.addOsMenu(this.osMenu);
    };
    DebianOS.prototype.addApp = function (app) {
        var osAppDiv = document.createElement("div");
        osAppDiv.classList.add("appContainer");
        osAppDiv.classList.add("appDesign");
        osAppDiv.style.backgroundImage = app.logo;
        this.navBar.appendChild(osAppDiv);
    };
    DebianOS.prototype.addOsMenu = function (osMenuInfo) {
        var osMenuDiv = document.createElement("div");
        osMenuDiv.id = "osMenuDesign";
        osMenuDiv.classList.add("appContainer");
        osMenuDiv.style.backgroundImage = osMenuInfo.logo;
        osMenuDiv.addEventListener("click", this.toogleMenu);
        this.navBar.appendChild(osMenuDiv);
    };
    DebianOS.prototype.toogleMenu = function () {
        alert("coucou");
    };
    DebianOS.prototype.addTestApp = function () {
        var appDiv = {
            description: "discord for test app",
            logo: "url(../../ressources/app/Discord-Logo.png)",
            name: "testApp"
        };
        this.addApp(appDiv);
    };
    return DebianOS;
}());
var OS = new DebianOS();
