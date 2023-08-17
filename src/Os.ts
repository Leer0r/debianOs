import GoogleApp from "./app/chrome/chrome.app";
import DiscordApp from "./app/discord/discord.app";
import Application, { osMenu } from "./application.lib"


//////////////////////////DEBIAN OS/////////////////////////


class DebianOS
{
    navBar: HTMLDivElement;
    desktop: HTMLDivElement;
    osMenu: osMenu;
    osMenuPannel: HTMLDivElement;
    windowsContainer: HTMLDivElement;
    isDown:boolean;
    currentFocusedWindow:HTMLDivElement;
    offset: number[];
    desktopManager:Array<Application> // Store instance of application running
    appStorage:{ [storeName:string]: Application} // Store one of each application implementation to call it with the storeName

    constructor(navbarHook:string="#navbar", 
                desktopHook:string="#desktop",
                osMenuPannelHook:string=desktopHook+" #osMenuPannelContainer",
                windowsContainerHook:string=desktopHook+" #windowsContainer"){
        
                    this.appStorage = {}
                    this.setnavBar(navbarHook);
                    this.setDesktop(desktopHook);
                    this.setOsMenuPannel(osMenuPannelHook);
                    this.addAllApp()
                    this.setWindowsContainer(windowsContainerHook);
    }

    //Initial set

    addAllApp(){
        this.addApp(new DiscordApp());
        this.addApp(new GoogleApp())

    }

    addApp(application:Application){
        this.appStorage[application.properties.storeName] = application;
        const newAppLaucher:HTMLDivElement = document.createElement("div");
        newAppLaucher.classList.add("appLaucher");
        newAppLaucher.style.backgroundImage = application.properties.logo
        newAppLaucher.addEventListener("click", async () => {
            this.createApp(application.properties.storeName);
        })
        this.osMenuPannel.children[3].appendChild(newAppLaucher);
    }

    setnavBar(navbarHook:string) {
        this.navBar = document.querySelector(navbarHook);
    }

    setDesktop(desktopHook:string): void{
        this.isDown = false;
        this.desktop = document.querySelector(desktopHook);
        this.setDesktopBackground();
        this.enableDocumentHandle()
    }

    enableDocumentHandle(){
        document.addEventListener("mouseup", () => {
            this.isDown = false;
        },true)

        document.addEventListener("mousemove", (event:MouseEvent) => {
            event.preventDefault();
            if(this.isDown){
                const mousePosition = {

                    x : event.clientX,
                    y : event.clientY
        
                };
                this.currentFocusedWindow.style.left = (mousePosition.x + this.offset[0]) + 'px';
                this.currentFocusedWindow.style.top  = (mousePosition.y + this.offset[1]) + 'px';
            }
        })
    }

    setOsMenuPannel(osMenuHook:string){
        this.osMenuPannel = document.querySelector(osMenuHook);
        this.setOSMenu();
        this.setOsMenuPannelContent()
    }

    setWindowsContainer(windowsContainerHook:string){
        this.windowsContainer = document.querySelector(windowsContainerHook);
        this.desktopManager = [];
    }

    //Desktop functions

    setDesktopBackground() {
        const backGroundUrl:string = "url(/ressources/os/kali-layers-16x9.png)"
        this.desktop.style.backgroundImage = backGroundUrl;
    }

    setOsMenuPannelContent(){
        console.log(this.osMenuPannel.children);
        this.setOsMenuPannelContentUserAccount(<HTMLDivElement>this.osMenuPannel.children[0])
        this.setOsMenuPannelContentSearchBar(<HTMLDivElement>this.osMenuPannel.children[1]);
        this.setOsMenuPannelContentleftSubPannel(<HTMLDivElement>this.osMenuPannel.children[2])
        this.setOsMenuPannelContentrightSubPannel(<HTMLDivElement>this.osMenuPannel.children[3])
        this.setOsMenuPannelContentbottomSubPannel(<HTMLDivElement>this.osMenuPannel.children[4])
    }

    setOsMenuPannelContentUserAccount(target:HTMLElement){
        const userLogo = target.children[0];
        const userName = target.children[1];
    }

    setOsMenuPannelContentSearchBar(target:HTMLElement){

    }

    setOsMenuPannelContentleftSubPannel(target:HTMLElement){

    }
    
    setOsMenuPannelContentrightSubPannel(target:HTMLElement){

    }

    setOsMenuPannelContentbottomSubPannel(target:HTMLElement){

    }

    getNewAppNumber(){
        return this.desktopManager.length
    }

    createApp(appStorageName:string){
        const appNumber = this.getNewAppNumber()
        console.log(this.appStorage)
        const newApp:Application = this.appStorage[appStorageName].getNewApp(appNumber);
        this.addAppToDOM(newApp);
        this.desktopManager.push(newApp);
        if(this.currentFocusedWindow != undefined) {
            this.currentFocusedWindow.style.zIndex = "10"
        }
        if(this.osMenuPannel.style.height != "0%"){
            this.toogleMenu()
        }
    }

    addAppToDOM(application:Application){
        const appWindow = application.createAppWindow()
        const appNavBar = application.createAppNavBar()
        appNavBar.addEventListener("click", () => {
            this.toogleDisplay(<number>application.properties.appNumber)
        })
        this.setupWindowEventListener(appWindow)
        this.windowsContainer.appendChild(appWindow);
        this.navBar.appendChild(appNavBar);
    }

    closeApp(appNumber:number){
        this.desktopManager[appNumber].closeApp()
    }

    reduceApp(appNumber:number){
        this.desktopManager[appNumber].setMinimize()
    }

    toogleSizeAppSizeApp(appNumber:number){
        this.desktopManager[appNumber].toogleSize()
    }

    displayApp(appNumber:number){
        this.desktopManager[appNumber].setDisplay()
    }

    toogleDisplay(appNumber:number){
        if(this.desktopManager[appNumber].displayed){
            this.desktopManager[appNumber].setMinimize()
        }
        else {
            this.desktopManager[appNumber].setDisplay()
        }
    }

    setupWindowEventListener(window:HTMLDivElement){
        const topBar = window.children[0];
        // topBar.addEventListener("click", (ev:MouseEvent) => {
        //     alert("coucou")
        // })
        topBar.addEventListener("mousedown", (ev:MouseEvent) => {
            if(this.currentFocusedWindow != undefined) {
                this.currentFocusedWindow.style.zIndex = "0"
            }
            this.currentFocusedWindow = window;
            this.currentFocusedWindow.style.zIndex = "20";
            this.mouseDownEvent(ev)
        },true)

        const navButton = topBar.children[2]
        const windowNumber = parseInt(<string>window.getAttribute("window_number"));
        navButton.children[0].addEventListener("click", () => {
            this.reduceApp(windowNumber)
        })
        navButton.children[1].addEventListener("click",() => {
            this.toogleSizeAppSizeApp(windowNumber)
        })
        navButton.children[2].addEventListener("click",() => {
            this.closeApp(windowNumber)
        })
    }
    mouseDownEvent(event:MouseEvent){
        this.isDown = true;
        this.offset = [
            this.currentFocusedWindow.offsetLeft - event.clientX,
            this.currentFocusedWindow.offsetTop - event.clientY
        ];
    }

    
    //NavBar functions 

    setOSMenu(){
        this.osMenu = {
            logo:"url(/ressources/os/osLogo.png)"
        }

        this.addOsMenu(this.osMenu);
    }

    addOsMenu(osMenuInfo:osMenu){
        let osMenuDiv:HTMLDivElement = document.createElement("div");
        osMenuDiv.id = "osMenuDesign"
        osMenuDiv.classList.add("appContainer")
        osMenuDiv.style.backgroundImage = osMenuInfo.logo;
        osMenuDiv.addEventListener("click",() => {
            this.toogleMenu()
        });
        this.navBar.appendChild(osMenuDiv)
    }
    toogleMenu() {
        if(this.osMenuPannel.style.height == "" || this.osMenuPannel.style.height == "0%") {
            this.osMenuPannel.style.height = "60%"
            this.osMenuPannel.style.borderBottom = "solid 2px grey"
        }
        else {
            this.osMenuPannel.style.height = "0%"
            this.osMenuPannel.style.borderBottom = "none"
        }
    
    }
}

const OS = new DebianOS();