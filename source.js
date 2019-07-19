var turn = "X"
var board = [[],[],[]]
// muda o turno 
function switchTurn(){
    turn = (turn == "X") ? 'círculo' : "X"
    document.getElementById("imgturn").src = (turn == "X") ? "img/x.png" : "img/o.png" 
}
// verifica se alguem ganhou 
function verifyWin(){
    var win = false
    for(let i = 0; i < 3; i++){
        if(board[i][0] == turn && board[i][1] == turn && board[i][2] == turn){
            win = true
            break
        }
        else if(board[0][i] == turn && board[1][i] == turn && board[2][i] == turn){
            win = true
            break
        }   
    }
    if(board[0][0] == turn && board[1][1] == turn && board[2][2] == turn)  // diagornal principal
        win = true  
    else if(board[0][2] == turn && board[1][1] == turn && board[2][0] == turn)   // diagonal secundária  
        win = true 
    return win
}
// verifica se o jogo terminou, ou seja se não há mais casas jogáveis
function verifyTie(){
    var count = 0
    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
            if(board[i][j] == "X" || board[i][j] == 'círculo')
                count++
        }
    }    
    return (count == 9) ? true : false    
}
// realiza a jogada 
function move(element) {
    if(!verifyWin()){   
        let i = element.id.split('')[0], j = element.id.split('')[1]
        if(board[i][j] == null){
            element.querySelector("img").src = (turn == "X") ? "img/x.png" : "img/o.png" 
            board[i][j] = turn 
            let hasWon = verifyWin()
            if(hasWon || verifyTie()){
                createTags()
                document.body.querySelector("div#result").innerHTML = (hasWon) ? `O ${turn} venceu!!` : "O jogo empatou!!"
            }  
            else
                switchTurn()
        } 
    }
}
// reseta o jogo
function restart(){
    board = [[],[],[]]
    var imgs = document.getElementsByTagName("img")
    for(let i = 1; i < imgs.length; i++)   // começar do 1 pois o elemento 0 countém a imagem que diz a vez
        imgs[i].src = ""
    var button = document.querySelector("input.btn")
    var result = document.querySelector("div#result")
    document.body.querySelector("section#interface").removeChild(result) 
    document.body.querySelector("section#interface").removeChild(button)
}
// cria o texto e o botao após o término do jogo
function createTags(){
    var result = document.createElement("div")
    var button = document.createElement("input")
    button.setAttribute("onclick","restart()")
    button.setAttribute("type","button")
    button.setAttribute("value","resetar partida")
    button.setAttribute("class","btn")
    result.setAttribute("id","result")
    document.body.querySelector("section#interface").appendChild(result) 
    document.body.querySelector("section#interface").appendChild(button)
}