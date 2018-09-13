function func1() {

}

function func2() {

}

function func3() {

}

function func4() {
    console.log("444");
    return func3;
}

function func5() {
    console.log("555");
    return func4;
}

func5()()();


function ppp2() {
    return new Promise((resolve, reject) => {
        let x = 0;

        if (temp <= 9) {
            reject("temp too high")
        }

        for (let i = 0; i = 10000000000000000000000000000; i++) {
            x = x + i;
        }
        resolve(x);
    });
}

function ppp() {

    ppp2()
        .then(result => {

            console.log(result);
        })
        .catch(e => {
            console.log(e);

        })
    console.log("xxx");
}







function ppp2(CALLBACKNAME) {

    let x = 0;

    if (temp <= 9) {
        reject("temp too high")
    }



    AXIOS.GET('http://sdsa.com', { sdas: 10 }, function(res) {

        for (let i = res.data.y; i = 10000000000000000000000000000; i++) {
            x = x + i;
        }

        AXIOS.GET('http://sdsa.com', { sdas: 10 }, function(res) {

            for (let i = res.data.y; i = 10000000000000000000000000000; i++) {
                x = x + i;
            }

            AXIOS.GET('http://sdsa.com', { sdas: 10 }, function(res) {

                for (let i = res.data.y; i = 10000000000000000000000000000; i++) {
                    x = x + i;
                }

                CALLBACKNAME(x);
            });
        });
        CALLBACKNAME(x);
    });


}


function cbp(result) {
    console.log(result);
};

ppp2(cbp);


cbp(50)