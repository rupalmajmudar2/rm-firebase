import "./App.css";
import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  query,
  collection,
  onSnapshot,
  getFirestore,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "RM-FIREBASE-API-KEY",
  authDomain: "rm-moralis-on-firebase.firebaseapp.com",
  projectId: "rm-moralis-on-firebase",
  storageBucket: "rm-moralis-on-firebase.appspot.com",
  messagingSenderId: "500023830064",
  appId: "1:500023830064:web:98540da6532a6f0f5aaff5",
  measurementId: "G-TNV0MES6X0"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function App() {
  const [txs, setTxs] = useState(null);

  useEffect(() => {
    console.log("start");
    const q = query(collection(db, "moralis/txs/Rm_mm_polygon_testnet"));
    console.log("query has been setup");
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tempTxs = [];
      querySnapshot.forEach((doc) => {
        tempTxs.push(doc.data());
      });
      setTxs(tempTxs);
    });


    //Stop realtime updates:
    //unsubscribe();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>🔥 Firebase Moralis Streams Extension 🔥</p>
            <table className="table">
              <tr>
                <th>From</th>
                <th>To</th>
                <th>Amount</th>
              </tr>
              {txs?.map((e,i)=>{
                return(
                  <tr key={i}>
                    <td>{e.fromAddress}</td>
                    <td>{e.toAddress}</td>
                    <td>{e.value / 1E18} Matic</td>
                  </tr>
                )
              })}
            </table>
      </header>
    </div>
  );
}
export default App;
