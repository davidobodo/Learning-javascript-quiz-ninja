'use strict'

function factorsOf(n){
    const factors = [];
    for(i=1; i<=n ;i++){
        if(n/i === Math.floor(n/i)){
            factors.push(i);
        }
        // if(n%i === 0){

        // }
    }
    return factors;
}


test( 'factors of 12', () => {
    expect(factorsOf(12)).toEqual([1,2,3,4,6,12]);
})

