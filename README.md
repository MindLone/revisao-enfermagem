# Enfermagem na Prova

Landing page mobile-first para o **Pack Enfermagem para Concursos 2026**.

## Configuração rápida

Tudo está concentrado em `index.html` para facilitar mudanças rápidas durante os testes de Meta Ads.

### Checkout

No final do `index.html`, altere:

```js
const CHECKOUT_URL = "";
```

### Vídeo 9:16

Procure pelo comentário:

```html
<!-- SUBSTITUIR ESTE BLOCO PELO PLAYER 9:16 (Wistia/Vimeo/MP4) -->
```

Substitua o bloco `.video-wrap` pelo embed do player.

### Campanha por concurso/estado

O topo e o bônus atual estão configurados para **SES-TO 2026 / FGV / prova 01-11-2026**.

Para outra campanha, atualize:

- a barra de urgência no topo;
- o card `Reta Final ...`;
- `BONUS_CONFIG` no JavaScript;
- textos específicos do concurso, sempre usando datas reais.

## Estrutura atual da oferta

- 150+ mapas mentais;
- 500 questões (200 de SUS comentadas + 300 específicas);
- 300 flashcards;
- 5 simulados;
- 100 pegadinhas de prova;
- 100 termos técnicos;
- SUS Descomplicado;
- cálculos e diluições;
- imunização e rede de frio;
- biossegurança, IRAS e CME;
- urgência e emergência;
- cronograma de 30 dias + reta final de 7 dias;
- bônus específico por edital.

## Identidade visual

- Azul-marinho: `#062B52` / `#0B3B70`
- Azul-claro/turquesa: `#0FAFBF` / `#20C5D6`
- Laranja de destaque: `#FF8A1F`
- Verde CTA: `#22B573`

O layout é desenhado prioritariamente para telas de celular e fica centralizado em uma moldura de até 500px quando acessado no desktop.
