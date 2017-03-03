'use strict';

module.exports = function(d3) {
  var indicatorMixin = require('./indicatormixin')(),
      accessor = require('../accessor')(),
      ema_init = require('./ema'),
      ema = ema_init(indicatorMixin, accessor.ohlc, ema_alpha_init),
      sma = require('./sma')(indicatorMixin, accessor.ohlc),
      atr = require('./atr')(indicatorMixin, accessor.ohlc, sma),
      vwap = require('./vwap')(indicatorMixin, accessor.ohlc);

  return {
    atr: atr,
    atrtrailingstop: require('./atrtrailingstop')(indicatorMixin, accessor.ohlc, atr),
    ema: ema,
    ichimoku: require('./ichimoku')(indicatorMixin, accessor.ohlc),
    macd: require('./macd')(indicatorMixin, accessor.ohlc, ema),
    rsi: require('./rsi')(indicatorMixin, accessor.ohlc, ema),
    sma: sma,
    wilderma: ema_init(indicatorMixin, accessor.ohlc, wilder_alpha_init),
    aroon: require('./aroon')(indicatorMixin, accessor.ohlc),
    stochastic: require('./stochastic')(indicatorMixin, accessor.ohlc, ema),
    williams: require('./williams')(indicatorMixin, accessor.ohlc, ema),
    adx: require('./adx')(indicatorMixin, accessor.ohlc, ema),
    bollinger: require('./bollinger')(indicatorMixin, accessor.ohlc, sma),
    vwap: vwap,
    afis: require('./afis')(d3.round)
   };
};

function ema_alpha_init(period) {
  return 2/(period+1);
}

function wilder_alpha_init(period) {
  return 1/period;
}
