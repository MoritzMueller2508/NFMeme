// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import pinataSDK from '@pinata/sdk'
import {readFileSync} from "fs";
import {TSMap} from "typescript-map";

//function getAPICredentials() : TSMap<string,string> {
function getAPICredentials() : Map<string,string> {
    let rawData = readFileSync('pinata-test.json');
    let credentials = JSON.parse(rawData.toString());
    let result = new Map();

    Object.keys(credentials).forEach(function (key: string | number){
        result.set(key, credentials[key])
    })

    return result;
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    //res.status(200).json({ name: 'John Doe' })
    let credentials = getAPICredentials();

    let pinata = pinataSDK(credentials.get("key"), credentials.get('secret'));
    pinata.testAuthentication().then((result) => {
        //handle successful authentication here
        console.log(result);
    }).catch((err) => {
        //handle error here
        console.log(err);
    });
    res.status(200);
}