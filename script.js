const btnPage1 = document.getElementById("connect");
const btnPage2 = document.getElementById("retour");
const submit = document.getElementById("submit");
const deconnection = document.getElementById("deconnect");
const body = document.querySelector("body");
const user = document.getElementById("user");
const password = document.getElementById("password");
const inscrire = document.getElementById("inscrire");
const userIn = document.getElementById("user-inscription");
const passwordIn = document.getElementById("password-inscription");
const storedUser = localStorage.getItem("userName");
const storedPassword = localStorage.getItem("password");

// page de connexion
if (window.location.href.includes("page-connexion.html")) {
  // classe user et inscription
  class User {
    constructor(userName, password) {
      this.userName = userName;
      this.password = password;
    }
  }

  inscrire.addEventListener("click", function () {
    console.log("Inscrire button clicked");
    let newUser = new User(userIn.value, passwordIn.value);
    localStorage.setItem("userName", newUser.userName);
    localStorage.setItem("password", newUser.password);
    window.location.reload();
  });

  // connexion
  function verifConnect() {
    console.log("Inscrire button clicked");

    fetch("utilisateurs.json")
      .then((reponse) => reponse.json())
      .then((objUser) => {
        for (let i = 0; i < objUser.utilisateurs.length; i++) {
          if (
            user.value === objUser.utilisateurs[i].userName &&
            password.value === objUser.utilisateurs[i].password
          ) {
            btnPage1.setAttribute("disabled", "true");

            setTimeout(function () {
              window.location.href = "page2.html";
            }, 2000);

            sessionStorage.setItem("login", objUser.utilisateurs[i].userName);
            sessionStorage.setItem("nom", objUser.utilisateurs[i].nom);
            sessionStorage.setItem("prenom", objUser.utilisateurs[i].prenom);
          }
        }
      });

    if (user.value === storedUser && password.value === storedPassword) {
      btnPage1.setAttribute("disabled", "true");

      setTimeout(function () {
        window.location.href = "page2.html";
      }, 2000);
    }
  }
  btnPage1.addEventListener("click", verifConnect);
}

// page sondage
if (window.location.href.includes("page2.html")) {
  // alert cookies
  (() => {
    let message = "Ce site utilise vos cookies si vous continuez la navigation";
    alert(message);
  })();

  // bouton déconexion
  if (btnPage2 !== null) {
    btnPage2.addEventListener("click", function () {
      setTimeout(function () {
        window.location.href = "page-connexion.html";
      }, 2000);

      btnPage2.setAttribute("disabled", "true");
      sessionStorage.clear();
    });
  }
  if (deconnection !== null) {
    deconnection.addEventListener("click", function () {
      setTimeout(function () {
        window.location.href = "page-connexion.html";
      }, 2000);

      deconnection.setAttribute("disabled", "true");
    });
  }
  let questionsAffichees = false;

  // fonction pour effacer les reponses dans les inputs
  function effacerRepPage2(fonctionEfface) {
    const inputEfface = document.querySelectorAll(".page2-input");
    inputEfface.forEach((input) => {
      fonctionEfface(input);
    });
  }
  function erase(input) {
    input.value = "";
  }

  // message apres l'envoie
  submit.addEventListener("click", function () {
    let merci = document.createElement("p");
    let node = document.createTextNode(
      "Merci d'avoir participé à notre sondage !"
    );

    merci.appendChild(node);
    body.appendChild(merci);

    // afficher les réponses
    if (!questionsAffichees) {
      let q1 = document.getElementsByName("q1");
      let q2 = document.getElementById("q2");
      let q3 = document.getElementById("q3");
      let q4 = document.getElementsByName("q4");
      let q5 = document.getElementsByName("q5");

      let tabQuestions = [q1, q2, q3, q4, q5];

      //text node avec les reponses a l'interieur
      let questionsRep = document.createElement("p");
      let repondu = document.createTextNode(
        "Voici vos reponses pour chacunes des questions"
      );
      questionsRep.appendChild(repondu);
      questionsRep.appendChild(document.createElement("br"));

      // chq question cree un setItem dans le sessionStorage et les force dans un <p> (questionsRep)
      for (let i = 0; i < tabQuestions.length; i++) {
        if (i === 1 || i === 2) {
          sessionStorage.setItem("question" + (i + 1), tabQuestions[i].value);
          let paraRep = document.createTextNode("");
          paraRep.textContent =
            "Question " +
            (i + 1) +
            ": " +
            sessionStorage.getItem("question" + (i + 1));
          questionsRep.appendChild(paraRep);
          questionsRep.appendChild(document.createElement("br"));
        } else {
          if (tabQuestions[i].length) {
            // If it's iterable
            for (let radio of tabQuestions[i]) {
              if (radio.checked) {
                sessionStorage.setItem("radio" + (i + 1), radio.value);

                let paraRepRadio = document.createTextNode(
                  "Question " +
                    (i + 1) +
                    ": " +
                    sessionStorage.getItem("radio" + (i + 1))
                );
                questionsRep.appendChild(paraRepRadio);
                questionsRep.appendChild(document.createElement("br"));
              }
            }
          }

          allo.appendChild(questionsRep);
        }
      }

      effacerRepPage2(erase);
    }
    /*
    // lecture du json reponses_sondage.json
    fetch("reponses_sondage.json")
      .then((reponse) => reponse.json())
      .then((sondage) => {
        sessionStorage.setItem("questionMatis1", sondage.questions[0].rep1);
        sessionStorage.setItem("questionMatis2", sondage.questions[0].rep2);
        sessionStorage.setItem("questionMatis3", sondage.questions[0].rep3);
        sessionStorage.setItem("questionMatis4", sondage.questions[0].rep4);
        sessionStorage.setItem("questionMatis5", sondage.questions[0].rep5);

        sessionStorage.setItem("questionAbdel1", sondage.questions[1].rep1);
        sessionStorage.setItem("questionAbdel2", sondage.questions[1].rep2);
        sessionStorage.setItem("questionAbdel3", sondage.questions[1].rep3);
        sessionStorage.setItem("questionAbdel4", sondage.questions[1].rep4);
        sessionStorage.setItem("questionAbdel5", sondage.questions[1].rep5);

        // div allo avec nom et prenom
      

        //Afficher les reponse des questions
        let nomQuestion = sessionStorage.getItem("nom");
        let paraQuestion = document.createElement("p");
        if (nomQuestion === "Labelle") {
          paraQuestion.textContent =
            " Vous avez repondu : " +
            sessionStorage.getItem("questionMatis1") +
            " a la question 1,  " +
            sessionStorage.getItem("questionMatis2") +
            " a la question 2,  " +
            sessionStorage.getItem("questionMatis3") +
            " a la question 3, " +
            sessionStorage.getItem("questionMatis4") +
            " a la question 4  et " +
            sessionStorage.getItem("questionMatis5") +
            " a la question 5";
        } else if (nomQuestion === "Ali") {
          paraQuestion.textContent =
            " Vous avez repondu : " +
            sessionStorage.getItem("questionAbdel1") +
            " a la question 1,  " +
            sessionStorage.getItem("questionAbdel2") +
            " a la question 2,  " +
            sessionStorage.getItem("questionAbdel3") +
            " a la question 3, " +
            sessionStorage.getItem("questionAbdel4") +
            " a la question 4  et " +
            sessionStorage.getItem("questionAbdel5") +
            " a la question 5";
        }
        allo.appendChild(paraQuestion);
      });*/
  });

  // counter bouton envoyer
  function counter() {
    let clickCount = 0;
    return function () {
      clickCount++;
      let message;

      switch (clickCount) {
        case 1:
          message = "Vous avez cliqué une fois sur Envoyer.";
          break;
        case 2:
          message = "Vous avez cliqué deux fois sur Envoyer.";
          break;
        case 3:
          message = "Vous avez cliqué trois fois sur Envoyer.";
          break;
        default:
          message = "Vous avez cliqué plus de trois fois sur Envoyer.";
      }

      let messageElement = document.createElement("p");
      let messageText = document.createTextNode(message);
      messageElement.appendChild(messageText);
      document.body.appendChild(messageElement);
    };
  }

  let handleClick = counter();
  const submitButton = document.getElementById("submit");
  if (submitButton) {
    submitButton.addEventListener("click", handleClick);
  }

  // class question
  class Question {
    constructor(id, type, name) {
      this.id = id;
      this.type = type;
      this.name = name;
    }
  }
  class QuestionRadio extends Question {
    constructor(id, name, value) {
      super(id, "radio", name);
      this.value = value;
    }
  }
  // Question 1
  let quest1Oui = new QuestionRadio("q1-oui", "q1", "oui");
  let quest1Non = new QuestionRadio("q1-non", "q1", "non");

  let input1Oui = document.getElementById("q1-oui");
  let input1Non = document.getElementById("q1-non");

  input1Oui.type = "radio";
  input1Oui.name = quest1Oui.name;
  input1Oui.value = quest1Oui.value;

  input1Non.type = "radio";
  input1Non.name = quest1Non.name;
  input1Non.value = quest1Non.value;

  // Question 4

  let quest4Option1 = new QuestionRadio("q4-1", "q4", "1");
  let quest3Option2 = new QuestionRadio("q4-2", "q4", "2");
  let quest4Option3 = new QuestionRadio("q4-3", "q4", "3");
  let quest3Option4 = new QuestionRadio("q4-4", "q4", "4");
  let quest4Option5 = new QuestionRadio("q4-5", "q4", "5");

  let inputQuest4Option1 = document.getElementById("q4-1");
  let inputQuest4Option2 = document.getElementById("q4-2");
  let inputQuest4Option3 = document.getElementById("q4-3");
  let inputQuest4Option4 = document.getElementById("q4-4");
  let inputQuest4Option5 = document.getElementById("q4-5");

  inputQuest4Option1.type = "radio";
  inputQuest4Option1.name = quest4Option1.name;
  inputQuest4Option1.value = quest4Option1.value;

  inputQuest4Option2.type = "radio";
  inputQuest4Option2.name = quest3Option2.name;
  inputQuest4Option2.value = quest3Option2.value;

  inputQuest4Option3.type = "radio";
  inputQuest4Option3.name = quest4Option3.name;
  inputQuest4Option3.value = quest4Option3.value;

  inputQuest4Option4.type = "radio";
  inputQuest4Option4.name = quest3Option4.name;
  inputQuest4Option4.value = quest3Option4.value;

  inputQuest4Option5.type = "radio";
  inputQuest4Option5.name = quest4Option5.name;
  inputQuest4Option5.value = quest4Option5.value;

  // Question 5
  let quest5Oui = new QuestionRadio("q5-oui", "q5", "oui");
  let quest5Non = new QuestionRadio("q5-non", "q5", "non");

  let input5Oui = document.getElementById("q5-oui");
  let input5Non = document.getElementById("q5-non");

  input5Oui.type = "radio";
  input5Oui.name = quest5Oui.name;
  input5Oui.value = quest5Oui.value;

  input5Non.type = "radio";
  input5Non.name = quest5Non.name;
  input5Non.value = quest5Non.value;

  // affiche nom + prenom
  let allo = document.querySelector(".allo");
  let para = document.createElement("p");
  para.textContent =
    "Bonjour, " +
    sessionStorage.getItem("prenom") +
    "  " +
    sessionStorage.getItem("nom");
  allo.appendChild(para);
}
