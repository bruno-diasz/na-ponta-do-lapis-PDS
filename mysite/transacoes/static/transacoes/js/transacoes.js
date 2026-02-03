document.getElementById("btn_estado").addEventListener("click", () => ordenar("estado"));
document.getElementById("btn_data_hora").addEventListener("click", () => ordenar("data_hora"));;
document.getElementById("btn_valor").addEventListener("click", () => ordenar("valor"));;
document.getElementById("btn_descricao").addEventListener("click", () => ordenar("descricao"));;
document.getElementById("btn_categoria").addEventListener("click", () => ordenar("categoria"));;
document.getElementById("btn_conta").addEventListener("click", () => ordenar("conta_financeira"));;

let table = document.querySelector("#t_body")

async function ordenar (order) {
    console.log("Apertado");
    const response = await fetch(`api/listar?order=${order}`);
    const html = await response.text();
    table.innerHTML =  html

};


