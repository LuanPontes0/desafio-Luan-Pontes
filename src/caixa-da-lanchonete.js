class CaixaDaLanchonete {
    constructor() {
        this.cardapio = [
            { codigo: 'cafe', descricao: 'Café', valor: 3.00 },
            { codigo: 'chantily', descricao: 'Chantily (extra do Café)', valor: 1.50 },
            { codigo: 'suco', descricao: 'Suco Natural', valor: 6.20 },
            { codigo: 'sanduiche', descricao: 'Sanduíche', valor: 6.50 },
            { codigo: 'queijo', descricao: 'Queijo (extra do Sanduíche)', valor: 2.00 },
            { codigo: 'salgado', descricao: 'Salgado', valor: 7.25 },
            { codigo: 'combo1', descricao: '1 Suco e 1 Sanduíche', valor: 9.50 },
            { codigo: 'combo2', descricao: '1 Café e 1 Sanduíche', valor: 7.50 }
        ];

        this.formasDePagamento = ['dinheiro', 'debito', 'credito'];

        
        this.itensExtrasParaPrincipais = {
            'chantily': 'cafe',
            'queijo': 'sanduiche'
            
        };
    }

    calcularValorDaCompra(formaDePagamento, itens) {
        if (!this.formasDePagamento.includes(formaDePagamento)) {
            return 'Forma de pagamento inválida!';
        }

        if (itens.length === 0) {
            return 'Não há itens no carrinho de compra!';
        }

        let valorTotal = 0;
        const itensSelecionados = new Map();

        for (const itemInfo of itens) {
            const [codigo, quantidade] = itemInfo.split(',');
            const item = this.cardapio.find(item => item.codigo === codigo);

            if (!item) {
                return 'Item inválido!';
            }

            if (quantidade <= 0) {
                return 'Quantidade inválida!';
            }

            // Verificar se o item é um extra e se seu item principal foi selecionado
            if (this.itensExtrasParaPrincipais[codigo]) {
                const itemPrincipal = this.itensExtrasParaPrincipais[codigo];
                if (!itensSelecionados.has(itemPrincipal) || itensSelecionados.get(itemPrincipal) <= 0) {
                    return 'Item extra não pode ser pedido sem o principal';
                }
            }

            if (itensSelecionados.has(codigo)) {
                itensSelecionados.set(codigo, itensSelecionados.get(codigo) + parseInt(quantidade));
            } else {
                itensSelecionados.set(codigo, parseInt(quantidade));
            }
        }

        for (const [codigo, quantidade] of itensSelecionados.entries()) {
            const item = this.cardapio.find(item => item.codigo === codigo);
            valorTotal += item.valor * quantidade;
        }

        if (formaDePagamento === 'dinheiro') {
            valorTotal *= 0.95; // Aplicar desconto de 5% para pagamento em dinheiro
        } else if (formaDePagamento === 'credito') {
            valorTotal *= 1.03; // Acréscimo de 3% para pagamento a crédito
        }

        return `R$ ${valorTotal.toFixed(2).replace('.', ',')}`;
    }
}

export { CaixaDaLanchonete };
