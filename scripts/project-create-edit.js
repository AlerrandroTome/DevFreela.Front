// Type: 'create' | 'edit'
let params = Object.fromEntries(new URLSearchParams(window.location.search));
const screenType =  params.id ? 'edit' : 'create';

window.onload = function() 
{
    setScreenType();

    fillInputs();
}

function fillInputs()
{
    if(screenType === 'edit')
    {
        fetch(`https://65cc2ad5dd519126b83e1754.mockapi.io/api/projects/${params.id}`)
        .then(response => response.json())
        .then(response => {
            document.querySelector("#title").value = response.title;
            document.querySelector("#totalCost").value = response.totalCost;
            document.querySelector("#description").value = response.description;
        });
    }
}

function setScreenType() 
{
    // MODO CRIAR
    if(screenType === 'create')
    {
        document.querySelector('#main-title').innerText = "Vamos cadastrar seu novo projeto!";
        document.querySelector('#action-button').innerText = "Cadastrar";
    }
    // MODO EDITAR
    else
    {
        document.querySelector('#main-title').innerText = "Editar projeto";
        document.querySelector('#action-button').innerText = "Salvar";
    }
}

function saveProject()
{
    let payload = 
    {
        title: document.querySelector("#title").value,
        totalCost: document.querySelector("#totalCost").value,
        description: document.querySelector("#description").value,
        idClient: localStorage.getItem('idClient')
    };

    fetch(`https://65cc2ad5dd519126b83e1754.mockapi.io/api/projects${screenType === 'edit' ? `/${params.id}` : ''}`, 
    {
        method: screenType === 'edit' ? 'PUT' : 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(response => {
        if(screenType === 'edit')
        {
            Swal.fire({
                title: "Well done!",
                text: "The project was updated sucessfully!",
                icon: "success",
                confirmButtonText: "Ok!"
            }).then((result => 
                {
                    if(result.isConfirmed) 
                    {
                        window.location.href = "list.html";
                    }
            }));
        }
        else 
        {
            Swal.fire({
                title: "Well done!",
                text: "The project was created sucessfully!",
                icon: "success",
                confirmButtonText: "Ok!"
            }).then((result => 
                {
                    if(result.isConfirmed) 
                    {
                        window.location.href = "list.html";
                    }
            }));
        }
    })
    /* 
    // IF YOU WANT TO TREAT THE ERRORS
        .catch(error => {
            alert();
        })
    */
    ;
}