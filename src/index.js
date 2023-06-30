let id;

document.addEventListener('DOMContentLoaded', () => {
    processData();
        const form1 = document.getElementById('dog-form');
        form1.addEventListener('submit', (e)=>{
        e.preventDefault();
        const name = document.getElementsByName("name")[0].value || document.getElementsByName("name")[0].placeholder;
        const breed = document.getElementsByName("breed")[0].value || document.getElementsByName("breed")[0].placeholder;
        const sex = document.getElementsByName("sex")[0].value || document.getElementsByName("sex")[0].placeholder;
        console.log(name)
        data = {
            name: name,
            breed: breed,
            sex: sex
        }
        patchDog(data, id);
    });
});

//const form1 = document.getElementById('dog-form');


function processData(){
    fetch('http://localhost:3000/dogs')
    .then(res => res.json())
    .then(data => accessData(data))
}

function accessData(data){
    data.forEach(dog => {
        displayOnTable(dog);
    });
}

function displayOnTable(dog) {
    const tableBody = document.getElementById('table-body');
    const tableData = document.createElement('tr');
    tableData.className = 'table_data'
    tableData.innerHTML = `
        <td class="${dog.id}">${dog.name}</td>
        <td class="${dog.id}">${dog.breed}</td>
        <td class="${dog.id}">${dog.sex}</td>
        <td><button type="button" id="${dog.id}" onclick="editDog(event)">Edit Dog</button></td>
    `;
    tableBody.appendChild(tableData);
}

function editDog(event) {
    const name = document.getElementsByName("name")[0];
    const breed = document.getElementsByName("breed")[0];
    const sex = document.getElementsByName("sex")[0];
    const details = document.getElementsByClassName(`${event.target.id}`);
    id = event.target.id;

    name.placeholder = details[0].textContent;
    breed.placeholder = details[1].textContent;
    sex.placeholder = details[2].textContent;
}

function patchDog(data, id) {
    fetch(`http://localhost:3000/dogs/${id}`, {
        method:'PATCH',
        headers:{
            'Content-Type': 'application/json',
            'accept': 'application/json',
        },
        body : JSON.stringify(data)
    });
}