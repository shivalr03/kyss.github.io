
const buttonZoho = document.querySelector('#submitGstin-1');
let validateNumberZoho = () => {
    let gstn = document.querySelector('#inputGstinTwo').value;
    // debugger;
    document.querySelector('#inputGstinTwo').classList.remove("error");
    if (gstn.length == 0 || gstn ==""){
// console.log(gstn.length);
document.querySelector('#inputGstinTwo').focus();
// document.querySelector('#inputGstinTwo').classList.add("error");
document.querySelector('#existUserZoho').innerHTML = "Please enter GSTIN number";
setTimeout(function(){
  document.getElementById("existUserZoho").innerHTML = '';
}, 3000);
document.querySelector('#inputGstinTwo').value = "";
console.log('empty')
return false;
}
else if(gstn.length <= 14){
    console.log(gstn.length);
    document.querySelector('#inputGstinTwo').classList.add("error");
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
      document.querySelector('#existUserZoho').innerHTML = "Enter correct GSTIN number";
        setTimeout(function(){
            document.getElementById("existUserZoho").innerHTML = '';
        }, 3000);
        document.querySelector('#inputGstinTwo').value = "";
        document.querySelector('#inputGstinTwo').focus();
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
        document.querySelector('#existUserZoho').innerHTML = "User already exists";
        setTimeout(function(){
            document.getElementById("existUserZoho").innerHTML = '';
        }, 3000);
        document.querySelector('#inputGstinTwo').value = "";
        document.querySelector('#inputGstinTwo').focus();
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
buttonZoho.addEventListener('click', validateNumberZoho);