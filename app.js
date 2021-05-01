// The object 'Contracts' will be injected here, which contains all data for all contracts, keyed on contract name:
// Contracts['MyContract'] = {
//  abi: [],
//  address: "0x..",
//  endpoint: "http://...."
// }
var Contracts={ DrugRegistrationContract: {
    abi:[
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_drugNo",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "_specialKey",
                    "type": "string"
                }
            ],
            "name": "approveDrug",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_drugName",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_description",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_company",
                    "type": "string"
                }
            ],
            "name": "registerNewDrug",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_trialNo",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "_drugNo",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "_trialParticipants",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "_dosesGiven",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "_goodReaction",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "_badReaction",
                    "type": "uint256"
                }
            ],
            "name": "registerTrialResults",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "_drugRegistrationNo",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "drugCount",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_drugNo",
                    "type": "uint256"
                }
            ],
            "name": "getDrug",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "drugName",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "company",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "description",
                    "type": "string"
                },
                {
                    "internalType": "bool",
                    "name": "approval",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_drugNo",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "_trialNo",
                    "type": "uint256"
                }
            ],
            "name": "getDrugTrials",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "trialParticipants",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "dosesGiven",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "goodReaction",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "badReaction",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }
    ],
    address:"0xa1908708cdc58288ebc9614f5a146c2f443884f8",

    //endpoint: "https://ropsten.infura.io/v3/10b99aff8df948ae8a3d0049b46795f6"
    endpoint: "https://ropsten.infura.io/v3/undefined"
}}


function DrugRegistrationApp(Contract) {
    this.web3 = null;
    this.instance = null;
    this.Contract = Contract;
    //alert(Contract)
}

DrugRegistrationApp.prototype.init = function(cb) {
    
    
    // We create a new Web3 instance using either the Metamask provider
    // or an independent provider created towards the endpoint configured for the contract.
    if (window.ethereum) {
        
        this.web3 = new Web3(ethereum);
        try {
            // Request account access if needed
            ethereum.enable();
            
        } catch (error) {
            alert(9999);
            //User denied account access...
        }
    }
    else if (window.web3) {
        alert(2)
        this.web3 = new Web3(web3.currentProvider);
    }
    else {
        alert(3)
        this.web3 = new Web3.providers.HttpProvider(this.Contract.endpoint);
    }
    
    /*
    this.web3 = new Web3( //?
        (window.web3 && window.web3.currentProvider) ||
        new Web3.providers.HttpProvider(this.Contract.endpoint)); //? 
    */
    // Create the contract interface using the ABI provided in the configuration.
    var contract_interface = this.web3.eth.contract(this.Contract.abi);

    // Create the contract instance for the specific address provided in the configuration.
    this.instance = contract_interface.at(this.Contract.address);

    cb();
}

if(typeof(Contracts) === "undefined") var Contracts={ DrugRegistrationContract: { abi: [] }};
var drugRegistrationApp = new DrugRegistrationApp(Contracts['DrugRegistrationContract']);


DrugRegistrationApp.prototype.onReady = function() {
    this.init(function() {
        $("#message").text("DApp loaded successfully.")
    })
}


$(document).ready(function() {
    drugRegistrationApp.onReady() = function(){
        this.init(function(){
            $("#message").text("DApp loaded successfully.")
        });
    };
});



DrugRegistrationApp.prototype.registerDrug= function(){
    var that = this;

    //Get input values for house number and owner name
    var name = $("#rDName").val();
    
    var company = $("#rDCompany").val();
    
    var description = $("#rDDescription").val();
    
    
    $("#rDLabel").text("Registering " + name + " by " + company + " into the blockchain! ");

    // Gas and gasPrice should be removed for non browser networks

    if (this.web3 === null){
        alert("web3 is empty");
    }

    if (this.instance === null) {
        alert("instance is empty");
    }

    if (this.contract === null) {
        alert("Contract is empty");
    }

    this.instance.registerNewDrug(name, description, company, 
    { from: window.web3.eth.accounts[0], gas: 1000000, gasPrice: 1000000000, gasLimit: 1000000},
        function(error, txHash,){
            if(error){
                console.log(error);
            }
            else{
                that.waitForReceipt(txHash, function(receipt){
                    $("#rDLabel").text("Registering " + name + " by " + company + " into the blockchain! ");
                    if(receipt.status == 1){

                        /*
                        drugRegistrationApp.getNumberCount.call(function(error, result){
                            if (error){
                                alert(error);
                            }
                            else{
                                alert("Your registration number for this drug is " + result);
                            }
                        });
                        */ 
                        

                        $("#rDName").val("");
                        $("#rDDescription").val("");
                        $("#rDCompany").val("");
                        $("#RD").show();
                        $("#rDLabel").text("Registration of Drug is successful!");
                        
                    

                    }
                    else{
                        $("#rDName").val("");
                        $("#rDDescription").val("");
                        $("#rDCompany").val("");
                        $("#RD").show();
                        $("#rDLabel").text("Registration of Drug failed!");
                        alert("There was an Error!")
                    }
                });
            }
        }
    )
}

DrugRegistrationApp.prototype.registerTrialResults= function(){
    var that = this;

    //Get input values for house number and owner name
    var trialNo = $("#sTtrialNo").val();
    trialNo = parseInt(trialNo);
    var drugNo = $("#sTdrugNo").val();
    drugNo = parseInt(drugNo);
    var trialParticipants = $("#sTtrialParticipants").val();
    trialParticipants = parseInt(trialParticipants);
    var dosesGiven = $("#sTdosesGiven").val();
    dosesGiven = parseInt(dosesGiven);
    var goodReaction = $("#sTgoodReaction").val();
    goodReaction = parseInt(goodReaction);
    var badReaction = $("#sTbadReaction").val();
    badReaction = parseInt(badReaction);
    $("#sTLabel").text("Registering the details of Clinical Trial: " + trialNo + " for Drug Registration Number: " + drugNo + " into the blockchain! ");

    // Gas and gasPrice should be removed for non browser networks
    this.instance.registerTrialResults(trialNo, drugNo, trialParticipants, dosesGiven, goodReaction, badReaction,
    { from: window.web3.eth.accounts[0], gas: 1000000, gasPrice: 1000000000, gasLimit: 1000000},
        function(error, txHash){
            if(error){
                console.log(error);
            }
            else{
                that.waitForReceipt(txHash, function(receipt){
                    if(receipt.status == 1){
                        $("#sTtrialNo").val("");
                        $("#sTdrugNo").val("");
                        $("#sTtrialParticipants").val("");
                        $("#sTdosesGiven").val("");
                        $("#sTgoodReaction").val("");
                        $("#sTbadReaction").val("");
                        $("#ST").show();
                        $("#sTLabel").text("Submission of information is successful!");
                        alert("Submission of Clinical Trial " + trialNo + " information is successful!");
                        
                    }
                    else{
                        $("#sTtrialNo").val("");
                        $("#sTdrugNo").val("");
                        $("#sTtrialParticipants").val("");
                        $("#sTdosesGiven").val("");
                        $("#sTgoodReaction").val("");
                        $("#sTbadReaction").val("");
                        $("#ST").show();
                        $("#sTLabel").text("Submission of information is successful!");
                    }
                });
            }
        }
    )
}

DrugRegistrationApp.prototype.approveDrug= function(){
    var that = this;

    //Get input values for house number and owner name
    var drugNo = $("#aDdrugNo").val();
    drugNo = parseInt(drugNo);
    var specialKey = $("#aDspecialKey").val();
    
    $("#aDLabel").text("Beginning transaction!");

    // Gas and gasPrice should be removed for non browser networks
    this.instance.approveDrug(drugNo, specialKey, 
    { from: window.web3.eth.accounts[0], gas: 1000000, gasPrice: 1000000000, gasLimit: 1000000},
        function(error, txHash){
            if(error){
                alert("Special Key entered is wrong!");
            }
            else{
                that.waitForReceipt(txHash, function(receipt){
                    if(receipt.status == 1){
                        $("#aDdrugNo").val("");
                        $("#aDspecialKey").val("");
                        $("#AD").show();
                        $("#aDLabel").text("Transaction is successful!");
                        alert("Transaction is successful!");
                    }
                    else{
                        $("#aDdrugNo").val("");
                        $("#aDspecialKey").val("");
                        $("#AD").show();
                        $("#aDLabel").text("Transaction is unsuccessful!");
                        alert("Transaction is unsuccessful!");
                    }
                });
            }
        }
    )
}

DrugRegistrationApp.prototype.getNumberCount = function(cb){
    
    this.instance.getNumberCount(function (error, result){
        cb(error, result);
        //result = parseInt(result);
        //alert("Your Drug Registration Number is : " + result);
    });
};


DrugRegistrationApp.prototype.getDrug = function(cb){

    var drugNo = $("#vRdrugNo").val();
    drugNo = parseInt(drugNo);

    this.instance.getDrug(drugNo, function (error, result){
        //cb(error,result)
        $("#vRdrugNo").text("");
        if (error || result[0] === "" || result[1] === "" || result[2] === "" || result[3] === "" ){
            alert("No drug record exists!");
        }
        
        else{
            alert("Information Retrieved!");
            $("#vRdrugNumber").text("Drug Number: " + drugNo);
            $("#vRdrugName").text("Drug Name: " + result[0]);
            $("#vRdrugDescription").text("Drug Description: " + result[2]);
            $("#vRdrugCompany").text("Drug Company: " + result[1]);
            $("#vRdrugApproval").text("Approval Status: " + result[3]);
        }
        $("#VR").show();
    });
};


DrugRegistrationApp.prototype.getDrugTrials = function(){

    var trialNo = $("#vtTrialNo").val();
    trialNo = parseInt(trialNo);
    var drugNo = $("#vtDrugNo").val();
    drugNo = parseInt(drugNo);

    this.instance.getDrugTrials(drugNo, trialNo, function(error, result){

        $("#vtDrugNo").text("");
        $("#vtTrialNo").text("");
        
        if (error || (result[0] == 0 && result[1] == 0 && result[2] == 0 && result[3] == 0) ) {
            alert("No trial records found!")
            test = false;
        }

        else{
            alert("Information Retrieved!");
            $("#vTRtrialNo").text("Trial Number: " + trialNo);
            $("#vTRdrugNo").text("Drug Number: " + drugNo);
            $("#vTRtrialParticipants").text("Number of trial participants: " + result[0]);
            $("#vTRdosesGiven").text("Total Number of doses used in the trial: " + result[1]);
            $("#vTRgoodReaction").text("Number of people WITH NO adverse reactions: " + result[2]);
            $("#vTRbadReaction").text("Number of people WITH adverse reactions: " + result[3]);
        }
        
        $("#VTR").show();
    })
};

// Waits for receipt from transaction
DrugRegistrationApp.prototype.waitForReceipt = function(hash, cb){
    var that = this;

    // Checks for transaction receipt
    this.web3.eth.getTransactionReceipt(hash, function(err, receipt){
        if (err){
            error(err);
        }
        if (receipt !== null){
            // Transaction went through
            if (cb){
                cb(receipt);
            }
        } else {
            // Try again in 2 seconds
            window.setTimeout(function(){
                that.waitForReceipt(hash, cb);
            }, 2000);
        }
    });
}

