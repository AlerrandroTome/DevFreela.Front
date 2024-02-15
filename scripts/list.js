let list = [];

window.onload = function() 
{
    document.querySelector("#name").innerText = localStorage.getItem("userName");
    document.querySelector("#role").innerText = localStorage.getItem("role");

    getProjects();
}

function getProjects()
{
    
    fetch("https://65cc2ad5dd519126b83e1754.mockapi.io/api/projects")
    .then(response => response.json())
    .then(response => {
        list = response;
        buildTable();
    })
    /* 
    // IF YOU WANT TO TREAT THE ERRORS
        .catch(error => {
            alert();
        })
    */
    ;
}

function goToEdit(id)
{
    window.location.href = `project-create-edit.html?id=${id}`;
}

function deleteProject(id)
{
    fetch(`https://65cc2ad5dd519126b83e1754.mockapi.io/api/projects/${id}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(response => {
        list = list.filter(project => project.id !== response.id);
        buildTable();
    });
}

function buildTable()
{
    document.querySelector("#table-body").innerHTML = '';
    const idClient = localStorage.getItem('idClient');
    list = list.filter(element => element.idClient == idClient);

    list.forEach(element => {
        let template = `<div class="row">
                            <div class="title-description">
                                <h6 class="title">${element.title}</h6>
                                <p class="description">${element.description}</p>
                            </div>
                            <div class="price">R$ ${element.totalCost}</div>
                            <div class="actions">
                                <span class="edit material-icons" onClick="goToEdit(${element.id})">edit</span>
                                <span class="delete material-icons" onClick="deleteProject(${element.id})">delete_outlined</span>
                            </div>
                        </div>`;
        document.querySelector("#table-body").insertAdjacentHTML("beforeend", template);
    });
}