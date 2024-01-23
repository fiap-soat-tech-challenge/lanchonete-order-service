import { ItemPedido } from './item-pedido';

export class Pedido {
  private readonly _id: number | null;
  private readonly _codigoPedido: number;
  private readonly _cpfCliente: string;
  private readonly _itensPedido: Array<ItemPedido>;
  private readonly _precoTotal: number;
  private readonly _dataHoraCadastro: Date;

  public constructor(
    codigoPedido: number,
    cpfCliente: string,
    itensPedido: Array<ItemPedido>,
  );

  public constructor(
    id: number,
    codigoPedido: number,
    cpfCliente: string,
    itensPedido: Array<ItemPedido>,
    precoTotal: number,
    dataHoraCadastro: Date,
  );

  public constructor(...params: any[]) {
    if (params.length === 3) {
      this._codigoPedido = params[0];
      this._cpfCliente = params[1];
      this._itensPedido = params[2];
      this._precoTotal = this.getPrecoTotal(params[2]);
      return;
    }
    this._id = params[0];
    this._codigoPedido = params[1];
    this._cpfCliente = params[2];
    this._itensPedido = params[3];
    this._precoTotal = params[4];
    this._dataHoraCadastro = params[5];
  }

  get id(): number | null {
    return this._id;
  }

  get codigoPedido(): number {
    return this._codigoPedido;
  }

  get cpfCliente(): string {
    return this._cpfCliente;
  }

  get itensPedido(): Array<ItemPedido> {
    return this._itensPedido;
  }

  get precoTotal(): number {
    return this._precoTotal;
  }

  get dataHoraCadastro(): Date {
    return this._dataHoraCadastro;
  }

  private getPrecoTotal(itensPedido: Array<ItemPedido>): number {
    return itensPedido.reduce((valor, item) => {
      return valor + item.preco;
    }, 0);
  }
}
