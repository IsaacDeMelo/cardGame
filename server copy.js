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
      this.modelo = modelo;
      this.nome = nome;
      this.tipo = tipo;
      this.custoEnergia = custoEnergia;
      this.dano = dano;
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
    }
}

const c1 = new Carta(`🌁-❨❨👩🏻•'Cogumelos Envenenados'•👩🏻❩❩-🌁
         『毒きのこ; Doku kinoko』`, `veneno`, -50, -20, `
➖ ᯓ ➖ ᯓ  ⸨❨ '👩🏻͜͡ꦿ ❩⸩  ᯓ ➖ ᯓ ➖
✨🌈🌷🍀🌧️🦋🌤️🥀🍃✨🌛
      🦋🍃✨🌤️🌈🍀🍃🌙🍂
      
                     (  ( °ᭃ🦠 ːꦼ )  )                                
          ᯏ ꦿꦼ🌁ːꦼ͜͡ꦿ      ᯓ 🍃°ᭃ  ᯟ
  ( 🦠 ᯓ👩🏻͜͡ꦿ  ↜       ↝   🦠ᯓ 👩🏻ꦿꦼ )
                         °ᭃ🌁ːꦼ )  )
       (  (' ᭄ꦿ✨ꦿꦼ:       ᭄ꦿꦼ     °ᭃ🍄͜͡ꦿ )ᘝ )
                     (  ( °ᭃ🦠 ːꦼ )  )    
          ᯏ ꦿꦼ🍃ːꦼ͜͡ꦿ      ᯓ 🌁°ᭃ  ᯟ
  ( 👩🏻 ᯓ🦠͜͡ꦿ  ↜       ↝   👩🏻ᯓ 🦠ꦿꦼ )
                         °ᭃ👩🏻ːꦼ )  )
     (  (' ᭄ꦿ🍄ꦿꦼ:       ᭄ꦿꦼ     °ᭃ✨͜͡ꦿ )ᘝ )
                     (  ( °ᭃ🦠 ːꦼ )  )      
          ᯏ ꦿꦼ🌁ːꦼ͜͡ꦿ      ᯓ 🍃°ᭃ  ᯟ
  ( 🦠 ᯓ👩🏻͜͡ꦿ  ↜       ↝   🦠ᯓ 👩🏻ꦿꦼ )
                         °ᭃ🌁ːꦼ )  )
       (  (' ᭄ꦿ✨ꦿꦼ:       ᭄ꦿꦼ     °ᭃ🍄͜͡ꦿ )ᘝ )
                     (  ( °ᭃ👩🏻 ːꦼ )  )        
 🌿🐿️🌳🍂🍄🌾🐿️🐚🍀🎋🐾
➖ ᯓ ➖ ᯓ  ⸨❨ '👩🏻͜͡ꦿ ❩⸩  ᯓ ➖ ᯓ ➖

▪️⏺️🌁👩🏻▪`, `Os tigres de West comeram ração estragada, os humanos do novo mundo também. Enganados por um famoso chefe alemão. Todos os dias passam mal e acabam descontando no campo de batalha.
➖Caso Atinja O Oponente, O Mesmo Será Envenenado Com『-20%💔』De Vida Por Round.
➖Esse Envenenamento É Uma Habilidade Básica.`)
const c2 = new Carta(`Regeneração Real`, 'ativada', 50, 50, `🌁-((👩🏻•'Regeneração Real'•👩🏻))-🌁
         『本当の再生; Hontō no Saisei』

   ᯓ᭄ꦿ❗"(  ( Ativação)  )❗"᭄ꦿᯓ
➖ ᯓ ➖ ᯓ  ⸨❨ '👩🏻͜͡ꦿ ❩⸩  ᯓ ➖ ᯓ ➖
✨🌈🌷🍀🌧️🦋🌤️🥀🍃✨🌛
      🦋🍃✨🌤️🌈🍀🍃🌙🍂

   °ᭃ👑👩🏻ꦿꦼ   »»   ᭄ꦿ  ««    👑ꦿꦼ»👩🏻
             (ᯓ (    ꦿꦼ🌁ːꦼ" ) ᘝ)
      (  ᭄ꦿ✨ꦿꦼ        🤞🏻       ːꦼ✨ꦼꦿ )
   • - ( ( ːꦼ"👩🏻°ᭃ  ) ) - •
 ᯏ  ːꦼ💞᭄ꦿ ↜        ᭄͜͡ꦿ     ↝ ᘝ💞ꦿꦼ  ᯟ
                       • - ( ( ːꦼ"👩🏻°ᭃ  ) ) - •
°ᭃ👑👩🏻ꦿꦼ   »»   ᭄ꦿ  ««    👑ꦿꦼ»👩🏻
                 (ᯓ (    ꦿꦼ🌁ːꦼ" ) ᘝ)
     (  ᭄ꦿ✨ꦿꦼ        👋🏻       ːꦼ✨ꦼꦿ )
   • - ( ( ːꦼ"👩🏻°ᭃ  ) ) - •
 ᯏ  ːꦼ💞᭄ꦿ ↜        ᭄͜͡ꦿ     ↝ ᘝ💞ꦿꦼ  ᯟ
                       • - ( ( ːꦼ"👩🏻°ᭃ  ) ) - •
      (  ᭄ꦿ✨ꦿꦼ        🤞🏻       ːꦼ✨ꦼꦿ )
            (ᯓ (    ꦿꦼ🌁ːꦼ" ) ᘝ)
 🌿🐿️🌳🍂🍄🌾🐿️🐚🍀🎋🐾
➖ ᯓ ➖ ᯓ  ⸨❨ '👩🏻͜͡ꦿ ❩⸩  ᯓ ➖ ᯓ ➖

Regenera:『+50%⚡』De Energia.
Regenera:『+50%❤️』De Vida. 

▪️⏺️🌁👩🏻▪
A realeza do novo mundo aguarda ansiosamente por batalhas. Uma das razões para isso é que eles tem técnicas secretas nunca antes vistas e querem testa-las em seus inimigos. Regenerar é uma de suas muitas habilidades.`)
const c3 = new Carta(`Arremesso De Lâminas`, 'ataque', 0, -130, `⏺️-❨❨🌁•'Arremesso De Lâminas'•🌁❩❩-⏺️
    『ブレード投げ , Burēdo nage』 

➖ ᯓ ➖ ᯓ  ⸨❨ '🌁ꦿ ❩⸩  ᯓ ➖ ᯓ ➖
🌧️☀️🌩️🌈⛈️🌙🌧️☀️🌫️🦋⛈️
      ⛈️🦋🌫️☀️🌩️✨🌈🌧️🌩️

                             ↝' °🗡️ꦿ〫   )   )
   (   (ːꦼ"🌊ꦿ°                    °🌊ꦿ"ːꦼ)   )
                      ᯏ  •ꦼ🌁᭄ꦿᭃ
        ᯓ⚫ꦿː_—•    😉    •—_ːᯓ⚫ꦿː
                       •—_🗡️ꦿ』
          ●●●                       🗡️⟅͜͡ꦿ •ꦼ
           ᯏ (   ᭄ׂׂꦿ😦⟅ꦿᭃ )
    ↜ 🗡️ꦿ•ꦼ                ●●●
                      ᯏ  •ꦼ🌁᭄ꦿᭃ
   (   (ːꦼ"🌊ꦿ°                    °🌊ꦿ"ːꦼ)   )
                 (   (   °🗡️ꦿ〫 '↜
🍄🐜🌳🍃🌹🦨🍄🍃🌳🐚🥀
➖ ᯓ ➖ ᯓ  ⸨❨ '🌁ꦿ ❩⸩  ᯓ ➖ ᯓ ➖

Dano:『130%💔』

▪️⏺️🌁▪
Assim como na sua técnica corporal, os navegadores usam a força do corpo, mas dessa vez aliada a pontaria e sorte para acertar o adversário com suas lâminas. Eles miram e jogam, tudo friamente calculado, caso acerte também pode matar.
➖Esse É Um Golpe Básico À Distância.`)
const c4 = new Carta(`Mil Coordenadas`, `defesa`, -50, 0, `⏺️-❨❨🌁•'Mil Coordenadas'•🌁❩❩-⏺️
     『千の座標, Sen no zahyō』 

➖ ᯓ ➖ ᯓ  ⸨❨ '🌁ꦿ ❩⸩  ᯓ ➖ ᯓ ➖
🌧️☀️🌩️🌈⛈️🌙🌧️☀️🌫️🦋⛈️
      ⛈️🦋🌫️☀️🌩️✨🌈🌧️🌩️

                   ᯓ᭄ꦿ°🌁°᭄ꦿᯓ
 (    (ːꦼ🍂͜͡:ꦿ                    ːꦼ🌬️͜͡:ꦿ)    )
                      =͟͟͞("ᘝ🧭ᘜ")͟͟͞=
   •—🍃ꦿ"          ᯓ        "🥸ꦿ—•
               •—(   ( °🌁° )   )—•
             _'↝                 ⚡ ᭄ꦿ- ----
               (   (   (ːꦼ"🤫"ːꦼ)   )   )
     ---- - ᭄ꦿ⚡              ↜'_
               •—(   ( °🌁° )   )—•
   •—🥸ꦿ"          ᯓ        "🍃ꦿ—•
                      =͟͟͞("ᘝ🧭ᘜ")͟͟͞=
 (    (ːꦼ🍂͜͡:ꦿ                    ːꦼ🌬️͜͡:ꦿ)    )
                   ᯓ᭄ꦿ°🌁°᭄ꦿᯓ
🍄🐜🌳🍃🌹🦨🍄🍃🌳🐚🥀
➖ ᯓ ➖ ᯓ  ⸨❨ '🌁ꦿ ❩⸩  ᯓ ➖ ᯓ ➖

Custo De Energia:『-50%⚡』

▪️⏺️🌁▪
Com esta técnica o usuário usa de sua inteligência para criar várias pistas falsas de sua localização, fazendo o seu oponente seguir caminhos diferentes, e com isso criando tempo suficiente para se ocultar de qualquer ameaça ou até mesmo tomar um cházinho.
➖Esse Movimento É Uma Ocultação Básica.`)
const Dio = new NPC(`Dio`, [c1, c2, c3, c4], 300, 300, `https://static.wikia.nocookie.net/animeverso/images/9/99/411-4118688_dio-jojo-png.png/revision/latest/scale-to-width-down/340?cb=20230624165031&path-prefix=pt-br`)


// Rota principal
app.get('/', (req, res) => {
  res.render('index', {Dio: Dio});
  console.log(Dio);
});

// Inicializando o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});