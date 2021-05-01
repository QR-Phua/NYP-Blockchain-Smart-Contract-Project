pragma solidity ^0.5.10;

contract DrugRegistrationContract {
    // Model a Drug
    struct Drug {
        uint drugNo;
        string drugName;
        string company;
        string description;
        mapping (uint => Results) resultList;
        bool approval;
    }

    //Model a Pharmaceutical Compnay
    struct Results {
        uint trialNo;
        uint drugNo;
        uint trialParticipants;
        uint dosesGiven;
        uint goodReaction;
        uint badReaction;
    }

    // Read/write 
    mapping(uint => Drug) private drugList;
    uint public drugCount;

    

    function registerNewDrug(string memory _drugName, string memory _description,
                            string memory _company) public 
    {
         //register new drug
        drugCount ++; //auto-increment the drugCount
        Drug memory drug;
        drugList[drugCount] = drug;
        
        bool _approval = false;
        Drug storage d = drugList[drugCount]; // retrieve struct from mapping
        d.drugName = _drugName;
        d.description = _description;
        d.company = _company;
        d.approval = _approval;
        drugList[drugCount] = d;
        
    
    }

    // add trial results into the drug Struct
    function registerTrialResults(uint _trialNo, uint _drugNo, uint _trialParticipants, uint _dosesGiven, uint _goodReaction, uint _badReaction) 
    public 
    {
        DrugRegistrationContract.Results memory newResults = Results(_trialNo, _drugNo, _trialParticipants, _dosesGiven, _goodReaction, _badReaction);
        
        Drug storage d = drugList[_drugNo];
        d.resultList[_trialNo] = newResults;
        drugList[_drugNo] = d;
        
    }
   
    // approve Drug by regulators
    function approveDrug (uint _drugNo, string memory _specialKey) public 
    {
        bool approval = true;
        string memory keyWord = "abc123";
        if ( keccak256(abi.encodePacked(_specialKey)) == keccak256(abi.encodePacked(keyWord)) ){
            Drug storage d = drugList[_drugNo];
            d.approval = approval;
            drugList[_drugNo] = d;
        }
        else
        {
            throw;
        }
        
    }
    
    function getNumberCount() public view returns (uint count){
        
        return (drugCount);
    }

    // get Drug details
    function getDrug (uint _drugNo) public view returns (string memory drugName, string memory company, string memory description, bool approval) 
    {
        return (drugList[_drugNo].drugName, drugList[_drugNo].company, drugList[_drugNo].description, drugList[_drugNo].approval);
    }

    //get Drug Clinical Trial Details
    function getDrugTrials (uint _drugNo, uint _trialNo) public view returns (uint trialParticipants, uint dosesGiven, uint goodReaction, uint badReaction)
    {
        Drug storage d = drugList[_drugNo];
        Results storage r = d.resultList[_trialNo];
        
        return (r.trialParticipants, r.dosesGiven, r.goodReaction, r.badReaction);
    }
    
}