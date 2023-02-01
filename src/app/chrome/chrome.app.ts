import Application, { applicationProps } from "../../application.lib";

export default class GoogleApp extends Application {

    constructor(appNumber?:number){
        const properties:applicationProps = {
            description:"",
            logo: "url(/ressources/app/Google_logo.png)",
            name: "Google",
            link:"https://www.google.com/",
            appNumber: appNumber,
            storeName: "google"
        }

        super(properties);
        if(appNumber) {
            this.setAppNumber(appNumber);
        }
    }

    getNewApp(appNumber:number):Application {
        return new GoogleApp(appNumber)
    }
}