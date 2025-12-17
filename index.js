let addUserFormEl = document.getElementById("addUserForm");
let nameEl = document.getElementById("name");
let nameErrMsgEl = document.getElementById("nameErrMsg");
let emailEl = document.getElementById("email");
let emailErrMsgEl = document.getElementById("emailErrMsg");
let statusEl = document.getElementById("status");
let genderMaleEl = document.getElementById("genderMale");
let genderFemaleEl = document.getElementById("genderFemale");
let submitBtnEl = document.getElementById("submitBtn");

let nameValue = "";
let emailValue = "";

let formData = {
    name: nameValue,
    email: emailValue,
    workingStatus: "Active",
    gender: "Male"
};

statusEl.addEventListener("change", function(event) {
    formData.workingStatus = event.target.value;
});

genderMaleEl.addEventListener("change", function(event) {
    formData.gender = event.target.value;
});

genderFemaleEl.addEventListener("change", function(event) {
    formData.gender = event.target.value;
});

nameEl.addEventListener("change", function(event) {
    formData.name = event.target.value;
});

emailEl.addEventListener("change", function(event) {
    formData.email = event.target.value;
})


function validateForm() {
    nameValue = formData.name;
    emailValue = formData.email;
    if (nameValue === "") {
        nameErrMsgEl.classList.add("name-err-msg");
        nameErrMsgEl.textContent = "Required*";

    } else {
        nameErrMsgEl.textContent = "";
    }

    if (emailValue === "") {
        emailErrMsgEl.classList.add("name-err-msg");
        emailErrMsgEl.textContent = "Required*";

    } else {
        emailErrMsgEl.textContent = "";
    }

}

function submitForm() {
    let option = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer 3671d724efb6918d6cc1a296391e3d8d841da4c6efc0866bd71fa64ef8923a76"
        },
        body: JSON.stringify(formData)
    };

    let url = "https://gorest.co.in/public-api/users";

    fetch(url, option)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            console.log(jsonData);
            if (jsonData.code === 422) {
                if (jsonData.data[0].message === "has already been taken") {
                    emailErrMsgEl.textContent = "Email Already Exists";
                }
            }
        });
}


addUserFormEl.addEventListener("submit", function(event) {
    event.preventDefault();
    validateForm();
    submitForm();
});