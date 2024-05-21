import { is } from "@tuval/core";
import { Text } from "@tuval/forms";
import { FormBuilder } from "./FormBuilder";

export const renderContainers = (layout: any, fieldMap) => {
    
    const views = []
    if (layout != null && layout.type == null && is.array(layout.containers)) {
        for (let i = 0; i < layout.containers.length; i++) {
            const container = layout.containers[i];
            if (container != null && container.type != null) {
                const subContainers = renderContainers(container, fieldMap);
                if (is.array(subContainers)) {
                    views.push(...subContainers);
                }
                const factoryFunc = FormBuilder.containerFactories[container.type];
                if (factoryFunc == null) {
                    views.push(Text(layout.type + ' not found'))
                } else {
                    views.push(factoryFunc(container, fieldMap))
                }
            } else if (container.fields != null) {
                for (let i = 0; i < container.fields.length; i++) {
                    const viewName = container.fields[i];
                    const view = fieldMap[viewName];
                    const factoryFunc = FormBuilder.viewFactories[view.type];
                    if (factoryFunc == null) {
                        views.push(Text(view.type + ' not found'))
                    } else {
                        views.push(factoryFunc(fieldMap[viewName]));
                    }
                }
            }
        }
    } else if (layout.fields != null) {
        for (let i = 0; i < layout.fields.length; i++) {
            const viewName = layout.fields[i];
            const view = fieldMap[viewName];
            const factoryFunc = FormBuilder.viewFactories[view.type];
            if (factoryFunc == null) {
                views.push(Text(view.type + ' not found'))
            } else {
                views.push(factoryFunc(fieldMap[viewName]));
            }
        }
    }

    return views;
}