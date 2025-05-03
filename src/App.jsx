import React, { useState } from 'react';
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB2U3_V9GvXEMUZr--_1AT6jSM8MtDIDzE",
  authDomain: "mystore2-7237a.firebaseapp.com",
  projectId: "mystore2-7237a",
  storageBucket: "mystore2-7237a.appspot.com",
  messagingSenderId: "419533628656",
  appId: "1:419533628656:web:9b3d5f334cab488f1cce35",
  measurementId: "G-7KWV54ZNYE"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [storeName, setStoreName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [shopIcon, setShopIcon] = useState('');
  const [message, setMessage] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      // Add user data to Firestore
      await setDoc(doc(db, "stores", uid), {
        name,
        email,
        storeName,
        avatar,
        shopIcon,
      });

      // Create a document in the "whiteList" collection
      await setDoc(doc(db, "whiteList", uid), {
        allowed: true,
      });

      setMessage('🎉 Account created successfully!');
    } catch (error) {
      setMessage(`❌ ${error.message}`);
    }
  };

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f0f4f8',
      fontFamily: 'Arial, sans-serif',
    },
    card: {
      backgroundColor: '#fff',
      padding: '30px',
      borderRadius: '10px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      width: '100%',
      maxWidth: '400px',
      textAlign: 'center',
    },
    title: {
      fontSize: '24px',
      marginBottom: '20px',
      color: '#333',
    },
    inputGroup: {
      marginBottom: '15px',
      textAlign: 'left',
    },
    label: {
      display: 'block',
      marginBottom: '5px',
      fontWeight: 'bold',
      color: '#555',
    },
    input: {
      width: '100%',
      padding: '10px',
      borderRadius: '5px',
      border: '1px solid #ccc',
      fontSize: '16px',
    },
    button: {
      width: '100%',
      padding: '10px',
      borderRadius: '5px',
      border: 'none',
      backgroundColor: '#007bff',
      color: '#fff',
      fontSize: '16px',
      cursor: 'pointer',
      marginTop: '10px',
    },
    buttonHover: {
      backgroundColor: '#0056b3',
    },
    message: {
      marginTop: '20px',
      fontSize: '16px',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Create Account</h1>
        <form onSubmit={handleSignUp}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Name:</label>
            <input
              type="text"
              style={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Store Name:</label>
            <input
              type="text"
              style={styles.input}
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Avatar URL:</label>
            <input
              type="text"
              style={styles.input}
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Shop Icon URL:</label>
            <input
              type="text"
              style={styles.input}
              value={shopIcon}
              onChange={(e) => setShopIcon(e.target.value)}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email:</label>
            <input
              type="email"
              style={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password:</label>
            <input
              type="password"
              style={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            style={styles.button}
            onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
          >
            Sign Up
          </button>
        </form>
        {message && <p style={styles.message}>{message}</p>}
      </div>
    </div>
  );
}

export default App;
