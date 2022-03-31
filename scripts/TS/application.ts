abstract class Application {
    name:string
    logo:string
    description:string
    link:string
    appNumber:number
    appWindow:HTMLDivElement
    navBar:HTMLDivElement

    constructor(name:string,logo:string,description:string,link:string,appNumber:number){
        this.name = name
        this.logo = logo
        this.description = description
        this.link = link
        this.appNumber = appNumber
    }

    createAppWindow() : HTMLDivElement{
        this.appWindow = document.createElement("div");
        this.appWindow.classList.add("window")
        this.appWindow.setAttribute("window_number",`${this.appNumber}`);

        const topBar = document.createElement("div");
        topBar.classList.add("topBar")

        const appLogo = document.createElement("div");
        appLogo.classList.add("appLogo");
        appLogo.style.backgroundImage = this.logo
        topBar.appendChild(appLogo)

        const appName = document.createElement("div");
        appName.classList.add("appName");
        appName.innerHTML = this.name
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

    addAppNavBar() : HTMLDivElement{
        this.navBar = document.createElement("div");
        this.navBar.classList.add("appContainer")
        this.navBar.classList.add("appDesign")
        this.navBar.setAttribute("windowNumber",`${this.appNumber}`)
        this.navBar.style.backgroundImage = this.logo;
        return this.navBar
    }
}

export default Application;