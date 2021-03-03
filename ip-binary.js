'use strict';

// Define variables
let input = "192.168.20.1";
let output = "";
let binArray = [128, 64, 32, 16, 8, 4, 2, 1];

// Variable to hold binary segements
let binSeg = [];
// Variable to construct binary IP
let binIP = "";

// Split IP address into segments
let ipSegs = input.split('.');

// Convert decimal IP to binary function
function convertIP()
{
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
// Set output to the result of convertIP function
output = convertIP();
console.log(output);