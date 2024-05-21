
import { useFormController, useDialog, useNavigate } from "@tuval/forms";
import { useFormBuilder } from "../FormBuilder";


export const ActionView = (formMeta, action) => {
    const { label, successAction, successActions } = action;
    const formController = useFormController();
    const dialog = useDialog();
    const formBuilder = useFormBuilder();
    const navigate = useNavigate();



}