import React, { Component } from 'react';

import bb from '../img/bb.svg';
import bk from '../img/bk.svg';
import bp from '../img/bp.svg';
import br from '../img/br.svg';
import bq from '../img/bq.svg';
import bkn from '../img/bkn.svg';

import wb from '../img/wb.svg';
import wk from '../img/wk.svg';
import wp from '../img/wp.svg';
import wr from '../img/wr.svg';
import wq from '../img/wq.svg';
import wkn from '../img/wkn.svg';

class PieceSquare extends Component {
  constructor() {
    super();
    this.state = {
      w: {
        k: wk,
        q: wq,
        r: wr,
        kn: wkn,
        b: wb,
        p: wp,
      },
      b: {
        k: bk,
        q: bq,
        r: br,
        kn: bkn,
        b: bb,
        p: bp,
      },
    };
  }

  render() {
    const state = this.state;
    const { color, piece, i } = this.props;
    let style = { backgroundColor: '#CCC' };
    // if (color === 'w'){
    //     style.gridColumn = 4 - (i % 4);
    // }
    return (
      <div className="square" style={style}>
        {<img src={color && piece ? state[color][piece] : null} alt="" />}
      </div>
    );
  }
}

export default PieceSquare;
