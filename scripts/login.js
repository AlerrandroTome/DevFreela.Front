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
        Swal.Fire('Oops!', "You have to mark a role", 'error');
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
        Swal.fire({
            title: "Well done!",
            text: "You've created a new user.",
            icon: "success",
            confirmButtonText: "Ok!"
        }).then((result => 
            {
                if(result.isConfirmed) {
                    localStorage.setItem("userName", response.fullName);
                    localStorage.setItem("role", response.role === "dev" ? "Desenvolvedor" : "Cliente");
                    localStorage.setItem("idClient", response.id);
                    
                    window.location.href = "list.html";
                }
        }));
    })
    /* 
    // IF YOU WANT TO TREAT THE ERRORS
        .catch(error => {
            alert();
        })
    */
    ;
}