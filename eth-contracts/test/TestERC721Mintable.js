var ERC721MintableComplete = artifacts.require('ERC721Mintable');

contract('TestERC721Mintable', accounts => {

    const accountOne = accounts[0];
    const accountTwo = accounts[1];

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({from: accountOne});

            // TODO: mint multiple tokens
            let mint1 = await this.contract.mint(accountOne, 1);
            let mint2 = await this.contract.mint(accountOne, 2);
            let mint3 = await this.contract.mint(accountOne, 3);
            let mint4 = await this.contract.mint(accountOne, 4);
            
        })

        it('should return total supply', async function () { 
            let result = await this.contract.totalSupply();
            assert.equal(result, 4, "The number of tokens minted is incorrect.");
        })

        it('should get token balance', async function () { 
            let balance01 = await this.contract.balanceOf(accountOne);
            assert.equal(balance01, 4, " the number of accountOne token balance is incorrect.");
            let balance02 = await this.contract.balanceOf(accountTwo);
            assert.equal(balance02, 0, " the number of accountTwo token balance is incorrect.");
            
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            let tokenURI = await this.contract.tokenURI(1);
            assert.equal(tokenURI, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1", "The tokenURI cannot be found.")  
        })

        it('should transfer token from one owner to another', async function () { 
            let result = await this.contract.transferFrom(accountOne, accountTwo, 2);
            let owner = await this.contract.ownerOf(2);
            assert.equal(owner, accountTwo, " the owner has not changed.");
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({from: accountOne});
        })

        it('should fail when minting when address is not contract owner', async function () { 
            let result = false;
            try{
               let mint = await this.contract.mint(accountOne, 4, "baseURI4", {from: accountTwo}); 
            } catch (e) {
                result = true;
            }
            assert.equal(result, true, "Others than owner can mint.");
        })

        it('should return contract owner', async function () { 
            let result = await this.contract.isOwner({from: accountOne}); 
            assert.equal(result, true, "The owner is not returned.");
        })

    });
})