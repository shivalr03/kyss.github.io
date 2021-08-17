// TODO: api request and standards

// https://qa-backend.jitfin.co/api/gst-account/register/kyss
// email: "shivalr03@gmail.com"
// gender: "M"
// isWhatsappOptIn: true
// name: "Shiva Y"
// phone_number: "9620054593"
// registered_gstins: [{gstin: "13AAECP2371C1ZY", is_inactive: false}]

let tradeValue = localStorage.getItem("tradeName");
let gstnNumber = localStorage.getItem("gstnNumber");
document.querySelector('#traderName').defaultValue = tradeValue;
console.log(document.querySelector('#traderName').defaultValue);
// localStorage.clear();
let registerBtn = document.querySelector('#registerBtn');
let registerPost = (e) => {
  e.preventDefault();

let email = document.querySelector('#emailAddress').value;
let name = document.querySelector('#userName').value;
let phone_number = document.querySelector('#contact').value;
let gender = "M"
let isWhatsappOptIn = document.querySelector('#submitCheck:checked');
let is_inactive = document.querySelector('#exampleCheck1:checked');
let gstin = gstnNumber;

if(!is_inactive){
  is_inactive = false;
}else
{
  is_inactive = true;
}
if(!isWhatsappOptIn){
  is_inactive = false;
}else
{
  is_inactive = true;
}

  //TODO:  API request starts here 
  debugger;
fetch('https://qa-backend.jitfin.co/api/gst-account/register/kyss', {
  method:'POST',
  headers:{
    'Content-Type': 'application/json'
  },
  body:JSON.stringify({
    "email": email,
    "gender": gender,
    "isWhatsappOptIn": isWhatsappOptIn,
    "name": name,
    "phone_number": phone_number,
    "registered_gstins": [
        {
            "gstin": gstin, 
            "is_inactive": is_inactive
        }
    ]
  })
}).then(res => {
  console.log('sucess');
  return res.json()
}).then(data => console.log(data))
.catch(error => console.error('ERROR'))
}

registerBtn.addEventListener("click", registerPost);


function validate(){
  var submitCheck = document.getElementById('submitCheck');
  if (submitCheck.checked){
    registerBtn.disabled = false;
}
else
{
  registerBtn.disabled = true;
}
}
