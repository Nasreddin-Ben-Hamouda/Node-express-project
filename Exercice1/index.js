const call1=(callback)=>{
        callback();
}
const call2=(callback)=>{
    callback();
}
const call3=(callback)=>{
    callback();
}

console.log('********* callback test **********')
console.log("A");
call1(()=>{
    console.log("B");
    call2(()=>{
        console.log("C");
        call3(()=>{
            console.log("D");
        })
        console.log("E");
    })
    console.log("F");
});
console.log("G");

//Question 1: l'ordre d'apparition des messages est A B C D E F G

//Question 2: version avec les promisses de ce code.


const promiseCall1= ()=> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve( 'B')
        }, 1000)
    });
}
const promiseCall2= ()=> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve( 'C')
        }, 1000)

    })
}
const promiseCall3= ()=> {
    return new Promise((resolve, reject) => {
            resolve(true)
    });
}
const promiseCheck=(res)=>{
    return new Promise((resolve, reject) => {
        if(res===true)
            resolve('D')
        reject('error')
    });
}
console.log('********* promise test **********')
console.log("A");
promiseCall1().then((res)=>console.log(res))
              .then(()=>promiseCall2())
              .then((res)=>console.log(res))
              .then(()=>promiseCall3())
              .then((res)=>promiseCheck(res))
              .then((res)=>console.log(res))
              .then(()=>console.log('E'))
              .then(()=>console.log('F'))
              .then(()=>console.log("G"))
              .catch((err)=>console.log(err))


//Question 3:version avec async await de ce code

const AsyncTest=async ()=>{
    try {
        console.log("A");
        let res1= await promiseCall1();
        console.log(res1);
        let res2=await promiseCall2();
        console.log(res2);
        let res3=await promiseCall3()

        let res4=await promiseCheck(res3)
        console.log(res4)

        console.log('E');
        console.log('F')
        console.log("G")
    }catch (err){
        console.log(err);
    }
}
console.log('********* Async test **********')
AsyncTest();
