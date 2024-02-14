function checkIfAnyRoleIsChecked()
{
    let list = document.getElementsByName("role");
    let counter = 0;

    for(let radioButton of list)
    {
        if(radioButton.checked === false) 
        {
            counter++;
        }
    }

    return counter !== list.length;
} 

function saveUser() {
    
    if(!checkIfAnyRoleIsChecked())
    {
        alert('Marque alguma role!');
        return;
    }

    let payload = 
    {
        role: document.getElementsByName("role")[0].checked === true ? 'dev' : 'cliente',
        fullName: document.querySelector("#fullName").value,
        birthDate: document.querySelector("#birthDate").value,
        email: document.querySelector("#email").value,
        password: document.querySelector("#password").value
    };

    fetch("https://65cc2ad5dd519126b83e1754.mockapi.io/api/users", 
    {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(response => {
        alert('Cadastrado com sucesso!');
        
    })
    /* 
    // IF YOU WANT TO TREAT THE ERRORS
        .catch(error => {
            alert();
        })
    */
    ;
}