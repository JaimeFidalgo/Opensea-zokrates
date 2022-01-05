const HDWalletProvider = require("truffle-hdwallet-provider")
const zokratesProof = [
    require("./proof01.json"),
    require("./proof02.json"),
    require("./proof03.json"),
    require("./proof04.json"),
    require("./proof05.json"),
    require("./proof06.json"),
    require("./proof07.json"),
    require("./proof08.json"),
    require("./proof09.json"),
    require("./proof10.json"),
];
//console.log(zokratesProof[0].input)

const web3 = require('web3')
const OWNER_ADDRESS = "0xd964D59589B6802058fC1E90cdEf43FCe2d66391"
const CONTRACT_ADDRESS = "0x8D1564B6253c712Dc7bad5FB372795F1ccEE0449"
const NETWORK = "rinkeby"
const MINT_COUNT =10
const MNEMONIC = ''
const INFURA_KEY = "1576566c4318452ab7d2cbd2bfc34925"

if (!MNEMONIC || !INFURA_KEY || !OWNER_ADDRESS || !NETWORK) {
    console.error("Please set a mnemonic, infura key, owner, network, and contract address.")
    return
}

const contract = require('../eth-contracts/build/contracts/SolnSquareVerifier.json'); 
const ABI = contract.abi;


async function main() {
    const provider = new HDWalletProvider(MNEMONIC, `https://${NETWORK}.infura.io/v3/${INFURA_KEY}`)
    const web3Instance = new web3(
        provider
    )

    if (CONTRACT_ADDRESS) {
        const r2token = new web3Instance.eth.Contract(ABI, CONTRACT_ADDRESS, { gasLimit: "1000000000000000" })
        // tokens issued directly to the owner.
        for (let i = 0; i < MINT_COUNT ; i++) {
            try {
                let proofs = Object.values(zokratesProof[i].proof);
               /* console.log(proofs.length)
                console.log(proofs[0])
                console.log(proofs[1])
                console.log(proofs[2])
                console.log(proofs[3])
                console.log(proofs[4])
                console.log(proofs[5])
                console.log(proofs[6])
                console.log(proofs[7])*/

                let zproof = zokratesProof[i].proof;
                let inputs = zokratesProof[i].input;
                console.log("OWNER_ADDRESS "+ OWNER_ADDRESS + "\n");
                console.log("i "+i+ "\n");
                console.log("proofs "+ proofs+ "\n");
                console.log("inputs "+ inputs+ "\n");
                //console.log(typeof(Object.values(zproof.A)))
                tx = await r2token.methods.mintNFT(OWNER_ADDRESS, i+1,proofs[0],proofs[1],proofs[2],proofs[3],proofs[4],proofs[5],proofs[6],proofs[7],inputs).send({ from: OWNER_ADDRESS, gas:  55103280000 });
                console.log("Minted item. Transaction: " + tx.transactionHash);
            } catch (e) {
                console.log(e);
            }
        }
    }
}

main()