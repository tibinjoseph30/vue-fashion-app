import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "../firebase/firebase.config";

// function getCurrentUser(): Promise<User | null> {
//   return new Promise((resolve, reject) => {
//     const unsubscribe = onAuthStateChanged(
//       auth,
//       (user) => {
//         unsubscribe(); // Stop listening once we get the state
//         resolve(user);
//       },
//       reject
//     );
//   });
// }

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
