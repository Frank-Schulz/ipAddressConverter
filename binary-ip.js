"use strict";

// Define variables
let input = "11000000.10101000.00000001.00000001";
let output = "";

// Variable for binary value
let binVal = 1;
// Variable for adding the binary
let ipSeg = 0;
// Variable for construction of decimal IP
let decIP = "";

// Split binary address into segments
let binSegs = input.split('.');

// error function
function error(errorCode)
{
    switch (errorCode) 
    {
        case 'badInput':
            console.log("Warning: Invalid input");
        // default:
        //     console.log("ERROR");
    }
}

// Check that input is valid
function isBinIP(ip) 
{
    if (ip.split('.').length === 4)
    {
        console.log(true);
        return true;
    } else 
    {
        return false;
    }
}

// String reversal function
function reverseString(str)
{
    if (str === "")
        return "";
    else
        return reverseString(str.substr(1)) + str.charAt(0);
}

// Convert binary IP to decimal function
function convertBin()
{
    if (isBinIP(input) !== true) 
    {
        error('badInput');
        
    }
    
    binSegs.forEach(binSeg => 
    {
        binSeg = reverseString(binSeg);
        for (let i = 0; i <= 8; i++)
        {
            if (binSeg[i] === '1')
            {
                ipSeg += binVal;
            }
            binVal *= 2;
        }
        decIP += `${ipSeg}.`;
        // var reset
        binVal = 1;
        ipSeg = 0;
    })
    return decIP.slice(0, -1);
}

// Call binary convert function
output = convertBin();
console.log(output);