// Função para buscar o JSON e renderizar na tela
async function carregarVitrine() {
    const vitrine = document.getElementById('vitrine-produtos');
    
    try {
        // Tenta buscar o arquivo gerado pelo GitHub Actions
        const resposta = await fetch('ofertas-hoje.json');
        
        if (!resposta.ok) {
            throw new Error('Arquivo de ofertas não encontrado.');
        }

        const produtos = await resposta.json();
        
        // Limpa a mensagem de "Buscando ofertas..."
        vitrine.innerHTML = ''; 

        // Se o arquivo estiver vazio
        if (produtos.length === 0) {
            vitrine.innerHTML = '<p class="carregando">Nenhuma oferta disponível no momento.</p>';
            return;
        }

        // Mapeia a array de produtos e cria os elementos HTML
        vitrine.innerHTML = produtos.map(produto => `
            <div class="card-produto">
                <img src="${produto.imagem}" alt="${produto.nome}">
                <h4>${produto.nome}</h4>
                <p class="preco-destaque">R$ ${produto.preco}</p>
                <a href="${produto.linkMonetizado}" target="_blank" class="btn-comprar">
                    Ver Oferta
                </a>
            </div>
        `).join('');

    } catch (erro) {
        console.error('Erro ao carregar as ofertas:', erro);
        vitrine.innerHTML = '<p class="carregando">Erro ao carregar os produtos. Tente novamente mais tarde.</p>';
    }
}

// Inicia a função assim que o script for carregado
carregarVitrine();