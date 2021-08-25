import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ServeStaticModule} from '@nestjs/serve-static';
import {join} from 'path';
import {MulterModule} from '@nestjs/platform-express';

@Module({
    imports: [
        MulterModule.register({
            limits: {
                fileSize: 1024 * 1024
            }
        }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'client'),
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
