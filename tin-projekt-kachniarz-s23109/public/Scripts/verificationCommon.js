function confirmDelete (value){
value = value.toString().trim();

const confirmDelete = document.getElementById('confirmDelete');
var confMess = confirmDelete.innerText + " " + value + " ?";
result = confirm(confMess);

if (result){
console.log("Deleting " + value);
return true;
}
else {
console.log("Aborting deletion of " + value);
return false;
}

console.log("Unknown error when deleting");
return false;
}
