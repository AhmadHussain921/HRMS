import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DepartmentModule } from './department/department.module';
import { ExperienceModule } from './experience/experience.module';
import { EmployeeModule } from './employee/employee.module';
import { DesignationModule } from './designation/designation.module';
import { AuthModule } from './auth/auth.module';
import { CorrectionReqModule } from './correctionReq/correctionReq.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DB, {      dbName: 'HRV2',
      connectionFactory: (connection) => {
        connection.on('connected', () => {
          console.log('DB Connected ', connection.host);
        });
        connection._events.connected();

        return connection;
      },
    }),
    EmployeeModule,
    AuthModule,
    DepartmentModule,
    ExperienceModule,
    CorrectionReqModule,
    DesignationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
