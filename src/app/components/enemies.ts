export class Enemies {
    public getEnemies(index) {
      return this.enemies[index];
    }

    static readonly HUMANOID = "HUMANOID";
    static readonly MONSTER = "MONSTER";
    static readonly SPECTER = "SPECTER";
    static readonly ELEMENTAL = "ELEMENTAL";
    
    private enemies = [
      {
        name: "Odrin",
        type: Enemies.HUMANOID
      },
      {
        name: "Wyvern",
        type: Enemies.MONSTER
      },
      {
        name: "Odrin's ghost",
        type: Enemies.SPECTER
      },
      {
        name: "Bender",
        type: Enemies.ELEMENTAL
      }
      ];
}