export default function validateNewPassword(password, confirmPassword) {
  if (password && password.length >= 8 && password === confirmPassword){
    return true;
  }
  else {
    throw new Error("Invalid password");
  }
}