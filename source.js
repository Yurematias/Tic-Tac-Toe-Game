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
    if(matriz[0][0] == matriz[1][1] && matriz[1][1] == matriz[2][2])        // diagornal principal
        win = true  
    else if(matriz[0][2] == matriz[1][1] && matriz[1][1] == matriz[2][0])   // diagonal secundária  
        win = true 
    return win
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

            if(winVerify())
            {
                let vencedor = (vez == 'x') ? "O X venceu!!" : "O círculo venceu!!"
                let resultado = document.createElement("div")
                let botão = document.createElement("input")
                botão.setAttribute("onclick","resetar()")
                botão.setAttribute("type","button")
                botão.setAttribute("value","resetar partida")
                botão.setAttribute("class","btn")
                resultado.setAttribute("id","result")
                document.body.querySelector("section#interface").appendChild(resultado) 
                document.body.querySelector("section#interface").appendChild(botão)
                document.body.querySelector("div#result").innerHTML = vencedor
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

function resetar()
{
    var a = document.getElementsByTagName("img")

    for(let i = 1; i < 11; i++)
        a.src = ""
}