import { useState } from "react";
import abi from "./abi.json";
import { ethers } from "ethers";

const contractAddress = "0x3F2f8D53F9A306eF2A1eF819EC8844883c1916a5";

function App() {
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");

  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  const handleSet = async () => {
    try {
      if (!text) {
        alert("Please enter a message before setting.");
        return;
      }

      if (window.ethereum) {
        await requestAccount();
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);

        const tx = await contract.setMessage(text); 
        const txReceipt = await tx.wait();
        console.log("Transaction successful:", txReceipt);
      } else {
        console.error("MetaMask not found. Please install MetaMask to use this application.");
      }
    } catch (error) {
      console.error("Error setting message:", error);
    }
  };

  const handleGet = async () => {
    
      if (window.ethereum) {
        await requestAccount();
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);

        const tx = await contract.getMessage();
        setMessage(tx);
      } else {
        console.error("MetaMask not found. Please install MetaMask to use this application.");
      }
   
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Set Message on Smart Contract</h1>
      <input
        type="text"
        placeholder="write your message"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleSet}>Send Message</button>
      <button onClick={handleGet}>Receive Message</button>
      <h1>{message}</h1>
    </div>
  );
}

export default App;
