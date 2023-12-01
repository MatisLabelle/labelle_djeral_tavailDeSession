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
const stat = document.querySelector(".stat");

if (window.location.href.includes("page-connexion.html")) {
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

if (window.location.href.includes("page2.html")) {
  (() => {
    let message = "Ce site utilise vos cookies si vous continuez la navigation";
    alert(message);
  })();

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

  function effacerRepPage2(fonctionEfface) {
    const inputEfface = document.querySelectorAll(".page2-input");
    inputEfface.forEach((input) => {
      fonctionEfface(input);
    });
  }

  function erase(input) {
    input.value = "";
  }

  submit.addEventListener("click", function () {
    let merci = document.createElement("p");
    let node = document.createTextNode(
      "Merci d'avoir participé à notre sondage !"
    );

    merci.appendChild(node);
    body.appendChild(merci);

    if (!questionsAffichees) {
      let q1 = document.getElementsByName("q1");
      let q2 = document.getElementById("q2");
      let q3 = document.getElementById("q3");
      let q4 = document.getElementsByName("q4");
      let q5 = document.getElementsByName("q5");

      let tabQuestions = [q1, q2, q3, q4, q5];

      let questionsRep = document.createElement("p");
      let repondu = document.createTextNode(
        "Voici vos reponses pour chacunes des questions"
      );
      questionsRep.appendChild(repondu);
      questionsRep.appendChild(document.createElement("br"));

      for (let i = 0; i < tabQuestions.length; i++) {
        if (i === 1 || i === 2) {
          localStorage.setItem("question" + (i + 1), tabQuestions[i].value);
          let paraRep = document.createTextNode("");
          paraRep.textContent =
            "Question " +
            (i + 1) +
            ": " +
            localStorage.getItem("question" + (i + 1));
          questionsRep.appendChild(paraRep);
          questionsRep.appendChild(document.createElement("br"));
        } else {
          if (tabQuestions[i].length) {
            for (let radio of tabQuestions[i]) {
              if (radio.checked) {
                localStorage.setItem("radio" + (i + 1), radio.value);

                let paraRepRadio = document.createTextNode(
                  "Question " +
                    (i + 1) +
                    ": " +
                    localStorage.getItem("radio" + (i + 1))
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

    fetch("reponses_sondage.json")
      .then((reponse) => reponse.json())
      .then((sondage) => {
        localStorage.setItem("questionMatis1", sondage.questions[0].rep1);
        localStorage.setItem("questionMatis2", sondage.questions[0].rep2);
        localStorage.setItem("questionMatis3", sondage.questions[0].rep3);
        localStorage.setItem("questionMatis4", sondage.questions[0].rep4);
        localStorage.setItem("questionMatis5", sondage.questions[0].rep5);

        localStorage.setItem("questionAbdel1", sondage.questions[1].rep1);
        localStorage.setItem("questionAbdel2", sondage.questions[1].rep2);
        localStorage.setItem("questionAbdel3", sondage.questions[1].rep3);
        localStorage.setItem("questionAbdel4", sondage.questions[1].rep4);
        localStorage.setItem("questionAbdel5", sondage.questions[1].rep5);

        let nomQuestion = localStorage.getItem("nom");
        let paraQuestion = document.createElement("p");
        if (nomQuestion === "Labelle") {
          paraQuestion.textContent =
            " Vos réponses lors de votre dernière visite: " +
            localStorage.getItem("questionMatis1") +
            " a la question 1,  " +
            localStorage.getItem("questionMatis2") +
            " a la question 2,  " +
            localStorage.getItem("questionMatis3") +
            " a la question 3, " +
            localStorage.getItem("questionMatis4") +
            " a la question 4  et " +
            localStorage.getItem("questionMatis5") +
            " a la question 5";
        } else if (nomQuestion === "Ali") {
          paraQuestion.textContent =
            " Vous avez repondu : " +
            localStorage.getItem("questionAbdel1") +
            " a la question 1,  " +
            localStorage.getItem("questionAbdel2") +
            " a la question 2,  " +
            localStorage.getItem("questionAbdel3") +
            " a la question 3, " +
            localStorage.getItem("questionAbdel4") +
            " a la question 4  et " +
            localStorage.getItem("questionAbdel5") +
            " a la question 5";
        }
        stat.appendChild(paraQuestion);
      });
  });

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

  tabEleme = [
    new QuestionRadio("q1-oui", "q1", "oui"),
    new QuestionRadio("q1-non", "q1", "non"),
    new QuestionRadio("q4-1", "q4", "1"),
    new QuestionRadio("q4-2", "q4", "2"),
    new QuestionRadio("q4-3", "q4", "3"),
    new QuestionRadio("q4-4", "q4", "4"),
    new QuestionRadio("q4-5", "q4", "5"),
    new QuestionRadio("q5-oui", "q5", "oui"),
    new QuestionRadio("q5-non", "q5", "non"),
  ];

  tabEleme.forEach((element) => {
    let inputEl = document.getElementById(element.id);
    inputEl.type = element.type;
    inputEl.name = element.name;
    inputEl.value = element.value;
  });

  let allo = document.querySelector(".allo");
  let para = document.createElement("p");
  para.textContent =
    "Bonjour, " +
    sessionStorage.getItem("prenom") +
    "  " +
    sessionStorage.getItem("nom");
  allo.appendChild(para);
}
