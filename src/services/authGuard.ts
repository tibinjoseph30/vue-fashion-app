import { auth } from "../firebase/firebase.config";

export const requireAdmin = (to: any, from: any, next: any) => {
  const unsub = auth.onAuthStateChanged((user) => {
    unsub(); // stop listening after first check
    if (user && user.email === "admin@myfashion.com") {
      next();
    } else {
      next("/admin");
    }
  });
};
