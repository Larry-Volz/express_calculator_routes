
/**
 * Convert an array of strings to an array of numbers
 * @param {Array} nums - an array of strings
 * @returns {Array|Error} an array of numbers or an error object
 */
function stringsToNums(nums){
    let result =[];
    console.log('at helpers');
    for (let i=0; i<nums.length; i++){
        let toNum = Number(nums[i]);
        
        if (Number.isNaN(toNum)) {
            return new Error(
                `value: ${nums[i]} at index ${i} is not a number.`
                );
            }
            console.log(toNum);
            result.push(toNum);
        }
        console.log(`results: ${result}`)
        return result;
}

module.exports = {
    stringsToNums
}