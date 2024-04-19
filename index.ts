import { ethers } from "ethers";
import { GcpKmsSigner } from "ethers-gcp-kms-signer";

const kmsCredentialsBase = {
  projectId: "blockchaintestsglobaltestnet",
  locationId: "global",
  keyRingId: "cel2-testnet",
  keyVersion: "1",
};
let kmsCredentials = [];
const roles = ["admin", "batcher", "proposer", "sequencer"];

for (const role of roles) {
  kmsCredentials.push({
    ...kmsCredentialsBase,
    keyId: role,
  });
}

for (const kmsCredential of kmsCredentials) {
  console.log(JSON.stringify(kmsCredential, null, 2));
}

// From ethers, call providers.getDefaultProvider() to get a provider
const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");


(async () => {
  for (const kmsCredential of kmsCredentials) {
    let signer = new GcpKmsSigner(kmsCredential);
    signer = signer.connect(provider);
    const address = await signer.getAddress();
    console.log(`Address for ${kmsCredential.keyId}: ${address}`);
  }

  // const tx = await signer.sendTransaction({
  //   to: "0xfCf982bb4015852e706100B14E21f947a5Bb718E",
  //   value: ethers.utils.parseEther("0.001"),
  // });
  // console.log("Transaction:", tx);
})();
