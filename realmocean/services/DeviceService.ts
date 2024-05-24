


function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

class DeviceService extends RealmoceanService {
    public  get uid(): string {
        return 'com.atlaas.service.device';
    }
    
      get displayName(): string {
        return 'Device Service'
      }
    
      get theme(): string {
        return "#6AB344";
      }
    
      get icon(): string {
        return "/images/services/device_256.png";
      }

    async init() {
       
    }



}


module.exports = DeviceService;