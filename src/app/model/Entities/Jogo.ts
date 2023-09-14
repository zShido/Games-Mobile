export default class Jogo{
    private _id! : string;
    private _nome! : string;
    private _descricao! : string;
    private _genero! : Genero;
    private _avaliacao! : number;
    private _preco! : number;

    constructor(nome: string, descricao: string){
        this._nome = nome;
        this._descricao = descricao;
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
      
      public get descricao(): string {
        return this._descricao;
      }
      public set descricao(value: string) {
        this._descricao = value;
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
      
 
}
export enum Genero{
    ACAO = "Acao",
    TERROR = "Terror",
    TIRO = "Tiro",
    RPG = "Rpg",
    AVENTURA = "Aventura",
 }