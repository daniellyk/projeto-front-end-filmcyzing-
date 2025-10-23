class FilmeApp {
    constructor() {
        this.apiBaseUrl = 'http://localhost:3000';
        this.init();
    }

    async init() {
        try {
            await this.carregarNavbar();
            await this.carregarConteudo();
        } catch (error) {
            console.error('Erro ao carregar dados:', error);
        }
    }

    async carregarNavbar() {
        try {
            const response = await fetch(`${this.apiBaseUrl}/menu`);
            const menuItens = await response.json();
            
            const navbar = document.getElementById('navbar');
            navbar.innerHTML = this.criarNavbar(menuItens);
        } catch (error) {
            console.error('Erro ao carregar navbar:', error);
        }
    }

    criarNavbar(menuItens) {
        return `
            <div class="logo">JOGOS MORTAIS</div>
            <ul class="nav-links">
                ${menuItens.map(item => `
                    <li>
                        <a href="${item.url}" ${item.url.includes('http') ? 'target="_blank"' : ''}>
                            ${item.texto}
                        </a>
                    </li>
                `).join('')}
            </ul>
        `;
    }

    async carregarConteudo() {
        try {
            const response = await fetch(`${this.apiBaseUrl}/filme`);
            const filme = await response.json();
            
            const container = document.getElementById('conteudo-principal');
            container.innerHTML = this.criarConteudo(filme);
        } catch (error) {
            console.error('Erro ao carregar conteúdo:', error);
        }
    }

    criarConteudo(filme) {
        return `
            <img src="${filme.imagem}" alt="Pôster do Filme" class="poster-filme">
            
            <div class="detalhes-filme">
                <h1 id="sinopse">SINOPSE</h1>
                <h2 class="descricao">${filme.sinopse}</h2>

                <ul id="detalhes">
                    <h1>Informações gerais</h1>
                    <li>Gênero: ${filme.genero}</li>
                    <li>Direção: ${filme.direcao}</li>
                    <li>Duração: ${filme.duracao}</li>
                    <li>Lançamento: ${filme.lancamento}</li>
                    <li>Orçamento: ${filme.orcamento}</li>
                    <li>Distribuição: ${filme.distribuicao}</li>
                </ul>
            </div>
        `;
    }
}

// Inicializar a aplicação quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    new FilmeApp();
});