const buttonText = ["Candidatar", "Remover candidatura"]

// Pega dados do LocalStorage


function getVagasSelecionadasArray() {
    const array = JSON.parse(localStorage.getItem("@webwomen:vagas-selecionadas")) || []
  
    return array
  }

const listaFav = getVagasSelecionadasArray()

// Renderiza cards vagas

function renderCardsVagas(array){

    array.forEach((job) => {
        const cardVaga = createCardVaga(job)
    })

}

// Cria card vaga

function createCardVaga(job){
    const listaVagas = document.querySelector(".lista_vagas")

    const cardVaga = document.createElement("li")
    const title = document.createElement("h3");
    title.innerText = job.title;

    const divSpan = document.createElement("div");
    const enterprise = document.createElement("span")
    enterprise.innerText = job.enterprise;
    const location = document.createElement("span")
    location.innerText = job.location;

    const description = document.createElement("p")
    description.innerText = job.description;
    const modalities = document.createElement("div")
    modalities.setAttribute("class","modalities")

    job.modalities.forEach(element => {
        let modality = document.createElement("span")

        modality.innerText = element;

        modalities.appendChild(modality)
    });

    listaVagas.appendChild(cardVaga);
    cardVaga.append(title,divSpan,description,modalities)

    divSpan.append(enterprise,location)

    const button = document.createElement("button")

    button.classList.add("vaga-btn")
    
    button.dataset.id = job.id
    
    const vagaExisteNosFavoritos = listaFav.find(vaga => {
        return vaga.favId == button.dataset.id 
    })
        
        if (vagaExisteNosFavoritos){
                       
            button.innerText = buttonText[1]
        }else{
            button.innerText = buttonText[0]
        }



    cardVaga.appendChild(button)
}


// Renderiza cards vagas selecionadas

function renderFavCards(array){
    const listaVagasSelecionadas = document.querySelector(".lista__vagas_selecionadas")

    listaVagasSelecionadas.innerHTML = ""; 

    array.forEach((job) => {
        const cardVagaFav = createFavCard(job)

    })
    if (array.length > 0){
        const textVagas = document.querySelector(".text__vagas--selecionadas")
        textVagas.innerHTML = "";
    }

    
    removerVaga(listaFav)

}

// Cria card vagas selecionadas

function createFavCard(job){
    const listaVagasSelecionadas = document.querySelector(".lista__vagas_selecionadas")

    
    const cardVagaFav = document.createElement("li")
    cardVagaFav.classList.add("favVagas")

    const header = document.createElement("div")
    header.classList.add("header")
    const title = document.createElement("h3");
    title.innerText = job.title;

    const icone = document.createElement("i");
    icone.setAttribute("class","fa-sharp fa-solid fa-trash button__fav-remove")
    icone.id = job.id

    header.append(title,icone)

    const divSpan = document.createElement("div");
    divSpan.setAttribute("class","enterprise-location")

    const enterprise = document.createElement("span")
    enterprise.innerText = job.enterprise;
    const location = document.createElement("span")
    location.innerText = job.location;

    divSpan.append(enterprise,location)
   
    listaVagasSelecionadas.appendChild(cardVagaFav)

    cardVagaFav.append(header,divSpan)

    return cardVagaFav;
}

// Adiciona card a lista de vagas selecionadas


function addToFav(){
    const buttons = document.querySelectorAll(".vaga-btn")
    const textVagas = document.querySelector(".text__vagas--selecionadas")

    
    buttons.forEach(button => {
        button.addEventListener("click", (event) =>{
            

            const vagaExiste = listaFav.find(vaga => {
                return vaga.favId == Number(event.target.dataset.id)
            })

            if(vagaExiste){
                const vagaProcurada = listaFav.find(vaga => {
                    return vaga.favId == Number(event.target.dataset.id) 
                })
    
                const vagProcuradaIndex = listaFav.indexOf(vagaProcurada)
    
                listaFav.splice(vagProcuradaIndex, 1)
                localStorage.setItem("@webwomen:vagas-selecionadas", JSON.stringify(listaFav)) 
                            
                button.innerText = buttonText[0]
                
    
                if (listaFav.length < 1){
                    const textVagas = document.querySelector(".text__vagas--selecionadas")
                    textVagas.innerText = "Você ainda não aplicou para nenhuma vaga";
    
                }
    
            }else{
                
                button.innerText = buttonText[1]
                textVagas.innerHTML = "";
        
                
                const vagaFound = jobsData.find(vaga => {
                    return vaga.id == Number(button.dataset.id)
                })
                
    
                const vagaListaFav = {
                    ...vagaFound,
                    favId: vagaFound.id
                }
    
                listaFav.push(vagaListaFav)
                localStorage.setItem("@webwomen:vagas-selecionadas", JSON.stringify(listaFav)) 
                
            }
        
         renderFavCards(listaFav)  
           

        })
    })
}

// Remove card vaga da lista de vagas selecionadas

function removerVaga(array){
    const removeBtn = document.querySelectorAll(".button__fav-remove")
    

    removeBtn.forEach(button => {
        
        button.addEventListener("click", (event) => {
            
            const vagaProcurada = array.find(vaga => {
                
                return vaga.favId == button.id
            })
           
            const vagProcuradaIndex = array.indexOf(vagaProcurada)
           
        
            array.splice(vagProcuradaIndex, 1)
            localStorage.setItem("@webwomen:vagas-selecionadas", JSON.stringify(listaFav)) 
            
            const buttonCandidatura = document.querySelectorAll(".vaga-btn")
            buttonCandidatura.forEach(btn => {
                if (btn.dataset.id == button.id){
                    
                     btn.innerText = buttonText[0]
                }
            })

            if (array.length < 1){
                const textVagas = document.querySelector(".text__vagas--selecionadas")
                textVagas.innerText = "Você ainda não aplicou para nenhuma vaga";

            }

            renderFavCards(array)   
        })
    })

}   


renderCardsVagas(jobsData)

addToFav()

renderFavCards(listaFav)



