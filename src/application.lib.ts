export interface applicationProps{
    name:string,
    logo:string,
    description:string,
    link:string,
    appNumber?:number,
    storeName:string
}

export interface osMenu{
    logo:string
}
interface windowProps{

}
interface applicationHandle{
    window:HTMLDivElement,
    navbarIcon:HTMLDivElement
}


abstract class Application {
    properties:applicationProps
    appWindow:HTMLDivElement
    navBar:HTMLDivElement
    displayed:boolean

    constructor(properties:applicationProps){
        this.properties = {
            description: properties.description,
            link: properties.link,
            logo: properties.logo,
            name: properties.name,
            storeName: properties.storeName,
            appNumber: properties.appNumber
        }
        this.displayed = true
    }

    abstract getNewApp(appNumber:number):any;
    

    setAppNumber(appNumber:number){
        this.properties.appNumber = appNumber
    }

    setFullSize(){
        this.appWindow.style.width = "100%"
        this.appWindow.style.height = "100%"
        this.appWindow.style.top = "0"
        this.appWindow.style.left = "0"
    }

    setMinimize(){
        this.appWindow.style.display = "none"
        this.displayed = false
    }

    setDisplay(){
        this.appWindow.style.display = ""
        this.displayed = true
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

        const iframe = document.createElement("iframe");
        iframe.classList.add("contentLink")
        iframe.src = this.properties.link
        core.appendChild(iframe);
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

export default Application