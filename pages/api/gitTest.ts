// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import simpleGit, { CleanOptions, SimpleGitOptions } from 'simple-git';
import {appendFileSync} from "fs";
import simplegit from "simple-git/promise";
import ignore from "ignore";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    simpleGit().clean(CleanOptions.FORCE);
    const options: Partial<SimpleGitOptions> = {
        baseDir: "C:\\Users\\Lukas\\Projekte\\Test",
        binary: 'git',
        maxConcurrentProcesses: 6,
    };
    const simpleGitObj = simpleGit(options);

    appendFileSync("C:\\Users\\Lukas\\Projekte\\Test\\test.txt", "\nThis is a test");

    await simpleGitObj.add("test.txt")
    await simpleGitObj.commit("test")
    await simpleGitObj.push()


    let response = {
        "obj": "",
    }

    res.status(200).json(response)
}