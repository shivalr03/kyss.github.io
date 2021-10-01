
const button = document.querySelector('#submitGstin');
let validateNumber = () => {
    let gstn = document.querySelector('#inputGstinOne').value;
    // debugger;
    document.querySelector('#inputGstinOne').classList.remove("error");
    if (gstn.length == 0 || gstn ==""){
// console.log(gstn.length);
document.querySelector('#inputGstinOne').focus();
// document.querySelector('#inputGstinOne').classList.add("error");
document.querySelector('#existUser').innerHTML = "Please enter GSTIN number";
setTimeout(function(){
  document.getElementById("existUser").innerHTML = '';
}, 3000);
document.querySelector('#inputGstinOne').value = "";
console.log('empty')
return false;
}
else if(gstn.length <= 14){
    console.log(gstn.length);
    document.querySelector('#inputGstinOne').classList.add("error");
    return false;
}
else{
    // debugger;
    fetch('https://qa-backend.jitfin.co/api/anchor/find?gstin=' + gstn,{
    method: 'GET'
})
.then(res => {
    if(res.ok){
        // debugger;
       return res.json()
        console.log('success');
    }
    else{
      debugger;
      document.querySelector('#existUser').innerHTML = "Enter correct GSTIN number";
        setTimeout(function(){
            document.getElementById("existUser").innerHTML = '';
        }, 3000);
        document.querySelector('#inputGstinOne').value = "";
        document.querySelector('#inputGstinOne').focus();
        console.log('Not success');
        return false;
        
    }
})
.then(data => {
    // debugger;
    console.log(data);
    let dataValidate = data.message;
    // console.log(dataValidate);
    if(dataValidate.includes("exists")){
      // debugger;
        console.log("already exists user");
        // let exsistuser = document.querySelector('#exsistuser');
        // let msg ="User already exists";
        document.querySelector('#existUser').innerHTML = "User already exists";
        setTimeout(function(){
            document.getElementById("existUser").innerHTML = '';
        }, 3000);
        document.querySelector('#inputGstinOne').value = "";
        document.querySelector('#inputGstinOne').focus();
        return false;
    }
    else
    {
        tradeName = data.tradeName;
    gstnNumber = gstn;
    console.log(tradeName);
    
    localStorage.setItem("tradeName", tradeName);
    localStorage.setItem("gstnNumber", gstnNumber);
    window.location.href = "/register.html";
    }
}
)
    console.log('valid');
    return true;
}
}
button.addEventListener('click', validateNumber);