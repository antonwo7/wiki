import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {HttpService} from '@nestjs/axios';
import { catchError, firstValueFrom, Observable} from 'rxjs';
import {parse} from "node-html-parser";
import { wikiApiUrl } from '../../config';


@Injectable()
export class ParseService {
    constructor(private readonly httpService: HttpService) {}

    async wiki(id: string) {
        const {data} = await firstValueFrom(
          this.httpService.get(wikiApiUrl, {
              params: {
                  diff: 'prev',
                  oldid: id
              }
          }).pipe()
        )

        const root = parse(data)
        const items = root.querySelectorAll(
          '.mw-diff-inline-header, .mw-diff-inline-context, .mw-diff-inline-changed, .mw-diff-inline-added')

        return items.reduce((accum, cur) => {
            accum.push(cur.innerHTML)
            return accum;
        }, [])
    }
}