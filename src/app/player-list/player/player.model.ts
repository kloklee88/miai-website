import { RoleMmr } from './rolemmr.model';

export class PlayerList {
  public players: Player[];
}

export class Player {
    public name: String;
    public level: Number;
    public rankTier: String;
    public rankDivision: Number;
    public overallMmr: Number;
    public roleMmrs: RoleMmr[];
    public chosenRoles: String[];
    public useFlashCorrectly: Boolean;
    public lastUpdate: Date;

    constructor() {
      this.chosenRoles = [];
      this.chosenRoles.push(new String);
    }
  }