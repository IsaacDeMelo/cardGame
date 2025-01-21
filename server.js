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
    constructor(id, nome, tipo, custoEnergia, dano, modelo, desc) {
      this.id = id; 
      this.nome = nome;
      this.tipo = tipo;
      this.custoEnergia = custoEnergia;
      this.dano = dano;
      this.modelo = modelo; 
      this.desc = desc;
    }
}
class NPC {
    constructor(nome, cartas, energia, vida, aparencia) {
        this.nome = nome;
        this.cartas = cartas;
        this.energia = energia;
        this.vida = vida;
        this.aparencia = aparencia;
        this.envenenado = { veneno: false, dano: 0 }
    }
    toJSON() {
      return {
        nome: this.nome,
        cartas: this.cartas,
        energia: this.energia,
        vida: this.vida,
        aparencia: this.aparencia,
        envenenado: this.envenenado,
      };
    }
}

const c1 = new Carta("1", `🌁-❨❨👩🏻•'Cogumelos Envenenados'•👩🏻❩❩-🌁
         『毒きのこ; Doku kinoko』`, `veneno`, -50, -20, `Os tigres de West comeram ração estragada, os humanos do novo mundo também. Enganados por um famoso chefe alemão. Todos os dias passam mal e acabam descontando no campo de batalha.
\n➖Caso Atinja O Oponente, O Mesmo Será Envenenado Com『-20%💔』De Vida Por Round.
\n➖Esse Envenenamento É Uma Habilidade Básica.`, `https://i.pinimg.com/736x/7f/c1/03/7fc103be42d9e05d6f44448361357f7f.jpg`)
const c2 = new Carta("2",`🌁-((👩🏻•'Regeneração Real'•👩🏻))-🌁
         『本当の再生; Hontō no Saisei』`, 'ativada', 50, 50, `Regenera:『+50%⚡』De Energia.
Regenera:『+50%❤️』De Vida. A realeza do novo mundo aguarda ansiosamente por batalhas. Uma das razões para isso é que eles tem técnicas secretas nunca antes vistas e querem testa-las em seus inimigos. Regenerar é uma de suas muitas habilidades.`, 'https://i.pinimg.com/736x/0a/75/7a/0a757a7ee46881d6a071add7eb8400fa.jpg')
const c3 = new Carta("3", `⏺️-❨❨🌁•'Arremesso De Lâminas'•🌁❩❩-⏺️
    『ブレード投げ , Burēdo nage』 `, 'ataque', -50, -130, `
Dano:『130%💔』. Custo De Energia:『-50%⚡』. Assim como na sua técnica corporal, os navegadores usam a força do corpo, mas dessa vez aliada a pontaria e sorte para acertar o adversário com suas lâminas. Eles miram e jogam, tudo friamente calculado, caso acerte também pode matar.
\n➖Esse É Um Golpe Básico À Distância.`, `https://i.pinimg.com/736x/0f/1c/71/0f1c7198564902495452cdfa8c4feff4.jpg` )
const c4 = new Carta("4", `⏺️-❨❨🌁•'Mil Coordenadas'•🌁❩❩-⏺️
     『千の座標, Sen no zahyō』 `, `defesa`, -50, 0, `Custo De Energia:『-50%⚡』. Com esta técnica o usuário usa de sua inteligência para criar várias pistas falsas de sua localização, fazendo o seu oponente seguir caminhos diferentes, e com isso criando tempo suficiente para se ocultar de qualquer ameaça ou até mesmo tomar um cházinho.
\n ➖Esse Movimento É Uma Ocultação Básica.`, `https://i.pinimg.com/736x/ad/3d/19/ad3d19ef9ea0aa71555b6ee86afdf068.jpg`)
const c5 = new Carta("5", `🌋-❨❨👊🏻•'Impacto Devastador'•👊🏻❩❩-🌋
  『破壊的な衝撃, Hakai-teki na Shōgeki』`, 'ataque', -50, -80,`
  Dano:『80%💔』. Custo De Energia:『-50%⚡』. 
  Os guerreiros do novo mundo canalizam sua força em um golpe poderoso, causando grande impacto, mas com alto custo de energia.
  \n➖Esse É Um Golpe De Alto Risco E Alta Recompensa.`, "https://i.pinimg.com/736x/21/25/fb/2125fba822083a77c8cb48f5a1c8f10f.jpg");
const c6 = new Carta("6", `🛡️-❨❨⚙️•'Escudo de Ferro'•⚙️❩❩-🛡️
  『鉄の盾, Tetsu no Tate』`, 'defesa', -50, 0,`
  Custo De Energia:『-50%⚡』. 
  Um escudo reforçado que reduz os danos recebidos, mas consome energia considerável ao ser ativado. Ideal para momentos críticos de defesa.
  \n➖Essa Defesa É Moderada, Mas Custa Energia.`, "https://i.pinimg.com/736x/9a/6f/1e/9a6f1e692a39773cb68a4ce9dca5f1f7.jpg");
const c7 = new Carta("7", `💨-❨❨⚔️•'Golpe Veloz'•⚔️❩❩-💨
  『速攻の一撃, Sokkō no Ichigeki』`, 'ataque', -40, -80,`
  Dano:『80%💔』. Custo De Energia:『-40%⚡』. 
  Um ataque ágil e preciso, perfeito para desgastar o inimigo rapidamente, mas sem causar danos extremos.
  \n➖Esse É Um Golpe Moderado Focado Em Agilidade.`, "https://i.pinimg.com/736x/75/5b/40/755b40649a49ae583ed65917ce7bd4fb.jpg");
const c8 = new Carta("8", `🌿-❨❨🌟•'Cura Natural'•🌟❩❩-🌿
  『自然治癒, Shizen Chiyu』`, 'ativada', 30, 30,`
  Regenera:『+30%⚡』De Energia. Regenera:『+30%❤️』De Vida.
  A energia natural do ambiente restaura o usuário, mas de forma mais contida. É ideal para prolongar batalhas com equilíbrio.
  \n➖Essa Habilidade Oferece Recuperação Moderada.`, "https://i.pinimg.com/736x/3d/91/18/3d9118975984e606f68a0bbe92edd716.jpg");
  const c9 = new Carta("9", `🌁-❨❨👩🏻•'Fúria do Dragão'•👩🏻❩❩-🌁
    『ドラゴンの怒り, Doragon no Ikari』`, `ataque`, -40, -100, 
`Dano:『100%💔』. Custo De Energia:『-40%⚡』.  
Os dragões do novo mundo, apesar de raros, ensinam aos guerreiros técnicas destrutivas. Com esta habilidade, o usuário canaliza sua fúria e liberta um golpe avassalador em forma de chamas.  
\n➖Essa É Uma Habilidade Ofensiva Avançada.`, 'https://i.pinimg.com/736x/f2/2a/22/f22a22d9d1c68250be3e08ec24df9b8e.jpg');
const Dio = new NPC(`Dio`, [c1, c2, c3, c4], 300, 300, `https://www.pngall.com/wp-content/uploads/14/Dio-PNG-Images.png`)
const Player = new NPC(`Jogador`, [c5, c6, c7, c8, c9], 300, 300, `https://dl.bc.cdn.garenanow.com/bcm/br/img/character/character_a1.png`)
// Rota principal
app.get('/', (req, res) => {
  res.render('index', {Dio: Dio});
});

// Nova rota para retornar as cartas como JSON
app.get('/cartas', (req, res) => {
    res.json(Dio.cartas); // Retorna apenas as cartas de Dio
  });

  app.get('/npc', (req, res) => {
    res.json({Dio, Player}); // Retorna apenas as cartas de Dio
  });
  

// Inicializando o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});