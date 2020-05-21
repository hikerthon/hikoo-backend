import { Module } from '@nestjs/common';
import { AlertModule } from './alert/alert.module';
import { EventModule } from './event/event.module';
import { LocationModule } from './location/location.module';
import { MountainpermitModule } from './mountainpermit/mountainpermit.module';
import { SosModule } from './sos/sos.module';
import { UserModule } from './user/user.module';


@Module({
  imports: [AlertModule, EventModule, LocationModule, MountainpermitModule, SosModule, UserModule,],
})
export class MobileappModule { }

// @Module({
//   imports: [EventsModule, ExampleModule, PermitModule],
//   controllers: [AppController, AllgpsController, EventtypeController, AlertlevelController, AlertsController],
//   providers: [Logger, AppService, AllgpsService, EventtypeService, AlertlevelService, AlertsService
//   ],
// })
// export class AppModule { }