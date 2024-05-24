

export default class TaskCreated extends BaseComponent {

    get serviceName() {
        return 'com.atlaas.service.device';
    }

    get displayName(): string {
        return 'Batter Low'
    }

    get groupName(): string {
        return 'Triggers'
    }
    get description(): string {
        return 'Trig when batter is low.'
    }
    get documentation(): string {
        return '';
    }

    public get uid() {
        return 'com.celmino.component.device-battery-low'
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

