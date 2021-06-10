export default function validatePassword(password) {
  if (password && password.length >= 8){
    return true;
  }
  else {
    throw new Error("Invalid password");
  }
}