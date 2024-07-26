import {Module} from "@nestjs/common";
import {ParseController} from "./parse.controller";
import {ParseService} from "./parse.service";
import {HttpModule} from '@nestjs/axios';


@Module({
    imports: [HttpModule],
    controllers: [ParseController],
    providers: [ParseService],
    exports: [ParseService]
})
export class ParseModule {}