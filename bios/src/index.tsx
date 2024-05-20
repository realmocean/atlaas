import { EventBus } from '@tuval/core';
import { StartBios } from '@tuval/forms';

//import './css/global.scss';
import { RoutesController } from './routes/+routes';

window.addEventListener("load", (event) => {
    StartBios(RoutesController);
});
