import { UIView } from "@tuval/forms";
import { AccountContextClass as AccountContextClass } from "./AccountContextClass";



export function AccountContext(childFunc:()=> UIView): AccountContextClass {
    return new AccountContextClass().childFunc(childFunc);
}