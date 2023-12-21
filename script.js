let url = "https://docs.google.com/forms/u/1/d/e/1FAIpQLSc8jfU3MNnyU3gRC6ONjaVGMCuhbI5DiinsdIllkn1MJ9IRww/formResponse";
let form = document.querySelector("#contact_form");

form.addEventListener("submit", e=>{
    e.preventDefault();
    fetch(url,{
        method: "POST",
        mode: "no-cors",
        header:{"Content-Type": "application/json"},
        body: getInputData()
    })
    .then(data=>{
        document.querySelector("#name").value = "";
        document.querySelector("#email").value = "";
        document.querySelector("#company").value = "";
        document.querySelector("#sponsorship").checked = false;
        document.querySelector("#collaboration").checked = false;
        document.querySelector("#other").checked = false;
        document.querySelector("#message").value = "";
        document.querySelector("#submit").value = "Thank you!";
    })
    .catch(err=>console.error(err));
    return false;
}, {capture:true, passive:false});

function getInputData(){
    let dataToPost = new FormData();
    dataToPost.append("entry.2077106070", document.querySelector("#name").value);
    dataToPost.append("entry.1365988357", document.querySelector("#email").value);
    dataToPost.append("entry.1682409040", document.querySelector("#company").value);
    if (document.querySelector("#sponsorship").checked){
        dataToPost.append("entry.23716341", document.querySelector("#sponsorship").value);
    }
    if (document.querySelector("#collaboration").checked){
        dataToPost.append("entry.23716341", document.querySelector("#collaboration").value);
    }
    if (document.querySelector("#other").checked){
        dataToPost.append("entry.23716341", document.querySelector("#other").value);
    }
    dataToPost.append("entry.452092947", document.querySelector("#message").value);
    return dataToPost;
}