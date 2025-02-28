import { Module } from '@nestjs/common';
import { LeadsService } from './leads.service';
import { LeadsController } from './leads.controller';
import { MagicapiService } from 'src/magicapi/magicapi.service';
import { HttpModule } from '@nestjs/axios';
// import { UniqueUnitCodeMiddleware } from 'src/middlewares/unique-unit-code.middleware';
// import { UniqueEmailMiddleware } from 'src/middlewares/unique-email.middleware';

@Module({
  imports: [HttpModule],
  controllers: [LeadsController],
  providers: [LeadsService, MagicapiService],
})
export class LeadsModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(UniqueEmailMiddleware).forRoutes({
  //     path: 'leads',
  //     method: RequestMethod.POST,
  //   });
  // }
}
