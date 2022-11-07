function CreateRequest() {
    var Request = false;

    if (window.XMLHttpRequest){
        Request = new XMLHttpRequest();
    }
    else if (window.ActiveXObject){
        try {
            Request = new ActiveXObject('Microsoft.XMLHTTP');
        }
        catch (CatchException) {
            Request = new ActiveXObject('Msxml2.MXLHTTP');
        }
    }

    if (!Request) {
        alert('Impossible to request!');
    }

    return Request;
}

function SendRequest(r_method, r_path, r_args, r_handler) {
    var Request = CreateRequest();

    if (!Request) {
        return;
    }

    /*
    Request 4 states:
    0 - Объект не инициализирован
    1 - Объект загружает данные
    2 - Объект загрузил свои данные
    3 - Ответ от сервера загружается, но может взаимодействовать
        с пользователем
    4 - Объект полностью инициализирован, получен ответ от сервера
     */

    Request.onreadystatechange = function() { // Вызывается когда статус 4
        if (Request.readyState === 4) {
            if (Request.status === 200) {
                r_handler(Request);
            }
            else {
                alert('This is some issues on the server');
            }
        }
        else {
            // downloading animation
        }
    }

    if (r_method.toLowerCase() === 'get' && r_args.length > 0) {
        r_path += '?' + r_args;
    }

    // Request.open(method, url, async(bool), username, password)
    Request.open(r_method, r_path);

    if (r_method.toLowerCase() === 'post') {
        Request.setRequestHeader('Content-Type',
                                'application/x-www-form-urlencoded; charset=utf-8');
        Request.send(r_args);
    }
    else {
        Request.send();
    }
}

function ReadFile(filename, container_id) {
    var Handler = function(Request) {
        document.getElementById(container_id).innerHTML = Request.responseText;
    }

    SendRequest('GET', filename, '', Handler);
}
