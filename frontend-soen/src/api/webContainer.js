import {WebContainer} from './webContainer';
import {WebContainerService} from './webContainerService';

let webContainerInstance = null;

export const getWebContainerService = async() => {
    if (!webContainerInstance) {
        webContainerInstance = await WebContainer.boot();
    }
    return webContainerInstance;
}