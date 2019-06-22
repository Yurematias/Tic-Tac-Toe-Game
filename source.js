var vez = 'x'
var i,j

var matriz = [
    ['a','n','y'],
    ['v','a','l'],
    ['u','e',' ']
]

function passarVez()
{
    vez = (vez == 'x') ? 'o' : 'x'
    document.getElementById("imgvez").src = (vez == 'x') ? "img/x.png" : "img/o.png" 
}

// verifica se alguem ganhou 
function winVerify()
{
    var win = false
    for(let i = 0, j = 2; i < 3; i++, j--)
    {
        if(matriz[i][0] == matriz[i][1] && matriz[i][1] == matriz[i][2])  // linhas
        {
            win = true
            break
        }
        else if(matriz[0][i] == matriz[1][i] && matriz[1][i] == matriz[2][i]) // colunas
        {
            win = true
            break
        }   
    }
    if(matriz[0][0] == matriz[1][1] && matriz[1][1] == matriz[2][2])  // diagornal principal
        win = true  
    else if(matriz[0][2] == matriz[1][1] && matriz[1][1] == matriz[2][0])   // diagonal secundária  
        win = true 
    return win
}

// verifica se o jogo terminou, ou seja se não há mais casas jogáveis
function finished()
{
    var cont = 0
    for(let i = 0; i < 3; i++)
        for(let j = 0; j < 3; j++)
        {
            if(matriz[i][j] == 'x' || matriz[i][j] == 'o')
                cont++
        }
    if(cont == 9)    
        return true
    return false    
}

// realiza a jogada 
function jogada(elemento) 
{
    if(!winVerify())
    {   
        prepara_ij(elemento.id)
        if(matriz[i][j] != 'x' && matriz[i][j] != 'o')
        {
            elemento.querySelector("img").src = (vez == 'x') ? "img/x.png" : "img/o.png" 
            matriz[i][j] = vez 
            var ganhou = winVerify()
            if(ganhou || finished())
            {
                let txt
                if(ganhou)
                    txt = (vez == 'x') ? "O X venceu!!" : "O círculo venceu!!"
                else
                    txt = "O jogo empatou!!"
                    
                createTags()
                document.body.querySelector("div#result").innerHTML = txt
            }  
            else
                passarVez()
        } 
    }
}

// recebe o id do quadrado e modifica o i,j 
function prepara_ij(idElemento)
{
    switch(idElemento)
    {
        case 'q1': i = 0, j = 0; break;
        case 'q2': i = 0, j = 1; break;
        case 'q3': i = 0, j = 2; break;
        case 'q4': i = 1, j = 0; break;
        case 'q5': i = 1, j = 1; break;
        case 'q6': i = 1, j = 2; break;
        case 'q7': i = 2, j = 0; break;
        case 'q8': i = 2, j = 1; break;
        case 'q9': i = 2, j = 2; 
    }
}

// reseta o jogo
function resetar()
{
    matriz = [
        ['a','n','y'],
        ['v','a','l'],
        ['u','e',' ']
    ]
    var a = document.getElementsByTagName("img")
    for(let i = 1; i < a.length; i++)
        a[i].src = ""
    let botão = document.querySelector("input.btn")
    let resultado = document.querySelector("div#result")
    document.body.querySelector("section#interface").removeChild(resultado) 
    document.body.querySelector("section#interface").removeChild(botão)
}

function createTags()
{
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