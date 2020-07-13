chartIt();

//calling the getData fetch function above.
async function chartIt(){
    const data = await getData().catch((error) => {
        console.log(error);
        console.log("error");
    });                                 //charIt is going to wait till the the getData() function is completed.
    
    var ctx = document.querySelector(".chart").getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.xs,
            datasets: [{
                label: 'Combined Land-Surface Air and Sea-Surface Water Temperature in °C',
                data: data.ys,
                fill: false,
                backgroundColor: [
                    'rgba(255, 0, 0, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 0, 0, 1)',
                ],
                borderWidth: 1
            },
            {
                label: 'Northern Hemisphere Temperature in °C',
                data: data.ns,
                fill: false,
                borderColor: 'rgba(0, 0, 255, 1)',
                backgroundColor: 'rgba(0, 0, 255, 0.2)',
                borderWidth: 1
            },
            {
                label: "Southern Hemisphere in °C",
                data: data.ss,
                fill: false,
                borderColor: 'rgba(100, 255, 0, 1)',
                backgroundColor: 'rgba(100, 255, 0, 0.2)',
                borderWidth: 1
            }
        ]
        },
        animation: {
            onProgress: function (animation) {
                progress.value = animation.animationObject.currentStep / animation.animationObject.numSteps;
            }
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        // Include a dollar sign in the ticks
                        callback: function (value, index, values) {
                            return value + "°";
                        }
                    }
                }]
            }
        }
    });
}

//first try and fetch the file.
//I'll use async and await format.



async function getData(){

    const xs = [];
    const ys = [];
    const ns = [];
    const ss = []
    const response = await fetch("ZonAnn.Ts+dSST.csv");
    const data = await response.text();
    console.log(data);

    var table  = data.split("\n").slice(1); //removing the headers from the data set. (not important right now.)
    table .forEach((element) => {
        var columns = element.split(",");
        var year = columns[0];
        xs.push(year);     //we're pushing each year into the array of xlabels and then plotting it on the x-axis.
        var temperature = columns[1];
        ys.push(Number(temperature) + 14);  //here the 14 deg Celsius s the global mean from 1951 to 1980ish.   
        //we're pushing each year into the array of xlabels and then plotting it on the x-axis.
        var nHemp = columns[2];
        ns.push(Number(nHemp) + 14);
        var sHemp = columns[3];
        ss.push(Number(sHemp) + 14);
        console.log(year + "\t" + temperature + "    " + nHemp + "    " + sHemp);
    });
    return {xs, ys, ns, ss};
}