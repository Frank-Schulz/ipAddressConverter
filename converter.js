"use strict";

// ANCHOR Variable Definition
/* ------------------------ Define general variables ------------------------ */
let input = "11000000.10101000.00000001.00000001";
input = "192.168.1.1";
let output = "";
// Split IP address into segments
let segs = input.split('.');

// ANCHOR Checks
// Check that input is a valid binary IP
let isBinIP = (input) =>
{
    // Regex test for any non-valid binary characters
    let re = /[^10.]/;
    // Test cases for binary input
    if (input.split('.').length !== 4) {
        return false;
    }
    else if (input.length !== 35) {
        return false;
    }
    else if (re.test(input) !== false) 
    {
        return false
    }
    else
    {
        return true;
    }
}

// Check that input is a valid decimal IP
let isDecIP = (input) =>
{
    let re = /^(\d{1,3}).(\d{1,3}).(\d{1,3}).(\d{1,3})$/;

    if (re.test(input))
    {        
        return segs[0] > 255 ? false : 
            segs[1] > 255 ? false :
                segs[2] > 255 ? false :
                    segs[3] > 255 ? false : 
                        true;
    }
    else
    {
        return false
    }
}

// ANCHOR Error and Utility
// error function
let error = (errorCode) =>
{
    switch (errorCode) 
    {
        case 'badInput':
            throw new Error("Warning: Invalid input! Please provide a valid IP address");
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

// ANCHOR Converters
// Convert binary IP to decimal function
function convertBinToDec(bin)
{
    /* ------------------- Define binary to decimal conversion variables ------------------- */
    // Variable for binary value
    let binVal = 1;
    // Variable for adding the binary
    let ipSeg = 0;
    // Variable for construction of decimal IP
    let decIP = "";
    // Split binary address into segments
    let binSegs = input.split('.');
    
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

// Convert decimal IP to binary function
function convertDecToBin(dec)
{
    /* ------------------- Define decimal to binary conversion variables ------------------- */
    // Array holding binary positional values
    let binArray = [128, 64, 32, 16, 8, 4, 2, 1];
    // Variable to hold binary segements
    let binSeg = [];
    // Variable to construct binary IP
    let binIP = "";
    // Split IP address into segments
    let ipSegs = input.split('.');

    // For each IP segment
    ipSegs.forEach(ipSeg =>
    {
        // reset binSeg array
        binSeg = [];
        // For each binary value
        binArray.forEach(bin => 
        {
            // Subtract binary value from decimal value
            let decReduce = () => { return (ipSeg - bin); };
            // If IP segment has a value greater than or equal to binary value
            if (ipSeg >= bin)
            {
                // If true call decReduce and push binary 1 to binSeg
                ipSeg = decReduce();
                binSeg.push(1);
            } else
            {
                // If false push binary 0 to binSeg
                binSeg.push(0);
            }
        })
        // Reduce binary add to binIP and append "."
        binIP += binSeg.reduce(function (a, b) { return String(`${a}${b}`); });
        binIP += '.';
    });
    // return binIP and cut off the last "."
    return binIP.slice(0, -1);
}

// ANCHOR Function Caller
function out(input) {
    if (isBinIP(input) == true)
    {
        output = convertBinToDec(input);
        return output
    }
    else if (isDecIP(input) == true)
    {
        output = convertDecToBin(input);
        return output
    }
    else
    {
        error('badInput')
    }
}

console.log(out(input));