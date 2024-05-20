import { UIController, UINavigate, UIView } from "@tuval/forms"

export class LandingController extends UIController {
    LoadView(): UIView {
        return (
            UINavigate('/app')
        )
    }
}