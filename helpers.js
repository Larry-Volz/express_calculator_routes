function stringsToNums(nums){
    let result =[];
    console.log('at helpers');
    for (let i=0; i<nums.length; i++){
        console.log(`i = ${i}`);
        let toNum = Number(nums[i]);
        
        if (Number.isNaN(toNum)) {
            return new Error(
                `${nums[i]} at index ${i} is not a number.`
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