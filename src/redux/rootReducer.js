import { combineReducers } from "redux";
import { appReducer } from "./appReducer";
import { chatReducer } from "./chatReducer";
import { navReducer } from "./navReducer";
import { ticketReducer } from "./ticketReducer";
import { popupReducer } from "./popupReducer";
import { raceReducer } from "./raceReducer";
import { crashReducer } from "./crashReducer";
import { amountReducer } from "./amountReducer";
import { totReducer } from "./totReducer";
import { withdrawReducer } from "./withdrawReducer";
import { roulleteReducer } from "./roulleteReducer";
import { streetraceReducer } from "./streetraceReducer";
import { profileReducer } from "./profileReducer";
import { hangarsReducer } from "./hangarsReducer";
import { depositReducer } from "./depositReducer";


export const rootReducer = combineReducers({
    app: appReducer,
    nav: navReducer,
    chat: chatReducer,
    ticket: ticketReducer,
    popup: popupReducer,
    race: raceReducer,
    crash: crashReducer,
    amount: amountReducer,
    tot: totReducer,
    withdraw: withdrawReducer,
    roullete: roulleteReducer,
    streetrace: streetraceReducer,
    profile: profileReducer,
    hangars: hangarsReducer,
    deposit: depositReducer
})