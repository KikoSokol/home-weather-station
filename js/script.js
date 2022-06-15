let teplotaGauge = new LinearGauge({
    renderTo: 'teplotaGauge'
}).draw();

let svietivostDisplay = new SegmentDisplay("svietivostGauge");
svietivostDisplay.pattern         = "###";
svietivostDisplay.displayAngle    = 6;
svietivostDisplay.digitHeight     = 20;
svietivostDisplay.digitWidth      = 14;
svietivostDisplay.digitDistance   = 2.5;
svietivostDisplay.segmentWidth    = 2;
svietivostDisplay.segmentDistance = 0.3;
svietivostDisplay.segmentCount    = 7;
svietivostDisplay.cornerType      = 3;
svietivostDisplay.colorOn         = "#24dd22";
svietivostDisplay.colorOff        = "#322f2f";
svietivostDisplay.draw();



let vlhkostGauge = new RadialGauge({
    renderTo: 'vlhkostGouge',
    width: 400,
    height: 200,
    animation: true,
    value: 0,
    minValue: 0,
    maxValue: 100,
    majorTicks: [
        '0','20','40','60','80','100'],
}).draw();


let firebaseConfig = {
    apiKey: "AIzaSyB7wSUXksTZJlLbMQ_aGVoO4ufxq3yMsHQ",
    authDomain: "tina-cb6a9.firebaseapp.com",
    databaseURL: "https://tina-cb6a9-default-rtdb.firebaseio.com",
    projectId: "tina-cb6a9",
    storageBucket: "tina-cb6a9.appspot.com",
    messagingSenderId: "620399467015",
    appId: "1:620399467015:web:4ebc83cfb1f9160bc228a2",
    measurementId: "G-9L0084K4LC"
};

firebase.initializeApp(firebaseConfig);

// let phpData = null;
setInterval(function(){
    firebase.database().ref('realtime').on('value', function (snapshot){
        vlhkostGauge.value = parseFloat(snapshot.val().vlhkost)
        vlhkostGauge.draw();
        svietivostDisplay.setValue(snapshot.val().svietivost.toString());
        teplotaGauge.value = parseFloat(snapshot.val().teplota);
        teplotaGauge.draw();


    });

    const url = "apiMySql.php?operation=getPosledneMeranie";
    const request = new Request(url, {
        method:'POST'
    });

    fetch(request)
        .then(request => request.json())
        .then(data =>
        {

            Plotly.extendTraces('grafSvietivost', {
                    x: [[data.meranie.cas]],
                    y: [[data.meranie.svietivost]]
                }, [0]);

            Plotly.extendTraces('grafVlhkost', {
                    x: [[data.meranie.cas]],
                    y: [[data.meranie.vlhkost]]
                }, [0]);

            Plotly.extendTraces('grafTeplota', {
                    x: [[data.meranie.cas]],
                    y: [[data.meranie.teplota]]
                }, [0]);
        });

}, 300);





let dataSvietivost = {
    x: [],
    y: [],
    mode: 'lines+markers',
    type: 'scatter',
    name: 'Svietivosť',
    line: {
        color: '#0022ff',
        width: 3
    }
};

let dataVlhkost = {
    x: [],
    y: [],
    mode: 'lines+markers',
    type: 'scatter',
    name: 'Vlhkosť',
    line: {
        color: '#0022ff',
        width: 3
    }
};

let dataTeplota = {
    x: [],
    y: [],
    // mode: 'lines+markers',
    type: 'scatter',
    name: 'Teplota',
    line: {
        color: '#0022ff',
        width: 3
    }
};

let layoutVlhkost = {
    showlegend: true,
    shapes: [{
        'type': 'line',
        'x0': "2021-02-27 18:00:56",
        'y0': 0,
        'x1': "2021-02-27 18:00:56",
        'y1': 20,
        'line': {
            'color': 'red',
            'width': 3,
        }},],
};


let layoutTeplota = {
    showlegend: true,
    shapes: [{
        'type': 'line',
        'x0': "2021-02-27 18:00:56",
        'y0': 0,
        'x1': "2021-02-27 18:00:56",
        'y1': 20,
        'line': {
            'color': 'red',
            'width': 3,
        }},],
};



let layoutSvietivost = {
    showlegend: true,
    shapes: [{
        'type': 'line',
        'x0': "2021-02-27 18:00:56",
        'y0': 0,
        'x1': "2021-02-27 18:00:56",
        'y1': 20,
        'line': {
            'color': 'red',
            'width': 3,
        }},],
};

let config = {responsive: true,
            editable:true};


function setSvietivostCords()
{
    let x0 = document.getElementById("svietivostX0");
    x0.innerHTML = layoutSvietivost["shapes"][0]["x0"];

    let y0 = document.getElementById("svietivostY0");
    y0.innerHTML = layoutSvietivost["shapes"][0]["y0"];

    let x1 = document.getElementById("svietivostX1");
    x1.innerHTML = layoutSvietivost["shapes"][0]["x1"];

    let y1 = document.getElementById("svietivostY1");
    y1.innerHTML = layoutSvietivost["shapes"][0]["y1"];

}

function setVlhkostCords()
{
    let x0 = document.getElementById("vlhkostX0");
    x0.innerHTML = layoutVlhkost["shapes"][0]["x0"];

    let y0 = document.getElementById("vlhkostY0");
    y0.innerHTML = layoutVlhkost["shapes"][0]["y0"];

    let x1 = document.getElementById("vlhkostX1");
    x1.innerHTML = layoutVlhkost["shapes"][0]["x1"];

    let y1 = document.getElementById("vlhkostY1");
    y1.innerHTML = layoutVlhkost["shapes"][0]["y1"];

}

function setTeplotaCords()
{
    let x0 = document.getElementById("teplotaX0");
    x0.innerHTML = layoutTeplota["shapes"][0]["x0"];

    let y0 = document.getElementById("teplotaY0");
    y0.innerHTML = layoutTeplota["shapes"][0]["y0"];

    let x1 = document.getElementById("teplotaX1");
    x1.innerHTML = layoutTeplota["shapes"][0]["x1"];

    let y1 = document.getElementById("teplotaY1");
    y1.innerHTML = layoutTeplota["shapes"][0]["y1"];

}



function nastav()
{
    getInsertToDb();
    getMeraniaSvietivost();
}

let svietivostGraf = document.getElementById("grafSvietivost");
let vlhkostGraf = document.getElementById("grafVlhkost");
let teplotaGraf = document.getElementById("grafTeplota");


function getMeraniaSvietivost()
{

    const url = "apiMySql.php?operation=getMerania";
    const request = new Request(url, {
        method:'POST'
    });

    fetch(request)
        .then(request => request.json())
        .then(data =>
        {

            let cas = data.map(value => value.cas);

            dataSvietivost.x = cas;
            dataSvietivost.y = data.map(value => value.svietivost);
            let svietivost = [dataSvietivost];
            layoutSvietivost.shapes[0].x0 = dataSvietivost.x[0];
            layoutSvietivost.shapes[0].y0 = dataSvietivost.y[0];
            layoutSvietivost.shapes[0].x1 = dataSvietivost.x[dataSvietivost.x.length-1];
            layoutSvietivost.shapes[0].y1 = dataSvietivost.y[0];
            Plotly.newPlot('grafSvietivost', svietivost,layoutSvietivost,config);
            setSvietivostCords();
            svietivostGraf.on('plotly_relayout',function (data){
                setSvietivostCords();
            });

            dataVlhkost.x = cas;
            dataVlhkost.y = data.map(value => value.vlhkost);
            let vlhkost = [dataVlhkost];
            layoutVlhkost.shapes[0].x0 = dataVlhkost.x[0];
            layoutVlhkost.shapes[0].y0 = dataVlhkost.y[0];
            layoutVlhkost.shapes[0].x1 = dataVlhkost.x[dataVlhkost.x.length-1];
            layoutVlhkost.shapes[0].y1 = dataVlhkost.y[0];
            Plotly.newPlot('grafVlhkost', vlhkost,layoutVlhkost,config);
            setVlhkostCords();
            vlhkostGraf.on('plotly_relayout',function (data){
                setVlhkostCords();
            });

            dataTeplota.x = cas;
            dataTeplota.y = data.map(value => value.teplota);
            let teplota = [dataTeplota];
            layoutTeplota.shapes[0].x0 = dataTeplota.x[0];
            layoutTeplota.shapes[0].y0 = dataTeplota.y[0];
            layoutTeplota.shapes[0].x1 = dataTeplota.x[dataTeplota.x.length-1];
            layoutTeplota.shapes[0].y1 = dataTeplota.y[0];
            Plotly.newPlot('grafTeplota', teplota,layoutTeplota,config);
            setTeplotaCords();
            teplotaGraf.on('plotly_relayout',function (data){
                setTeplotaCords();
            });

        });

}


function setCordsInModal(layout)
{
    let x0 = document.getElementById("modalX0");
    x0.innerHTML = layout["shapes"][0]["x0"];

    let y0 = document.getElementById("modalY0");
    y0.innerHTML = layout["shapes"][0]["y0"];

    let x1 = document.getElementById("modalX1");
    x1.innerHTML = layout["shapes"][0]["x1"];

    let y1 = document.getElementById("modalY1");
    y1.innerHTML = layout["shapes"][0]["y1"];
}

function changeCordsInModal(graf, layout)
{
    graf.on('plotly_relayout',function (data){
        setCordsInModal(layout);
    });
}

function showGrafModal(grafId)
{
    let modal = document.getElementById("grafModal");
    modal.classList.remove("grafModalHidden");
    modal.classList.add("grafModalShow");
    let grafInModal = document.getElementById("grafInModal");

    console.log(grafId);

    if(grafId === 'grafSvietivost')
    {
        let values = [dataSvietivost];
        Plotly.newPlot('grafInModal', values,layoutSvietivost,config);
        setCordsInModal(layoutSvietivost);
        changeCordsInModal(grafInModal,layoutSvietivost);

    }
    else if(grafId === 'grafVlhkost')
    {
        let values = [dataVlhkost];
        Plotly.newPlot('grafInModal', values,layoutVlhkost,config);
        setCordsInModal(layoutVlhkost);
        changeCordsInModal(grafInModal,layoutVlhkost);
    }
    else if(grafId === 'grafTeplota')
    {
        let values = [dataTeplota];
        Plotly.newPlot('grafInModal', values,layoutTeplota,config);
        setCordsInModal(layoutTeplota);
        changeCordsInModal(grafInModal,layoutTeplota);
    }
}

function closeGrafModal()
{
    let modal = document.getElementById("grafModal");
    modal.classList.remove("grafModalShow");
    modal.classList.add("grafModalHidden");

    setSvietivostCords();
    setVlhkostCords();
    setTeplotaCords();
}




function changeSetButton(set)
{
    let setButton = document.getElementById("setButton");

    if(set === 0)
    {
        setButton.classList.remove("btn-danger");
        setButton.classList.add("btn-success");
        setButton.innerText = "Zapni ukladanie dát do databázy";
    }
    else if(set === 1)
    {
        setButton.classList.remove("btn-success");
        setButton.classList.add("btn-danger");
        setButton.innerText = "Vypni ukladanie dát do databázy";
    }
}

let isInsertEnabled;
function getInsertToDb()
{

    const url = "apiMySql.php?operation=getInsertToDb";
    const request = new Request(url, {
        method:'POST'
    });

    fetch(request)
        .then(request => request.json())
        .then(data =>
        {
            isInsertEnabled = parseInt(data);
            changeSetButton(parseInt(data));
        });
    return isInsertEnabled;
}

function setInsertToDb()
{
    let set = getInsertToDb();


    if(set === 1)
        set = 0
    else
        set = 1;




    const url = "apiMySql.php?operation=setInsertToDb";
    const request = new Request(url, {
        method:'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({set:set})
    });

    fetch(request)
        .then(request => request.json())
        .then(data =>
        {
            changeSetButton(parseInt(data));
            getInsertToDb();
        });
}
