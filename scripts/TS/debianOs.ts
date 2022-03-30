interface application{
    name:string,
    logo:string,
    description:string,
    link?:string
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
    desktopManager:Array<applicationHandle>

    constructor(navbarHook:string="#navbar", 
                desktopHook:string="#desktop",
                osMenuPannelHook:string=desktopHook+" #osMenuPannelContainer",
                windowsContainerHook:string=desktopHook+" #windowsContainer"){
        console.log("init class constructor")
        
        this.setnavBar(navbarHook);
        this.setDesktop(desktopHook);
        this.setOsMenuPannel(osMenuPannelHook);
        this.setWindowsContainer(windowsContainerHook);
    }

    //Initial set

    setnavBar(navbarHook:string) {
        this.navBar = document.querySelector(navbarHook);
    }

    setDesktop(desktopHook:string){
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
        const testWindow:application = {
            description:"",
            logo: "url(../../ressources/app/Discord-Logo.png)",
            name: "discord"
        }
        this.createApp(testWindow);
        this.createApp(testWindow);
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

    createApp(application:application){
        let appNumber = this.desktopManager.length ;
        const appAdd:applicationHandle = {
            window: this.createAppWindow(application, appNumber),
            navbarIcon: this.addAppNavBar(application, appNumber)
        }
        this.desktopManager.push(appAdd)
    }

    closeApp(appNumber:number){
        this.desktopManager[appNumber].window.remove()
        this.desktopManager[appNumber].navbarIcon.remove()
    }

    createAppWindow(application:application, appNumber:number){
        const window = document.createElement("div");
        window.classList.add("window")
        window.setAttribute("window_number",`${appNumber}`);

        const topBar = document.createElement("div");
        topBar.classList.add("topBar")

        const appLogo = document.createElement("div");
        appLogo.classList.add("appLogo");
        appLogo.style.backgroundImage = application.logo
        topBar.appendChild(appLogo)

        const appName = document.createElement("div");
        appName.classList.add("appName")
        appName.innerHTML = application.name
        topBar.appendChild(appName)

        const navButton = document.createElement("div");
        navButton.classList.add("navButton")
        topBar.appendChild(navButton)

        window.appendChild(topBar);
        
        const core = document.createElement("div")
        core.classList.add("core");
        window.appendChild(core)
        console.log(window);
        this.setupWindowEventListener(window)
        
        this.windowsContainer.appendChild(window)

        return window;


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
        navButton.addEventListener("click",() => {
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

    addAppNavBar(app:application,appNumber:number) {
        let osAppDiv:HTMLDivElement = document.createElement("div");
        osAppDiv.classList.add("appContainer")
        osAppDiv.classList.add("appDesign")
        osAppDiv.setAttribute("windowNumber",`${appNumber}`)
        osAppDiv.style.backgroundImage = app.logo;
        this.navBar.appendChild(osAppDiv);
        return osAppDiv
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
