import { ethers } from "https://cdnjs.cloudflare.com/ajax/libs/ethers/6.7.0/ethers.min.js";

const contractAddress = '0xb5465ED8EcD4F79dD4BE10A7C8e7a50664e5eeEB';
const abi = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "author",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "title",
				"type": "string"
			}
		],
		"name": "addBook",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "string",
				"name": "author",
				"type": "string"
			},
			{
				"indexed": true,
				"internalType": "string",
				"name": "title",
				"type": "string"
			}
		],
		"name": "BookAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "borrower",
				"type": "address"
			}
		],
		"name": "BookBorrowed",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "BookReturned",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "borrower",
				"type": "address"
			}
		],
		"name": "borrowBook",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "returnBook",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "activeBook",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "bookCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "bookRecord",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "author",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "title",
				"type": "string"
			},
			{
				"internalType": "enum LibraryRecord.Status",
				"name": "status",
				"type": "uint8"
			},
			{
				"internalType": "address",
				"name": "borrower",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "booksByTitle",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "searchBook",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "enum LibraryRecord.Status",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "title",
				"type": "string"
			}
		],
		"name": "searchBookWithTitle",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

async function getContract() {
    // Create a provider and connect it to the Ethereum object injected by MetaMask
    const provider = new ethers.BrowserProvider(window.ethereum);
    // Request user to connect their wallet
    await provider.send("eth_requestAccounts", []);
    // Get the signer from the provider
    const signer = await provider.getSigner();
    // Return a new contract instance with the signer
    return new ethers.Contract(contractAddress, abi, signer);
}

// Add Book
document.getElementById("addBookButton").addEventListener("click", async () => {
    const author = document.getElementById("author").value;
    const title = document.getElementById("title").value;

    try {
        const contract = await getContract();
        const tx = await contract.addBook(author, title);
        await tx.wait(); // Wait for the transaction to be mined
        alert("Book added!");
    } catch (error) {
        console.error("Error adding book:", error);
        alert("Failed to add book: " + error.message);
    }
});

// Borrow Book
document.getElementById("borrowBookButton").addEventListener("click", async () => {
    const bookId = document.getElementById("bookIdBorrow").value;
    const borrower = document.getElementById("borrower").value;

    try {
        const contract = await getContract();
        const tx = await contract.borrowBook(bookId, borrower);
        await tx.wait(); // Wait for the transaction to be mined
        alert("Book borrowed!");
    } catch (error) {
        console.error("Error borrowing book:", error);
        alert("Failed to borrow book: " + error.message);
    }
});

// Return Book
document.getElementById("returnBookButton").addEventListener("click", async () => {
    const bookId = document.getElementById("bookIdReturn").value;

    try {
        const contract = await getContract();
        const tx = await contract.returnBook(bookId);
        await tx.wait(); // Wait for the transaction to be mined
        alert("Book returned!");
    } catch (error) {
        console.error("Error returning book:", error);
        alert("Failed to return book: " + error.message);
    }
});

const statusEnum = ["LOANED", "AVAILABLE"];
// Search Book
document.getElementById("searchBookButton").addEventListener("click", async () => {
    const bookId = document.getElementById("bookIdSearch").value;

    try {
        const contract = await getContract();
        const bookData = await contract.searchBook(bookId);
        const statusText = statusEnum[bookData[2]];
        
        // Display results in the searchResults div
        const resultsDiv = document.getElementById("searchResults");
        resultsDiv.innerHTML = `
            <p><strong>Author:</strong> ${bookData[0]}</p>
            <p><strong>Title:</strong> ${bookData[1]}</p>
            <p><strong>Status:</strong> ${statusText}</p>
        `;
    } catch (error) {
        console.error("Error searching for book:", error);
        alert("Failed to search for book: " + error.message);
    }
});
