async function carregarDadosFilme() {
    try {
        const response = await fetch('http://localhost:3000/filmes/3');
       
        if (!response.ok) {
            throw new Error('Erro ao carregar dados do filme');
        }
       
        const filme = await response.json();
        preencherDadosFilme(filme);
    } catch (error) {
        console.error('Erro:', error);
        document.querySelector('.container-conteudo').innerHTML = `
            <div class="error">
                <h2>Erro ao carregar os dados do filme</h2>
                <p>${error.message}</p>
            </div>
        `;
    }
}


function preencherDadosFilme(filme) {
    document.getElementById('titulo-filme').textContent = filme.titulo;
   
    document.getElementById('poster-filme').src = filme.poster;
    document.getElementById('poster-filme').alt = `Pôster do filme ${filme.titulo}`;
   
    document.getElementById('descricao-filme').textContent = filme.sinopse;
   
    document.getElementById('link-inicio').href = filme.links.inicio;
    document.getElementById('link-elenco').href = filme.links.elenco;
    document.getElementById('link-sinopse').href = filme.links.sinopse;
    document.getElementById('link-detalhes').href = filme.links.detalhes;
    document.getElementById('link-trailer').href = filme.links.trailer;
   
    const listaDetalhes = document.getElementById('lista-detalhes');
    listaDetalhes.innerHTML = '';
   
    filme.detalhes.forEach(detalhe => {
        const item = document.createElement('li');
        item.textContent = detalhe;
        listaDetalhes.appendChild(item);
    });
}


document.addEventListener('DOMContentLoaded', carregarDadosFilme);
