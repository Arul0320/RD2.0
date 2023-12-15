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
   
    const studentForm = document.getElementById("studentForm");
    const fetchParagraphButton = document.getElementById("fetchParagraph");
    const paragraphDisplay = document.getElementById("paragraphDisplay");
    const submitScoreButton = document.getElementById("submitScore");
    const currentScoreSpan = document.getElementById("currentScore"); // Added current score span

    let paragraphContent = "";
    let words = [];
    let score = 0;
    let currentIndex = 0;
    
    fetchParagraphButton.addEventListener("click", () => {
        const otp = document.getElementById("otp").value;
        
        firebase.database().ref("paragraphs").orderByChild("otp").equalTo(parseInt(otp)).once("value")
        .then((snapshot) => {
            const paragraphData = snapshot.val();
            if (paragraphData) {
                paragraphContent = paragraphData[Object.keys(paragraphData)[0]].paragraph;
                words = paragraphContent.split(" ");
                displayParagraphWordByWord();
            } else {
                paragraphDisplay.innerHTML = "Paragraph not found!";
            }
        })
        .catch((error) => {
            console.error("Error fetching paragraph:", error);
        });
    });
    
    function displayParagraphWordByWord() {
        const interval = setInterval(() => {
            if (currentIndex < words.length) {
                paragraphDisplay.innerHTML += words[currentIndex] + " ";
                currentIndex++;
                if (currentIndex % 9 === 0) {
                    askQuestion();   
                }
            } 
            else {
                clearInterval(interval);
            }
        }, 600); 
    }
  
    function askQuestion() {
        overlay.style.opacity = 1;
        overlay.style.display = "block";
        const question = `What was the last word you read?(with comma and Fullstop)`;
        const correctAnswer = words[currentIndex-2];  
        let answer;
        // backGr();
     do {
        answer = prompt(question);
          if (!answer) {
            alert("Please enter a valid answer.");
          }
        } while (!answer);
        
        if (answer && answer.toLowerCase() === correctAnswer.toLowerCase()) 
        {
            alert(`Correct answer! You earned one point.`); 
            score++; 
            currentScoreSpan.textContent = score;
            overlay.style.display = "none"; // Hide overlay after prompt
            overlay.style.opacity = 0.5;
        } else {
            alert("Incorrect answer. No points awarded. Let's continue.");
            currentScoreSpan.textContent = score;
            overlay.style.display = "none"; // Hide overlay after prompt
            overlay.style.opacity = 0.5;
        }
    }
    
    submitScoreButton.addEventListener("click", () => {
        studentName = document.getElementById("studentName").value;
        firebase.database().ref("studentScores").push({
            name: studentName,
            score: score
        });
        currentScoreSpan.textContent = score;
        alert(`Your score (${score}) has been submitted.`);
        overlay.style.display = "none";
    });
    
    