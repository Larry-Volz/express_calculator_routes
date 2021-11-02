const { stringsToNums } = require('./helpers');


describe("arr of strings to arr of numbers or error", function () {

    test('return array', function () {
        /** see if ["1","2","3"] returns [1,2,3] */
        let strArr = stringsToNums(["1","2","3"]);
        expect(strArr).toEqual([1,2,3]);
    });
  
    test('return sum with neg numbers', function () {
        /** see if ["1","2","blue"] returns error */
        let thrownErr = stringsToNums(["1","2","blue"]);
        expect(()=> {
            /*needs to be wrapped in additional function per
            https://jestjs.io/docs/expect#tothrowerror
            */
            thrownErr.toThrow();
        })
    });
  
  });



