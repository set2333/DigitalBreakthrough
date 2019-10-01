function get_cookie(cookie_name) {
    var results = document.cookie.match('(^|;) ?' + cookie_name + '=([^;]*)(;|$)');

    if (results)
        return (unescape(results[2]));
    else
        return null;
}

function getAuth(url = '', data = {}) {
    return fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                //                'Content-Type': 'application/json',
                'Content-Type': 'application/json;charset=utf-8',
            },
            redirect: 'follow',
            referrer: 'no-referrer',
            body: JSON.stringify(data)


        })
        //        .then(response => response.text());
        .then(response => response.json());
}

function login() {
    //    document.location.href = 'custumer.html';
    let loginName = document.getElementById('loginInput');
    let logPassword = document.getElementById('passwordInput');

    getAuth('http://localhost/1C_Base/hs/login', {
            name: loginName.value,
            password: logPassword.value
        })
        .then(data => {
            console.log(data);
            if (data.name != 'NO-LOGIN') {
                document.cookie = 'login=' + document.getElementById('loginInput').value + ';';
                document.cookie = 'password=' + document.getElementById('passwordInput').value + ';';
                document.location.href = 'custumer.html';
            }

        })
        .catch(error => console.error('ОшибкА' + error));
}

function getData(url = 'http://localhost/1C_Base/hs/api') {
    data = {
        name: get_cookie("login"),
        password: get_cookie("password"),
        api: "user_data"
    }
    return fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                //                'Content-Type': 'application/json',
                'Content-Type': 'application/json;charset=utf-8',
            },
            redirect: 'follow',
            referrer: 'no-referrer',
            body: JSON.stringify(data)


        })
        //        .then(response => response.text());
        .then(response => response.json());

}

function getAll() {
    getData().then(data => {
            for (let key in data) {
                let elem = document.getElementById(key);
                if (key == "OpitRaboty") {
                    for (el of data[key]) {
                        div_opyt = document.getElementById('div_opyt');

                        el_div_horizontDiv = document.createElement('div');
                        el_div_horizontDiv.classList.add('dataDiv');
                        el_div_horizontDiv.classList.add('dataDivFirst');
                        p = document.createElement('p');
                        p.innerHTML = el.FirstData + ' - ' + el.EndData;
                        el_div_horizontDiv.appendChild(p);
                        div_opyt.appendChild(el_div_horizontDiv);

                        el_div_horizontDiv = document.createElement('div');
                        el_div_horizontDiv.classList.add('dataDiv');
                        p = document.createElement('p');
                        p.classList.add('body_p');
                        p.innerHTML = el.Rabotodatel;
                        el_div_horizontDiv.appendChild(p);
                        p = document.createElement('p');
                        p.classList.add('body_p');
                        p.innerHTML = el.Doljnost;
                        el_div_horizontDiv.appendChild(p);
                        p = document.createElement('p');
                        p.classList.add('body_p');
                        p.innerHTML = el.WorkName;
                        el_div_horizontDiv.appendChild(p);
                        div_opyt.appendChild(el_div_horizontDiv);
                    }
                }
                if (key == "kompetencii") {
                    elem_ul = document.getElementById('ul_komp');
                    for (let el of data[key]) {
                        console.log(el);
                        li = document.createElement('li');
                        li.appendChild(document.createTextNode(el));
                        elem_ul.appendChild(li);
                    }

                }
                if (key == "obrazov") {
                    div_obraz = document.getElementById('id_obraz');
                    for (let el of data[key]) {
                        el_div = document.createElement('div');
                        el_div.classList.add('dataDiv');
                        el_div.classList.add('dataDivFirst');
                        p = document.createElement('p');
                        p.classList.add('body_p');
                        p.innerHTML = el.Date;
                        el_div.appendChild(p);
                        div_obraz.appendChild(el_div);

                        el_div = document.createElement('div');
                        el_div.classList.add('dataDiv');
                        p = document.createElement('p');
                        p.classList.add('body_p');
                        p.innerHTML = el.UZ;
                        el_div.appendChild(p);
                        div_obraz.appendChild(el_div);

                    }
                }
                if (key == "kursy") {
                    div_kursy = document.getElementById('id_kursy');
                    for (let el of data[key]) {
                        el_div = document.createElement('div');
                        el_div.classList.add('dataDiv');
                        el_div.classList.add('dataDivFirst');
                        p = document.createElement('p');
                        p.classList.add('body_p');
                        p.innerHTML = el.Date;
                        el_div.appendChild(p);
                        div_kursy.appendChild(el_div);

                        el_div = document.createElement('div');
                        el_div.classList.add('dataDiv');
                        p = document.createElement('p');
                        p.classList.add('body_p');
                        p.innerHTML = el.UZ;
                        el_div.appendChild(p);
                        div_kursy.appendChild(el_div);

                    }
                }
                if (key == "photo") {
                    let img = document.getElementById('photo');
                    img.src = data[key];
                }
                if (elem !== null) {
                    elem.innerHTML = data[key];
                }
            }
        })
        .catch(error => console.error('ОшибкА' + error));
}

function getUserUp() {
    getUserUp1C().then(data => {
            console.log(data);
            for (let key in data) {
                let elem = document.getElementById(key);
                if (key == "c_comp_list") {
                    div_kursy = document.getElementById('div_course');
                    for (let el of data[key]) {
                        el_div = document.createElement('div');
                        el_div.classList.add('dataDiv');
                        el_div.classList.add('dataDivFirst');
                        p = document.createElement('h6');
                        p.classList.add('body_p');
                        p.innerHTML = el.c_comp;
                        el_div.appendChild(p);
                        div_kursy.appendChild(el_div);

                        el_div = document.createElement('div');
                        el_div.classList.add('dataDiv');
                        p = document.createElement('p');
                        p.classList.add('body_p');
                        p.innerHTML = el.c_comp_decr;
                        el_div.appendChild(p);
                        div_kursy.appendChild(el_div);

                    }
                }
                if (elem != null) {
                    elem.innerHTML = data[key];
                }
            }
        })
        .catch(error => console.error('ОшибкА' + error));
}

function getUserUp1C(url = 'http://localhost/1C_Base/hs/api') {
    data = {
        name: get_cookie("login"),
        password: get_cookie("password"),
        api: "user_up"
    }
    return fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                //                'Content-Type': 'application/json',
                'Content-Type': 'application/json;charset=utf-8',
            },
            redirect: 'follow',
            referrer: 'no-referrer',
            body: JSON.stringify(data)


        })
        //        .then(response => response.text());
        .then(response => response.json());
}

function getTest() {
    getTest1C().then(data => {
            console.log(data);
            for (let key of data) {
                div_test = document.getElementById('div_test');
                el_div = document.createElement('div');
                el_div.classList.add('dataDiv');
                el_div.classList.add('dataDivFirst');
                p = document.createElement('p');
                p.classList.add('body_p');
                p.addEventListener('click', clickTestName.bind(this, key.test_code));
                p.innerHTML = key.test_name;
                el_div.appendChild(p);
                div_test.appendChild(p);
            }
        })
        .catch(error => console.error('ОшибкА' + error));
}

function getTest1C(url = 'http://localhost/1C_Base/hs/api') {
    data = {
        name: get_cookie("login"),
        password: get_cookie("password"),
        api: "get_all_tests",
        code_test: "null"
    }
    return fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            redirect: 'follow',
            referrer: 'no-referrer',
            body: JSON.stringify(data)
        })
        .then(response => response.json());
}

function clickTestName(code_test) {
    document.cookie = 'code_test=' + code_test + ';';
    document.location.href = 'test.html';

}

var numberTest;
var jdata;

function getNext() {
    div_q = document.getElementById('div_q');
    div_q.innerHTML = '';
    p = document.createElement('p');
    p.innerHTML = jdata.otv[numberTest].q_text;
    p.classList.add('body_p');
    div_q.appendChild(p);
    sele = document.createElement('select');
    for (let key of jdata.otv[numberTest].otv_list) {
        opt = document.createElement('option');
        opt.innerHTML = key.o_text;
        sele.appendChild(opt);
    }
    div_q.appendChild(sele);
    btn = document.createElement('input');
    btn.type = "button";
    btn.value = 'Ответить';
    btn.classList.add('btn_test');
    btn.onclick = getNext;
    div_q.appendChild(btn);
    numberTest++;
    if (numberTest >= jdata.otv.length) {
        div_q.innerHTML = '';
        p = document.createElement('p');
        p.innerHTML = 'Тестирование закончено';
        p.classList.add('body_p');
        div_q.appendChild(p);
    }
}

function getTestByCode(code_test) {
    getTestByCode1C(code_test).then(data => {
            jdata = data;
            console.log(jdata);
            div_test = document.getElementById('div_test');
            el_h = document.getElementById('h_q');
            el_h.innerHTML = jdata.test.t_name;
            
            numberTest = 0;
            getNext();
        })
        .catch(error => console.error('ОшибкА' + error));
}

function getTestByCode1C(code_test, url = 'http://localhost/1C_Base/hs/apiTest') {

    data = {
        name: get_cookie("login"),
        password: get_cookie("password"),
        api: "get_test_by_number",
        code_test: code_test
    }
    return fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            redirect: 'follow',
            referrer: 'no-referrer',
            body: JSON.stringify(data)
        })
        .then(response => response.json());
}
