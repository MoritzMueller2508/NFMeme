// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import pinataSDK, {PinataClient, PinataPinResponse} from '@pinata/sdk'
import {readFileSync,writeFileSync, ReadStream, createReadStream} from "fs";

function getAPICredentials() : Map<string,string> {
    let rawData = readFileSync('pinata-test.json');
    let credentials = JSON.parse(rawData.toString());
    let result = new Map();

    Object.keys(credentials).forEach(function (key: string | number){
        result.set(key, credentials[key])
    })

    return result;
}

function getFileAsStream(path : string) : ReadStream{
    const stream = createReadStream(path);
    return stream;
}

async function pinFile(pinata : PinataClient, path : string) : Promise<PinataPinResponse>{
    let stream = getFileAsStream(path);
    let result = await pinata.pinFileToIPFS(stream);

    console.log(result);
    return result;
}

function createJson(ipfsHash:string, name:string ="Test Name", description:string = "Description", address:string = "7bszZHtcMXADEnECUmYhjQL4k7FtKQ2A7nTFWvoUuXey") : string {
    let metadata = {
        "name": name,
        "symbol": "NFMeme",
        "description": description,
        "image": "ipfs://" + description,
        "properties": {
            "creators": [{"address": address, "share": 100}],
            "files": [{"uri": "ipfs://" + description, "type": "image/png"}]
        },
        "collection": {"name": "NFMeme", "family": "memes"}
    };

    let filename = ipfsHash + '.json';
    let data = JSON.stringify(metadata);

    writeFileSync(filename, data);

    return filename;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    let credentials = getAPICredentials()

    let pinata = pinataSDK(credentials.get("key") as string, credentials.get('secret') as string)
    let image = await pinFile(pinata, "HEXNFT/003226.png")
    let nftJsonFile = createJson(image["IpfsHash"])
    let metadata = await pinFile(pinata, nftJsonFile)
    let response = {
        "image": image,
        "metadata": metadata
    }

    res.status(200).json(response)
}