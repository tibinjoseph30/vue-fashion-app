export const getLoginErrorMessages = (code: string): string => {
  switch (code) {
    case "auth/user-not-found":
      return "No account found with this email.";
    case "auth/wrong-password":
      return "Incorrect password.";
    case "auth/invalid-email":
      return "Email format is invalid.";
    case "auth/too-many-requests":
      return "Too many login attempts. Please try again later.";
    default:
      return "Login failed. Please check your credentials.";
  }
};
