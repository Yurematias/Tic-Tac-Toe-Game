var vez = 'X'
var matriz = [[],[],[]]

function passarVez(){
    vez = (vez == 'X') ? 'círculo' : 'X'
    document.getElementById("imgvez").src = (vez == 'X') ? "img/x.png" : "img/o.png" 
}
// verifica se alguem ganhou 
function winVerify(){
    let i,j
    var win = false
    for(i = 0, j = 2; i < 3; i++, j--){
        if(matriz[i][0] == vez && matriz[i][1] == vez && matriz[i][2] == vez){
            win = true
            break
        }
        else if(matriz[0][i] == vez && matriz[1][i] == vez && matriz[2][i] == vez){
            win = true
            break
        }   
    }
    if(matriz[0][0] == vez && matriz[1][1] == vez && matriz[2][2] == vez)  // diagornal principal
        win = true  
    else if(matriz[0][2] == vez && matriz[1][1] == vez && matriz[2][0] == vez)   // diagonal secundária  
        win = true 
    return win
}
// verifica se o jogo terminou, ou seja se não há mais casas jogáveis
function finished(){
    let cont = 0, retorno
    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
            if(matriz[i][j] == 'X' || matriz[i][j] == 'círculo')
                cont++
        }
    }    
    retorno = (cont == 9) ? true : false    
    return retorno
}
// realiza a jogada 
function jogada(elemento) {
    if(!winVerify()){   
        let i = elemento.id.split('')[0], j = elemento.id.split('')[1]
        if(matriz[i][j] == null){
            elemento.querySelector("img").src = (vez == 'X') ? "img/x.png" : "img/o.png" 
            matriz[i][j] = vez 
            let ganhou = winVerify()
            if(ganhou || finished()){
                createTags()
                document.body.querySelector("div#result").innerHTML = (ganhou) ? `O ${vez} venceu!!` : "O jogo empatou!!"
            }  
            else
                passarVez()
        } 
    }
}
// reseta o jogo
function resetar(){
    matriz = [[],[],[]]
    let a = document.getElementsByTagName("img")
    for(let i = 1; i < a.length; i++)   // começar do 1 pois o elemento 0 contém a imagem que diz a vez
        a[i].src = ""
    let botão = document.querySelector("input.btn")
    let resultado = document.querySelector("div#result")
    document.body.querySelector("section#interface").removeChild(resultado) 
    document.body.querySelector("section#interface").removeChild(botão)
}
// cria o texto e o botao após o término do jogo
function createTags(){
    let resultado = document.createElement("div")
    let botão = document.createElement("input")
    botão.setAttribute("onclick","resetar()")
    botão.setAttribute("type","button")
    botão.setAttribute("value","resetar partida")
    botão.setAttribute("class","btn")
    resultado.setAttribute("id","result")
    document.body.querySelector("section#interface").appendChild(resultado) 
    document.body.querySelector("section#interface").appendChild(botão)
}