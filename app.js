let resetBtn = document.getElementaryById("reset");
let scoreJoueur = document.getElementaryById("score-joueur");
let scoreOrdinateur = document.getElementaryById("score-ordinateur");
let btnJoueur = [...document.getElementsByClassName("")];
let opierreBtn = document.getElementaryById("opierre");
let ofeuilleBtn = document.getElementaryById("ofeuille");
let ociseauxBtn = document.getElementaryById("ociseaux");
let message = document.getElementaryById("message");
let nextBtn = document.getElement

const joueurManche = (e) => {
    let choix = e.target.closest(".btn-joueur");
    
    btnJoueur.forEach(btn => {
      btn.classList.add("desactivated");
      btn.removeEventListener("click", joueurManche);
    });

  choix.classList.remove("desactivated");
  choix.classList.add("active");

  let choixJoueur = choix.id;

  let choixOrdi = faireChoixOrdinateur(); 

  verifierGagnant(choixJoueur, choixOrdi);

  nextBtn.style.visibility = "visible";
};

const PIERRE = "pierre";
const FEUILLE = "feuille";
const CISEAUX = "ciseaux";

const faireChoixOrdinateur = () => {
  // 0 - pierre
  // 1 - feuille
  // 2 - ciseaux

  let nbAleatoire = Math.floor(Math.random() * 3);

  switch(nbAleatoire){
    case 0:
      opierreBtn.classList.add("active");   
      return PIERRE;   
    case 1:
      ofeuilleBtn.classList.add("active");
      return FEUILLE;
    default:
      ociseauxBtn.classList.add("active");
      return CISEAUX;
  }
};

const verifierGagnant = (choixJoueur, choixOrdi) => {
  if(choixJoueur == choixOrdi){
    message.textContent = "Egalité !";
    return;
  }    

  if(choixJoueur == PIERRE){
    if(choixOrdi == FEUILLE){
      return victoireOrdinateur();
    } else if(choixOrdi == CISEAUX){
      return victoireJoueur();
    }
  }

  if(choixJoueur == FEUILLE){
    if(choixOrdi == CISEAUX){
      return victoireOrdinateur();
    } else if(choixOrdi == PIERRE){
      return victoireJoueur();
    }
  }

  if(choixJoueur == CISEAUX){
    if(choixOrdi == PIERRE){
      return victoireOrdinateur();
    } else if(choixOrdi == FEUILLE){
      return victoireJoueur();
    }
  }
};

const victoireOrdinateur = () => {
  message.textContent = "L'ordinateur gagne...";
  scoreOrdinateur.textContent++;
};

const victoireJoueur = () => {
  message.textContent = "Vous avez gagné ! :)";
  scoreJoueur.textContent++;
};

const préparerNouvelleManche = () => {
    btnJoueur.forEach(btn => { 
        btn.classList.remove("desactivated");
        btn.classList.remove("active");

        btn.addEventListener("click", joueurManche);
      });
        nextBtn.style.visibility = "hidden";

        opierreBtn.classList.remove("active");
        ofeuilleBtn.classList.remove("active");
        ociseauxBtn.classList.remove("active");

        message.textContent = "A vous de jouer !";
};

nextBtn.addEventListener("click", préparerNouvelleManche);

btnJoueur.forEach((btn) => btn.addEventListener("click", joueurManche));

resetBtn.addEventListener("click", () => {
    scoreJoueur.textContent = 0;
    scoreOrdinateur.textContent = 0;

    preparerNouvelleManche();
});
