const fs = require('fs');

async function buscarOfertasLomadee() {
    // Aqui está a correção: usamos a API_KEY para as duas portas
    const appToken = process.env.LOMADEE_API_KEY; 
    const sourceId = process.env.LOMADEE_SOURCE_ID;
    const apiKey = process.env.LOMADEE_API_KEY; 
    
    const url = `https://api.lomadee.com/v3/${appToken}/offer/_all?sourceId=${sourceId}&size=50`;

    try {
        const resposta = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'x-api-key': apiKey 
            }
        });
        
        if (!resposta.ok) {
            throw new Error(`Erro na API: ${resposta.status}`);
        }

        const dados = await resposta.json();

        const produtosFormatados = dados.offers.map(oferta => ({
            id: oferta.id,
            nome: oferta.name,
            preco: oferta.price,
            imagem: oferta.thumbnail,
            linkMonetizado: oferta.link, 
            loja: oferta.store.name
        }));

        fs.writeFileSync('ofertas-hoje.json', JSON.stringify(produtosFormatados, null, 2));
        console.log('Arquivo criado com sucesso!');

    } catch (erro) {
        console.error('Falha ao buscar ofertas:', erro);
    }
}

buscarOfertasLomadee();
