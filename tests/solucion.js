var should = require('should');

const AnchoEspada = require('../domain/AnchoEspada');
const SieteEspada = require('../domain/SieteEspada');
const AnchoBasto = require('../domain/AnchoBasto');
const TresOro = require('../domain/TresOro');
const EnvidoValue = require('../domain/EnvidoValue');
const CincoOro = require('../domain/CincoOro');
const SeisOro = require('../domain/SeisOro');
const SieteOro = require('../domain/SieteOro');
const Envido = require('../domain/Envido');
const Mano = require('../domain/Mano');

describe('Truco', () => {

    it('test_ancho_de_espada_mata_siete_espada', () => {

        const carta = new AnchoEspada().compite(new SieteEspada())

        should(carta.equals(new AnchoEspada())).be.eql(true)
    });
    it('test_ancho_de_basto_mata_siete_espada', () => {

        const carta = new AnchoBasto().compite(new SieteEspada())

        should(carta.equals(new AnchoBasto())).be.eql(true)
    });
    it('test_ancho_de_basto_pierde_ancho_espada', () => {

        const carta = new AnchoBasto().compite(new AnchoEspada())

        should(carta.equals(new AnchoEspada())).be.eql(true)
    });
    it('test_siete_espada_pierde_con_ancho_espada', () => {

        const carta = new AnchoBasto().compite(new AnchoEspada())

        should(carta.equals(new AnchoEspada())).be.eql(true)
    });
    it('test_envido_triada_jugando_envido_equals_28', () => {

        should(
            new Mano(new TresOro(), new CincoOro(), new AnchoEspada())
            .play(new Envido())
            .equals(new EnvidoValue(28))
        ).be.eql(true);
    });
    it('test_envido_triada_jugando_envido_equals_29', () => {

        should(
            new Mano(new TresOro(), new SeisOro(), new AnchoEspada())
            .play(new Envido())
            .equals(new EnvidoValue(29))
        ).be.eql(true);
    });
    it('test_envido_triada_jugando_envido_equals_33', () => {

        should(
            new Mano(new SeisOro(), new SieteOro(), new AnchoEspada())
            .play(new Envido())
            .equals(new EnvidoValue(33))
        ).be.eql(true);
    });
    it('test_envido_triada_jugando_envido_equals_7', () => {

        should(
            new Mano(new CincoOro(), new SieteEspada(), new AnchoBasto())
            .play(new Envido())
            .equals(new EnvidoValue(7))
        ).be.eql(true);
    });
    it('test_A_plays_5oro_B_plays_anchoEspada_A_go_to_the_mazo_B_sum_1_point', () => {

        const a = new Mano(new CincoOro(), new CuatroCopa(), new CuatroBasto())
        const b = new Mano(new AnchoEspada(), new SieteEspada(), new SeisOro())

        
        const ricky = new Player(a);
        const nacho = new Player(a);
        
        const turn = new Turn(ricky, nacho);

        ricky.play(new CincoOro())
        nacho.play(new AnchoEspada())
        
        ricky.goToTheMaso(turn)

        should(
            turn.scoreOf(nacho)
        ).be.eql(1);
    });
});