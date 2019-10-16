import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountryModule } from './country/country.module';
import { DepartmentModule } from './department/department.module';
import { CityModule } from './city/city.module';
import { APP_PIPE } from '@nestjs/core';
import { ClientModule } from './client/client.module';

@Module({
  imports: [TypeOrmModule.forRoot(), CountryModule, DepartmentModule, CityModule, ClientModule],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_PIPE,
    useValue: new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: false })
}],
})
export class AppModule {}
