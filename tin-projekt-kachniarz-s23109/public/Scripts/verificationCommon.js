function confirmDelete (value){
value = value.toString().trim();
result = confirm("Czy na pewno chcesz usunąć " + value + " ?");

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