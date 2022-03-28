interface application{
    name:string,
    logo:string,
    description:string
}

interface osMenu{
    logo:string
}

class DebianOS
{
    navBar: HTMLElement;
    desktop: HTMLElement;
    osMenu: osMenu;
    osMenuPanel: HTMLElement;

    constructor(navbarHook:string="#navbar", 
                desktopHook:string="#desktop",
                osMenuPannel:string="#osMenuPannelContainer"){
        console.log("init class constructor")
        
        this.setnavBar(navbarHook);
        this.setDesktop(desktopHook);
        this.setOSMenu();
        this.addTestApp();
        this.setDesktopBackground();
    }

    setnavBar(navbarHook:string) {
        this.navBar = document.querySelector(navbarHook);
    }

    setDesktop(desktopHook:string){
        this.desktop = document.querySelector(desktopHook);
    }

    setOsMenuPannel(osMenuHook:string){
        this.osMenuPanel = document.querySelector(osMenuHook);
    }

    //Desktop functions

    setDesktopBackground() {
        const backGroundUrl:string = "url(../../ressources/os/kali-layers-16x9.png)"
        this.desktop.style.backgroundImage = backGroundUrl;
    }

    //NavBar functions 

    setOSMenu(){
        this.osMenu = {
            logo:"url(../../ressources/os/osLogo.png)"
        }

        this.addOsMenu(this.osMenu);
    }

    addApp(app:application) {
        let osAppDiv:HTMLDivElement = document.createElement("div");
        osAppDiv.classList.add("appContainer")
        osAppDiv.classList.add("appDesign")
        osAppDiv.style.backgroundImage = app.logo;
        this.navBar.appendChild(osAppDiv);
    }

    addOsMenu(osMenuInfo:osMenu){
        let osMenuDiv:HTMLDivElement = document.createElement("div");
        osMenuDiv.id = "osMenuDesign"
        osMenuDiv.classList.add("appContainer")
        osMenuDiv.style.backgroundImage = osMenuInfo.logo;
        osMenuDiv.addEventListener("click",this.toogleMenu);
        this.navBar.appendChild(osMenuDiv)
    }
    toogleMenu() {
        alert("coucou")
    }

    addTestApp(){
        let appDiv:application = {
            description:"discord for test app",
            logo: "url(../../ressources/app/Discord-Logo.png)",
            name: "testApp"
        }

        this.addApp(appDiv);
    }
}

const OS = new DebianOS();