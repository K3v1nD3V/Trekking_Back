const PERMISOS_URL = 'http://localhost:3000/api/permisos';
const AGENDA_GUIA_URL = 'http://localhost:3000/api/agenda_guia';

const list = async(url) => {
    try {
        return fetch(url, {
            method: 'GET',
            mode: 'cors',
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then(res => res.json())
        .then(data => {            
            return data
        })
    } catch (error) {
        console.log('List error: ', error);
        return []   
    }
}
const create = async (url, obj) => {    
    try {
        return fetch(url, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(obj),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then((resp) => resp.json())
        .then(json => {
            alert(json.msg) 
        })
    } catch (error) {
        
    }
}
const get = async (url, id) => {
    try {
        return fetch(`${url}/${id}`,{
            method: 'GET',
            mode: 'cors',
            headers: {"Content-type": "application/json; charset=UTF-8"},
        })
        .then(res => res.json())
        .then(data => {
            return data
        })
    } catch (error) {
        console.log(error);
    }
}
const updated = async (url, id, obj) => {
    try {
        return fetch(`${url}/${id}`, { 
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify(obj),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then((resp) => resp.json())
        .then(json => {
            alert(json.msg) 
        })
    } catch (error) {
        console.log(error);
    }
}
const del = async (url, id) => {
    try {
        await fetch(`${url}/${id}`, {
            method: 'DELETE',
            mode: 'cors',
            headers: {"Content-type": "application/json; charset=UTF-8"}
        });
        alert('Permiso eliminado con éxito');
        location.reload();
    } catch (error) {
        console.log(error);
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    const id = new URLSearchParams(window.location.search).urlParams.get('id');

    const formButtonPermisos = document.querySelector('#btn-form-permisos')
    const formButtonAgenda_guia = document.querySelector('#btn-form-agenda_guia')
    
    if (formButtonPermisos || formButtonAgenda_guia) {
        if (formButtonPermisos) {
            handlePermisosButton(id, formButtonPermisos);
        } else if (formButtonAgenda_guia) {
            handleAgendaGuiaButton(id, formButtonAgenda_guia);
        }
    }
});
function handlePermisosButton(id, formButtonPermisos) {
    if (id) {
        fillForm(id);
        formButtonPermisos.addEventListener('click', async (e) => {
            e.preventDefault();
            const permiso = formDataToObject();
            updated(PERMISOS_URL, id, permiso);
            window.location.href = 'permisos.html';
        });
    } else {
        formButtonPermisos.addEventListener('click', async (e) => {
            e.preventDefault();
            const permiso = formDataToObject();
            create(PERMISOS_URL, permiso);
            window.location.href = 'permisos.html';
        });
    }
}
function handleAgendaGuiaButton(id, formButtonAgenda_guia) {
    if (id) {
        fillForm(id);
        formButtonAgenda_guia.addEventListener('click', async (e) => {
            e.preventDefault();
            const agenda = formDataToObject();
            updated(AGENDA_GUIA_URL, id, agenda);
            window.location.href = 'agenda_guia.html';
        });
    } else {
        formButtonAgenda_guia.addEventListener('click', async (e) => {
            e.preventDefault();
            const agenda = formDataToObject();
            create(AGENDA_GUIA_URL, agenda);
            window.location.href = 'agenda_guia.html';
        });
    }
}
// UTILIDADES
const renderList = async(url) => {
    const data = await list(url);
    const tbody = document.querySelector('tbody.containt')

    const urlParts = url.split('/');
    const lastPart = urlParts[urlParts.length - 1];
    const capitalizedLastPart = lastPart.charAt(0).toUpperCase() + lastPart.slice(1);
    
    
    tbody.innerHTML = ''; 

    data.forEach(registro => {
        const keys = Object.keys(registro).slice(1, -1)
        const rowHTML = `
            <tr>
                ${
                    keys.map(key =>`<td>${registro[key]}</td>`).join('')
                }
                <td>
                    <button onclick="edit('${registro._id}','${capitalizedLastPart}')" type="button" class="btn btn-primary btn-sm">Editar</button>
                    <button onclick="del('${url}','${registro._id}')" type="button" class="btn btn-danger btn-sm">Eliminar</button>
                </td>
            </tr>
            `;
            tbody.innerHTML += rowHTML;
        }
    )   
}
function edit(id, type) {
    const url = `form${type}.html?id=${id}&form=${type.toLowerCase()}`;
    window.location.href = url;
}
async function fillForm(id) {
    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get('form');
    
    
    const data = await get(`http://localhost:3000/api/${type}`, id)
    const keys = Object.keys(data)

    keys.forEach(key => {
        let element = document.querySelector(`#${key}`)
        if (element) {
            let value = data[key];
            if (value instanceof Date || /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(value)) {
                value = value.replace(/T.*$/, '').replace(/-/g, '-');
            }
            element.value = value;
        }
    });
}
const formDataToObject = () => {
    const formData = {};
    const formElements = document.querySelectorAll('form input');
  
    formElements.forEach((element) => {
      formData[element.id] = element.value;
    });
  
    return formData;
};
