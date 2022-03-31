//////////////////////APPLICATION//////////////////////////

abstract class Application {
    properties:applicationProps
    appWindow:HTMLDivElement
    navBar:HTMLDivElement

    constructor(properties:applicationProps){
        this.properties = {
            description: properties.description,
            link: properties.link,
            logo: properties.logo,
            name: properties.name,
            storeName: properties.storeName,
            appNumber: properties.appNumber
        }
    }

    abstract getNewApp(appNumber:number):any;
    

    setAppNumber(appNumber:number){
        this.properties.appNumber = appNumber
    }
    

    createAppWindow() : HTMLDivElement{
        this.appWindow = document.createElement("div");
        this.appWindow.classList.add("window")
        this.appWindow.setAttribute("window_number",`${this.properties.appNumber}`);

        const topBar = document.createElement("div");
        topBar.classList.add("topBar")

        const appLogo = document.createElement("div");
        appLogo.classList.add("appLogo");
        appLogo.style.backgroundImage = this.properties.logo
        topBar.appendChild(appLogo)

        const appName = document.createElement("div");
        appName.classList.add("appName");
        appName.innerHTML = this.properties.name
        topBar.appendChild(appName)

        const navButton = document.createElement("div");
        navButton.classList.add("navButton");

        const reduceButton = document.createElement("div");
        reduceButton.classList.add("reduceButton");
        reduceButton.innerHTML = "-";
        navButton.appendChild(reduceButton)

        const fullscreenButton = document.createElement("div");
        fullscreenButton.classList.add("fullscreenButton");
        fullscreenButton.innerHTML = "^"
        navButton.appendChild(fullscreenButton)

        const closeButton = document.createElement("div");
        closeButton.classList.add("closeButton");
        closeButton.innerHTML = "x"
        navButton.appendChild(closeButton)

        topBar.appendChild(navButton);

        this.appWindow.appendChild(topBar);
        
        const core = document.createElement("div")
        core.classList.add("core");
        this.appWindow.appendChild(core)
        console.log(window);

        return this.appWindow;
    }

    createAppNavBar() : HTMLDivElement{
        this.navBar = document.createElement("div");
        this.navBar.classList.add("appContainer")
        this.navBar.classList.add("appDesign")
        this.navBar.setAttribute("windowNumber",`${this.properties.appNumber}`)
        this.navBar.style.backgroundImage = this.properties.logo;
        return this.navBar
    }

    closeApp(){
        this.navBar.remove()
        this.appWindow.remove()
    }
}

class DiscordApp extends Application {

    constructor(appNumber?:number){
        const properties:applicationProps = {
            description:"",
            logo: "url(../../ressources/app/Discord-Logo.png)",
            name: "Discord",
            link:"https://discord.com/app",
            appNumber: appNumber,
            storeName: "discord"
        }

        super(properties);
        if(appNumber) {
            this.setAppNumber(appNumber);
        }
    }

    getNewApp(appNumber:number):Application {
        return new DiscordApp(appNumber)
    }
}


//////////////////////////DEBIAN OS/////////////////////////

interface applicationProps{
    name:string,
    logo:string,
    description:string,
    link:string,
    appNumber?:number,
    storeName:string
}

interface osMenu{
    logo:string
}

interface applicationHandle{
    window:HTMLDivElement,
    navbarIcon:HTMLDivElement
}

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
        this.addAllApp()
        this.setnavBar(navbarHook);
        this.setDesktop(desktopHook);
        this.setOsMenuPannel(osMenuPannelHook);
        this.setWindowsContainer(windowsContainerHook);
    }

    //Initial set

    addAllApp(){
        this.addApp(new DiscordApp());
    }

    addApp(application:Application){
        this.appStorage[application.properties.storeName] = application;
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
        this.createApp("discord")
    }

    //Desktop functions

    setDesktopBackground() {
        const backGroundUrl:string = "url(../../ressources/os/kali-layers-16x9.png)"
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
    }

    addAppToDOM(application:Application){
        this.windowsContainer.appendChild(application.createAppWindow());
        this.navBar.appendChild(application.createAppNavBar())
    }

    closeApp(appNumber:number){
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
        },true
        )

        const navButton = topBar.children[2]
        const windowNumber = parseInt(window.getAttribute("window_number"));
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
            logo:"url(../../ressources/os/osLogo.png)"
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