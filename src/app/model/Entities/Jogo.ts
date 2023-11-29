export default class Jogo {
  private _id!: string;
  private _nome!: string;
  private _plataforma!: string;
  private _genero!: Genero;
  private _avaliacao!: number;
  private _preco!: number;
  private _downloadURL: any;

  constructor(nome: string, plataforma: string, genero: Genero, avaliacao: number, preco: number) {
    this._nome = nome;
    this._plataforma = plataforma;
    this._avaliacao = avaliacao;
    this._genero = genero;
    this._preco = preco;
  }

  public get id(): string {
    return this._id;
  }
  public set id(value: string) {
    this._id = value;
  }

  public get nome(): string {
    return this._nome;
  }
  public set nome(value: string) {
    this._nome = value;
  }

  public get plataforma(): string {
    return this._plataforma;
  }
  public set plataforma(value: string) {
    this._plataforma = value;
  }

  public get genero(): Genero {
    return this._genero;
  }
  public set genero(value: Genero) {
    this._genero = value;
  }

  public get avaliacao(): number {
    return this._avaliacao;
  }
  public set avaliacao(value: number) {
    this._avaliacao = value;
  }

  public get preco(): number {
    return this._preco;
  }
  public set preco(value: number) {
    this._preco = value;
  }

  get downloadURL(): any {
    return this._downloadURL;
  }

  set downloadURL(downloadURL: any) {
    this._downloadURL = downloadURL;
  }
}
export enum Genero {
  ACAO = 'Ação',
  TERROR = 'Terror',
  TIRO = 'Tiro',
  RPG = 'Rpg',
  AVENTURA = 'Aventura',
}
