import {parse} from "node-html-parser";
import axios from "axios";
import endpoints from "../endpoints";

export const revisionParse = (html: string) => {
    const root = parse(html)
    const items = root.querySelectorAll('.mw-diff-inline-*')
    console.log('items', items)
}

export const getRev = async () => {

    const res = await axios.get(endpoints.getRevision.replace('{id}', '1177896789'), {
        headers: {
        }
    })
}

export const decodeHtmlEntity = function(str: string) {
    var translate_re = /&(nbsp|amp|quot|lt|gt);/g;
    var translate = {
        "nbsp":" ",
        "amp" : "&",
        "quot": "\"",
        "lt"  : "<",
        "gt"  : ">"
    };
    return str.replace(translate_re, function(match, entity) {
        // @ts-ignore
        return translate[entity];
    }).replace(/&#(\d+);/gi, function(match, numStr) {
        var num = parseInt(numStr, 10);
        return String.fromCharCode(num);
    });
}