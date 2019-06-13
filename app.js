new Vue({
  el: "#app",
  data: {
    titulo: "O Matador de Monstros",
    vidaMonstro: 100,
    vidaJogador: 100,
    emJogo: false,
    historicoAcoes: [],
    resultado: ''
  },
  computed: {
    barraVidaMonstro() {
      return {
        width: `${this.vidaMonstro}%`
      }
    },
    barraVidaJogador() {
      return {
        width: `${this.vidaJogador}%`
      }
    },
    jogoEmAndamento() {
      return this.emJogo ? ((this.vidaMonstro === 0 || this.vidaJogador === 0) ? false : true) : false
    },
  },
  methods: {
    iniciarJogo() {
      this.emJogo = true
      this.vidaJogador = 100
      this.vidaMonstro = 100
      this.historicoAcoes = []
      this.resultado = ''
    },
    atacar() {
      let dano = this.obterDanoMonstro()
      this.vidaJogador = this.vidaJogador - dano
      this.vidaJogador = this.vidaJogador < 0 ? 0 : this.vidaJogador
      this.registrarHistoricoAtaqueMonstro(dano)

      dano = this.obterDanoJogador()
      this.vidaMonstro = this.vidaMonstro - dano
      this.vidaMonstro = this.vidaMonstro < 0 ? 0 : this.vidaMonstro
      this.registrarHistoricoAtaqueJogador(dano)
    },
    atacarComGolpeEspecial() {
      let dano = this.obterDanoMonstro()
      this.vidaJogador = this.vidaJogador - dano
      this.vidaJogador = this.vidaJogador < 0 ? 0 : this.vidaJogador
      this.registrarHistoricoAtaqueMonstro(dano)

      dano = this.obterDanoEspecialJogador()
      this.vidaMonstro = this.vidaMonstro - dano
      this.vidaMonstro = this.vidaMonstro < 0 ? 0 : this.vidaMonstro
      this.registrarHistoricoAtaqueJogador(dano)
    },
    curar () {
      let cura = this.obterCuraJogador()
      this.vidaJogador = this.vidaJogador + cura
      this.vidaJogador = this.vidaJogador > 100 ? 100 : this.vidaJogador
      this.registrarHistoricoCuraJogador(cura)

      let dano = this.obterDanoJogador()
      this.vidaJogador = this.vidaJogador - dano
      this.vidaJogador = this.vidaJogador < 0 ? 0 : this.vidaJogador
      this.registrarHistoricoAtaqueMonstro(dano)
    },
    desistir () {
      this.emJogo = false
      this.resultado = "Você desistiu do jogo!"
    },
    obterDanoJogador () {
      return Math.floor(Math.random() * 6)
    },
    obterDanoEspecialJogador () {
      return Math.floor(Math.random() * 16)
    },
    obterDanoMonstro () {
      return Math.floor(Math.random() * 11)
    },
    obterCuraJogador () {
      return Math.floor(Math.random() * 16)
    },
    registrarHistoricoAtaqueMonstro(dano) {
      this.historicoAcoes.push({menssagem:`MONSTRO ATINGIU JOGADOR COM ${dano}`, estilo: "historico-ataque-monstro"})
    },
    registrarHistoricoAtaqueJogador(dano) {
      this.historicoAcoes.push({menssagem:`JOGADOR ATINGIU MONSTRO COM ${dano}`, estilo: "historico-ataque-jogador"})
    },
    registrarHistoricoCuraJogador(cura) {
      this.historicoAcoes.push({menssagem:`JOGADOR FOI CURADO EM ${cura}`, estilo: "historico-cura-jogador"})
    }
  }
});