// Função para carregar os dados do filme
async function carregarDadosFilme() {
    try {
        // Substitua pela URL do seu JSON Server
        const response = await fetch('http://localhost:3000/filmes/2');
        
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

// Função para preencher os dados do filme na página
function preencherDadosFilme(filme) {
    // Título do filme
    document.getElementById('titulo-filme').textContent = filme.titulo;
    
    // Pôster
    document.getElementById('poster-filme').src = filme.poster;
    document.getElementById('poster-filme').alt = `Pôster do filme ${filme.titulo}`;
    
    // Sinopse
    document.getElementById('descricao-filme').textContent = filme.sinopse;
    
    // Links
    document.getElementById('link-trailer').href = filme.links.trailer;
    document.getElementById('link-elenco').href = filme.links.elenco;
    document.getElementById('link-critica').href = filme.links.critica;
    document.getElementById('link-info').href = filme.links.informacoes;
    
    // Detalhes adicionais
    const listaDetalhes = document.getElementById('lista-detalhes');
    listaDetalhes.innerHTML = '';
    
    filme.detalhes.forEach(detalhe => {
        const item = document.createElement('li');
        item.textContent = detalhe;
        listaDetalhes.appendChild(item);
    });
}

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', carregarDadosFilme);