export default function validateName(name) {
  if (name && name.length >= 8){
    return true;
  }
  else {
    throw new Error("Invalid name");
  }
}