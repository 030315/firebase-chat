import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

interface Config {
    apiKey: string;
    authDomain: string;
    databaseURL: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
    measurementId: string;
}

const config: Config = {
    apiKey: 'apiKey',
    authDomain: 'authDomain',
    databaseURL: 'databaseURL',
    projectId: 'projectId',
    storageBucket: '',
    messagingSenderId: 'messagingSenderId',
    appId: 'appId',
    measurementId: 'measurementId',
};

export default {
    install(Vue: any, options: any) {
        const firebaseApp = firebase.initializeApp(config);

        console.log(firebaseApp);

        Vue.prototype.$firestore = firebaseApp.firestore();
        Vue.prototype.$auth = firebaseApp.auth();
    }
}