// import { getDatabase, ref, set } from "firebase/database"
// import { app } from "./FirebaseConfig"
// const db = getDatabase(app);

// function Usefire() {

//   const pushdata = () => {
//     set(ref(db, "users/piyush/home"), {
//       id: 1,
//       name: "shri house",
//       old: 12
//     })
//   }
//   return (
//     <div>
//       <h1>firebase React App</h1>
//       <button onClick={pushdata}>Put data</button>
//     </div>

//   )
// }

// export default Usefire
// import{getAuth, createUserWithEmailAndPassword} from "firebase/auth"
// import {app} from "./FirebaseConfig"
// const auth = getAuth(app);
// function usefile() {
  
//   function signup(){
//     createUserWithEmailAndPassword(auth,"suraj@gmail.com", "Suraj@1234#").then((value)=> // console.log(value));

//   }
//   return (
//     <div>
//       <button onClick={signup}>click for signup</button>
//     </div>
//   )
// }

// export default usefile