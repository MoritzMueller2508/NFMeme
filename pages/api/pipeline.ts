// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import pinataSDK, {PinataClient, PinataPinResponse} from '@pinata/sdk'
import {readFileSync, writeFileSync, ReadStream, createReadStream, appendFileSync} from "fs";
import {func, string} from "prop-types";
import simpleGit, {CleanOptions, SimpleGitOptions} from "simple-git";
import {json} from "stream/consumers";

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
        "image": "ipfs://" + ipfsHash,
        "properties": {
            "creators": [{"address": address, "share": 100}],
            "files": [{"uri": "ipfs://" + ipfsHash, "type": "image/png"}]
        },
        "collection": {"name": "NFMeme", "family": "memes"}
    };

    let filename = ipfsHash + '.json';
    let data = JSON.stringify(metadata);

    writeFileSync(filename, data);

    return filename;
}

function createTokenJson(splTokenAdress:string, ipfsMetada:string, ipfsImage:string) : string {
    let data = [
        '      "chainId": 101',
        '      "address": "' + splTokenAdress + '"',
        '      "symbol": "NFMEME"',
        '      "name": "NFMeme"',
        '      "decimals": 1',
        '      "logoURI": "ipfs://' + ipfsImage + '"',
    ]

    let res = "    {\n";
    res += data.join("\n");
    res += "\n    }"

    return res
}

async function pushToGit(json:string) {
    simpleGit().clean(CleanOptions.FORCE);
    const options: Partial<SimpleGitOptions> = {
        baseDir: "C:\\Users\\Lukas\\Projekte\\token-list",
        binary: 'git',
        maxConcurrentProcesses: 6,
    };
    const simpleGitObj = simpleGit(options);

    simpleGitObj.fetch("solana-labs")
    let lastCommitName = await simpleGitObj.raw("git log --pretty=format:\"%s\" -1");
    lastCommitName = lastCommitName.toString()

    let b = readFileSync("C:\\Users\\Lukas\\Projekte\\token-list\\src\\tokens\\solana.tokenlist.json", "utf-8").split("\n");
    let i = b.length - 1;
    for (i; i >= 0 ; i--){
        if (b[i] == "],")
            break
    }




    appendFileSync("C:\\Users\\Lukas\\Projekte\\token-list\\src\\tokens\\solana.tokenlist.json", "\n"+ json);

    await simpleGitObj.add("solana.tokenlist.json")
    await simpleGitObj.commit("add NFT Token")
    await simpleGitObj.push("lukas-becker", "main")

    //await simpleGitObj.raw("request-pull " + lastCommitName + " https://github.com/lukas-becker/token-list")
    console.log("request-pull " + lastCommitName + " https://github.com/lukas-becker/token-list")
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    /*
    let credentials = getAPICredentials()

    let pinata = pinataSDK(credentials.get("key") as string, credentials.get('secret') as string)
    let image = await pinFile(pinata, "HEXNFT/003226.png")
    let nftJsonFile = createJson(image["IpfsHash"])
    let metadata = await pinFile(pinata, nftJsonFile)
    */


    let response = {
        "tokenMeta": createTokenJson("abc", "def", "hij"),

    }

    res.status(200).json(createTokenJson("abc", "def", "hij"))
}