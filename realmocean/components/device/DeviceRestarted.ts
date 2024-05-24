

export default class DeviceRestarted extends BaseComponent {

    get serviceName() {
        return 'com.atlaas.service.device';
    }

    get displayName(): string {
        return 'Device Restarted'
    }

    get groupName(): string {
        return 'Triggers'
    }
    get description(): string {
        return 'Trig when device restarted.'
    }
    get documentation(): string {
        return '';
    }

    public get uid() {
        return 'com.celmino.component.device-restarted'
    }

    public buildConfig() {
        return {
            "accessKey": {
                "type": 'string',
                "required": true
            },
            "fromEmail": {
                "type": 'string',
                "required": true
            },
            "toEmail": {
                "type": 'string',
                "required": true
            },
            "subject": {
                "type": 'string',
                "required": true
            },
            "htmlTemplate": {
                "type": 'encoded-string',
                "required": true
            },
            "values": {
                "type": 'object',
                "required": false
            }

        }
    }

    public async build({ accessKey, fromEmail, toEmail, subject, htmlTemplate, values }: { accessKey: string, fromEmail: string, toEmail: string, subject: string, htmlTemplate: string, values: object }) {

        

    }
}

