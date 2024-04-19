import { ethers } from "ethers";
import { GcpKmsSigner } from "ethers-gcp-kms-signer";

const kmsCredentials = {
  projectId: "blockchaintestsglobaltestnet",
  locationId: "global",
  keyRingId: "jcortejoso-test",
  keyId: "jcortejoso-test",
  keyVersion: "1",
};

// From ethers, call providers.getDefaultProvider() to get a provider
const provider = new ethers.providers.JsonRpcProvider("https://baklava-forno.celo-testnet.org");

let signer = new GcpKmsSigner(kmsCredentials);
signer = signer.connect(provider);

(async () => {
  const address = await signer.getAddress();
  console.log("Address:", address); // 0x0e214b0fbf70825cd8d16224f52d570145bc7491

  const tx = await signer.sendTransaction({
    to: "0xfCf982bb4015852e706100B14E21f947a5Bb718E",
    value: ethers.utils.parseEther("0.001"),
  });
  console.log("Transaction:", tx);
})();
