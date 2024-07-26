import {Body, Controller, Post, Get, Param} from '@nestjs/common';
import {ParseService} from "./parse.service";


@Controller('/parse')
export class ParseController {
    constructor(private readonly parseService: ParseService) {}

    @Get('/wiki/:id')
    Wiki(@Param('id') id: string) {
        return this.parseService.wiki(id)
    }
}