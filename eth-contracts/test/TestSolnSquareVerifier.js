
var SolnSquareVerifier = artifacts.require('SolnSquareVerifier');
var Verifier = artifacts.require('Verifier');

var proof = {
	"proof":
	{
		"A":["0x91ace53f821b36b9aeae5afffa7de55a3c171f2cd63bc584925aeddd4745e0c", "0x127d3bf06cc29958dffd0dff4ce35e5d73ce0863d5973d58bff5ca35d1343111"],
		"A_p":["0x767202f31bc26f2a8368607a60dae180eaeb221c3c364bd17c55a98f94945c0", "0x1dce4bb3b3e162a26737850dac8a6486b9b0bb0b3dc7109c70f1685359bd447c"],
		"B":
			[["0x1c8d2f1d07e1b065915adec72c83c8fd29c22f9a4270ffb947357b32e636964e", "0x2247c8cd76325300b8cf5128a989375853b29b88fe8e96b4da78cc18a603517"], ["0xc169d296bc9c759065a1ac1d919ee64455de5458a5ee7b158338a86328b1351", "0x24b4a289afd4f38dce908ada77ed358edf1cf361110b899252e387de8b297296"]],
		
		"B_p":["0xca8bb5517495c5a2d851b9bd1bee6c35b1107b7fc15a6ee481060332e0164a9", "0x1b5395bfa2de9e03ad5e0bb5e5534ea2ec20291e2b7a18a7a763741f23130ef"],
		"C":["0x1663d942f9085c9d999a3f419cc4f0e20381bb0b00ee471e75ee5cedf206aa6f", "0x2431273e17c3a7dc2f112c0545ed4b58ecca26c4de5fd079b04aebe52a6f15f5"],
		"C_p":["0x2afa082e7bfe2e57f9d688a6839d44264062f22bf0efce8be39ad668fdd9d9c", "0x26f8d4c6d56461e072b5f25b36ebf2abb263bf376105075fd46b879dd1cbe738"],
		"H":["0x15a8f2dc298f070791c4c4bc279021bb3ab190c018b316c3fef4ea61bf270234", "0x27644c4a21b42166e73d373ad68e70f906e5aa875402c51fea26c78dc5b46b83"],
		"K":["0x1bcce78f1cb5d8d1a7a63fda31406c9ef0e2a609db6a54a2d861e328f28e5d9a", "0x40ff559fdfa76538618151d28c685ac641f6dd1c6b5cff7730f9073e9dc11a4"]
	},
	"input":[4,1]};

contract('SolnSquareVerifier', accounts => {
	
    const account1 = accounts[0];
    const account2 = accounts[1];
    
    const A = proof["proof"]["A"];
    const A_p = proof["proof"]["A_p"];
    const B = proof["proof"]["B"];
    const B_p = proof["proof"]["B_p"];
    const C = proof["proof"]["C"];
    const C_p = proof["proof"]["C_p"];
    const H = proof["proof"]["H"];
    const K = proof["proof"]["K"];
    const correctProofInput = proof["input"];

    describe('Testing SolnSquareVerifier', function () {
        beforeEach(async function () {
        	const verifier = await Verifier.new({from: account1});
            this.contract = await SolnSquareVerifier.new(verifier.address, {from: account1});
        });

        // Test if a new solution can be added for contract - SolnSquareVerifier
        // Test if an ERC721 token can be minted for contract - SolnSquareVerifier
        it('Test if token can be minted and new solution can be added', async function () {
            let properlyMinted = await this.contract.mintNFT(account2, 2, A, A_p, B, B_p, C, C_p, H, K, correctProofInput, {from: account1});
            let owner = await this.contract.ownerOf(2);
            assert.equal(account2, owner, "Token has not been minted.");
        });

        // Test that an already existing solution cannot  be added for contract - SolnSquareVerifier
        it('// Test that  solution cannot be added twice', async function () {
            
            let added = false;
            try{
                await this.contract.addSolution(account2, 2, A, A_p, B, B_p, C, C_p, H, K, correctProofInput);
                await this.contract.addSolution(account2, 3, A, A_p, B, B_p, C, C_p, H, K, correctProofInput); 
            } catch(e) {
                added = true;
            }
            assert.equal(added, true, "Solution has been added already");
        });
    });

})
