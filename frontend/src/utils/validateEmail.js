
export default function validateEmail(email) {
  const re = /\S+@\S+\.\S+/;
  const isValid = re.test(email);
  if (isValid) return;
  else {
    throw new Error("Invalid email");
  }
}