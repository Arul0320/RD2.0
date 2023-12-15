// Initialize Firebase

const firebaseConfig = {
    piKey: "AIzaSyDxNd9570NPHZLa6vycX-mN8h8Q1f9MUxM",
    authDomain: "reader-s-dot.firebaseapp.com",
    databaseURL: "https://reader-s-dot-default-rtdb.firebaseio.com",
    projectId: "reader-s-dot",
    storageBucket: "reader-s-dot.appspot.com",
    messagingSenderId: "659173971528",
    appId: "1:659173971528:web:3a18c612d17fe096782a7d",
    measurementId: "G-ER6BHXY23N"

   };
   firebase.initializeApp(firebaseConfig);


const adminForm = document.getElementById("adminForm");
const generateOTPButton = document.getElementById("generateOTP");
const scoreList = document.getElementById("scoreList");

generateOTPButton.addEventListener("click", () => {
    const paragraph = document.getElementById("paragraph").value;
    const otp = Math.floor(Math.random() * 10000);
    
    firebase.database().ref("paragraphs").push({
        paragraph: paragraph,
        otp: otp
    });
    
    alert(`Paragraph posted with OTP: ${otp}`);
});
// const studentScoresList = document.getElementById("studentScores");

// firebase.database().ref("studentScores").on("value", (snapshot) => {
//     studentScoresList.innerHTML = ""; // Clear previous scores
    
//     snapshot.forEach((childSnapshot) => {
//         const studentData = childSnapshot.val();
//         const listItem = document.createElement("li");
//         listItem.textContent = `${studentData.name}: ${studentData.score}`;
//         studentScoresList.appendChild(listItem);
//     });
// });
const scoresBody = document.getElementById("scoresBody");
firebase.database().ref("studentScores").on("value", (snapshot) => {
    scoresBody.innerHTML = ""; // Clear the previous data

    snapshot.forEach((childSnapshot) => {
        const scoreData = childSnapshot.val();
        const row = scoresTable.insertRow(-1);
        const nameCell = row.insertCell(0);
        const scoreCell = row.insertCell(1);

        nameCell.textContent = scoreData.name;
        scoreCell.textContent = scoreData.score;
    });
});