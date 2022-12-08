import * as anchor from "@project-serum/anchor";
import {Program} from "@project-serum/anchor";
import {CpiTest} from "../target/types/cpi_test";
import {Puppet} from '../target/types/puppet'
import {Keypair} from '@solana/web3.js'
import * as buffer from "buffer";


describe("cpi_test", () => {
    // Configure the client to use the local cluster.
    const provider = anchor.AnchorProvider.local("https://api.devnet.solana.com");
    anchor.setProvider(provider);
    const puppetProgram = anchor.workspace.Puppet as Program<Puppet>

    const mainProgram = anchor.workspace.CpiTest as Program<CpiTest>;

    const puppetKeypair = Keypair.fromSecretKey(Buffer.from([
        156, 168, 158, 250, 40, 211, 210, 147, 99, 118, 34,
        189, 199, 173, 33, 50, 131, 244, 233, 110, 52, 83,
        141, 236, 25, 150, 142, 123, 10, 157, 130, 94, 1,
        121, 167, 91, 26, 141, 215, 118, 144, 227, 55, 136,
        75, 166, 158, 26, 26, 186, 191, 12, 90, 153, 98,
        54, 94, 78, 140, 227, 115, 146, 33, 1
    ]));
    // console.log(puppetKeypair.secretKey);

    // this data is copied from the tx
    // https://solscan.io/tx/DQTcCm4WZ5b1xPtCjNkqxhhfKDPTumpxvnpxcGgCa8Yw198tKfricTASA8mmpeCEW2oEenL3f4YxaJY7xJZHJWr?cluster=devnet
    // Your first hacking exercise: make it into the real instruction of the form:
    //   const data = Buffer.concat([
    //     Buffer.from([A]), // discriminator
    //     new anchor.BN(0).toBuffer('le', B), // new data
    // ]);
    // in which A, B is the real discriminator and the real number deserialized from this string
    // Hint: If we keep the data this way, new data is 3618473405298245664.
    const data = Buffer.from("df725b88c54e99990100000000000000");
    it("Does CPI", async () => {

        // await puppetProgram.methods.initialize().accounts({
        //         puppet: puppetKeypair.publicKey,
        //         user: provider.wallet.publicKey,
        //     }
        // ).signers([puppetKeypair]).rpc();

        await mainProgram.methods.pullString(data).accounts({
            puppetProgram: puppetProgram.programId,
            puppet: puppetKeypair.publicKey,
        }).rpc();

        let newData = (await puppetProgram.account.data.fetch(puppetKeypair.publicKey)).data;

        console.log("newdata", newData.toString());
    })
});
