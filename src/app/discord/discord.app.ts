import Application, { applicationProps } from "../../application.lib";

export default class DiscordApp extends Application {

    constructor(appNumber?:number){
        const properties:applicationProps = {
            description:"",
            logo: "url(/ressources/app/Discord-Logo.png)",
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