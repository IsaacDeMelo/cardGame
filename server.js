const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;
// Configurando EJS como motor de visualização
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// Middleware para parsear dados do corpo da requisição
app.use(bodyParser.urlencoded({ extended: true }));
// Configurando pasta pública para arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

class Carta {
  constructor(nome, tipo, custoEnergia, dano, modelo, desc) {
    this.id = this.gerarIdUnico(); // Gera um ID único
    this.nome = nome;
    this.tipo = tipo;
    this.custoEnergia = custoEnergia;
    this.dano = dano;
    this.modelo = modelo;
    this.desc = desc;
  }

  // Método para gerar um ID único
  gerarIdUnico() {
    return Array.from({ length: 9 }, () =>
      Math.random().toString(36).charAt(2 + Math.floor(Math.random() * 34))
    ).join('');
  }

  // Método para clonar a carta com um novo ID
  clone() {
    return new Carta(this.nome, this.tipo, this.custoEnergia, this.dano, this.modelo, this.desc);
  }
}

class Jogador {
  constructor(nome, cartas, energia, vida, aparencia, aparencia2) {
    this.nome = nome;
    this.cartas = cartas;
    this.energia = energia;
    this.vida = vida;
    this.aparencia = aparencia;
    this.aparencia2 = aparencia2;
    this.envenenado = { veneno: false, dano: 0 }
  }
  toJSON() {
    return {
      nome: this.nome,
      cartas: this.cartas,
      energia: this.energia,
      vida: this.vida,
      aparencia: this.aparencia,
      aparencia2: this.aparencia2,
      envenenado: this.envenenado,
    };
  }
}

const c1 = new Carta( `🌁-❨❨👩🏻•'Cogumelos Envenenados'•👩🏻❩❩-🌁
         『毒きのこ; Doku kinoko』`, `veneno`, -50, -20, `Os tigres de West comeram ração estragada, os humanos do novo mundo também. Enganados por um famoso chefe alemão. Todos os dias passam mal e acabam descontando no campo de batalha.
\n➖Caso Atinja O Oponente, O Mesmo Será Envenenado Com『-20%💔』De Vida Por Round.
\n➖Esse Envenenamento É Uma Habilidade Básica.`, `https://i.pinimg.com/736x/7f/c1/03/7fc103be42d9e05d6f44448361357f7f.jpg`)
const c2 = new Carta( `🌁-((👩🏻•'Regeneração Real'•👩🏻))-🌁
         『本当の再生; Hontō no Saisei』`, 'ativada', 50, 50, `Regenera:『+50%⚡』De Energia.
Regenera:『+50%❤️』De Vida. A realeza do novo mundo aguarda ansiosamente por batalhas. Uma das razões para isso é que eles tem técnicas secretas nunca antes vistas e querem testa-las em seus inimigos. Regenerar é uma de suas muitas habilidades.`, 'https://i.pinimg.com/736x/52/00/ef/5200ef1700b8e5f7ec8d9fa92fbd77d3.jpg')
const c3 = new Carta( `⏺️-❨❨🌁•'Arremesso De Lâminas'•🌁❩❩-⏺️
    『ブレード投げ , Burēdo nage』 `, 'ataque', -70, -100, `
Dano:『100%💔』. Custo De Energia:『-70%⚡』. Assim como na sua técnica corporal, os navegadores usam a força do corpo, mas dessa vez aliada a pontaria e sorte para acertar o adversário com suas lâminas. Eles miram e jogam, tudo friamente calculado, caso acerte também pode matar.
\n➖Esse É Um Golpe Básico À Distância.`, `https://i.pinimg.com/736x/f1/dc/62/f1dc6280b9b4b8b1bc39a728ab97c599.jpg`)
const c4 = new Carta( `⏺️-❨❨🌁•'Mil Coordenadas'•🌁❩❩-⏺️
     『千の座標, Sen no zahyō』 `, `defesa`, -50, 0, `Custo De Energia:『-50%⚡』. Com esta técnica o usuário usa de sua inteligência para criar várias pistas falsas de sua localização, fazendo o seu oponente seguir caminhos diferentes, e com isso criando tempo suficiente para se ocultar de qualquer ameaça ou até mesmo tomar um cházinho.
\n ➖Esse Movimento É Uma Ocultação Básica.`, `https://i.pinimg.com/736x/ad/3d/19/ad3d19ef9ea0aa71555b6ee86afdf068.jpg`)
const c5 = new Carta( `🌋-❨❨👊🏻•'Impacto Devastador'•👊🏻❩❩-🌋
  『破壊的な衝撃, Hakai-teki na Shōgeki』`, 'ataque', -60, -90, `
  Dano:『90%💔』. Custo De Energia:『-60%⚡』. 
  Os guerreiros do novo mundo canalizam sua força em um golpe poderoso, causando grande impacto, mas com alto custo de energia.
  \n➖Esse É Um Golpe De Alto Risco E Alta Recompensa.`, "https://i.pinimg.com/736x/2a/85/1c/2a851cb0287a0df68eb6b38acb3f66b0.jpg");
const c6 = new Carta( `🛡️-❨❨⚙️•'Escudo do Dragão'•⚙️❩❩-🛡️
  『鉄の盾, Tetsu no Tate』`, 'defesa', -50, 0, `
  Custo De Energia:『-50%⚡』. 
  Um escudo reforçado que reduz os danos recebidos, mas consome energia considerável ao ser ativado. Ideal para momentos críticos de defesa.
  \n➖Essa Defesa É Moderada, Mas Custa Energia.`, "https://i.pinimg.com/736x/bd/24/d7/bd24d75a6ce216eb4d0c24a9879083fc.jpg");
const c7 = new Carta( `💨-❨❨⚔️•'Golpe Veloz'•⚔️❩❩-💨
  『速攻の一撃, Sokkō no Ichigeki』`, 'ataque', -40, -80, `
  Dano:『80%💔』. Custo De Energia:『-40%⚡』. 
  Um ataque ágil e preciso, perfeito para desgastar o inimigo rapidamente, mas sem causar danos extremos.
  \n➖Esse É Um Golpe Moderado Focado Em Agilidade.`, "https://i.pinimg.com/736x/75/5b/40/755b40649a49ae583ed65917ce7bd4fb.jpg");
const c8 = new Carta( `🌿-❨❨🌟•'Cura Natural'•🌟❩❩-🌿
  『自然治癒, Shizen Chiyu』`, 'ativada', 30, 30, `
  Regenera:『+30%⚡』De Energia. Regenera:『+30%❤️』De Vida.
  A energia natural do ambiente restaura o usuário, mas de forma mais contida. É ideal para prolongar batalhas com equilíbrio.
  \n➖Essa Habilidade Oferece Recuperação Moderada.`, "https://i.pinimg.com/736x/09/98/e7/0998e7d5f8c6d9ed332f720925a1d40e.jpg");
const c9 = new Carta( `🌁-❨❨👩🏻•'Fúria do Dragão'•👩🏻❩❩-🌁
    『ドラゴンの怒り, Doragon no Ikari』`, `ataque`, -40, -100,
  `Dano:『100%💔』. Custo De Energia:『-40%⚡』.  
Os dragões do novo mundo, apesar de raros, ensinam aos guerreiros técnicas destrutivas. Com esta habilidade, o usuário canaliza sua fúria e liberta um golpe avassalador em forma de chamas.  
\n➖Essa É Uma Habilidade Ofensiva Avançada.`, 'https://i.pinimg.com/736x/fc/76/3a/fc763a16f3fec09834ce0c607da0f41e.jpg');
const c10 = new Carta( `🌁-❨❨👩🏻•'Fúria do Oceano'•👩🏻❩❩-🌁
    『オーシャンフューリー, Ōshanfu~yūrī』`, `ataque`, -90, -100,
  `Dano:『100%💔』. Custo De Energia:『-90%⚡』.  
O usuário dessa habilidade usa da Magia aquática para causar danos severos à quem for atingido.  
\n➖Essa É Uma Habilidade Ofensiva Avançada.`, 'https://i.pinimg.com/736x/c3/54/b4/c354b49cb8b3923cdd768e17a7f194b7.jpg');
const c11 = new Carta( `🌁-❨❨•'The World'•❩❩-🌁『ザ・ワールド, Za wārudo』`, `defesa`, -50, 0, `Custo De Energia:『-90%⚡』. O usuário dessa carta Pausa o tempo por 5 segundos, impedindo seu adversário de ataca-lo.`, `https://i.pinimg.com/736x/d5/c4/38/d5c4389ae16d0ead7c84b94318e649c4.jpg`)
const NPC = new Jogador(`Asta`, [c1, c2, c3, c4, c7, c3], 300, 300, `https://www.pngall.com/wp-content/uploads/14/Dio-PNG-Images.png`, `https://www.pngarts.com/files/10/Dio-PNG-High-Quality-Image.png`)
const Player = new Jogador(`Jogador`, [c5, c2, c6, c7, c8, c9, c10, c6, c7], 300, 300, `https://dl.bc.cdn.garenanow.com/bcm/br/img/character/character_a1.png`)
NPC.cartas = NPC.cartas.map(carta => carta.clone());
Player.cartas = Player.cartas.map(carta => carta.clone());

// Rota principal

app.get('/', (req, res) => {
  res.render('preRegister');
});

app.get('/game', (req, res) => {
  res.render('index', { NPC: NPC, Player: Player });
});

// Nova rota para retornar as cartas como JSON
app.get('/cartas', (req, res) => {
  res.json(NPC.cartas); // Retorna apenas as cartas de NPC
});

app.get('/npc', (req, res) => {
  res.json({ NPC, Player }); // Retorna apenas as cartas de NPC
});

// Inicializando o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});