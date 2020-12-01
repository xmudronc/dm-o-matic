export class Monster {

  public getLocation(roll) {
    return this.locations[roll - 1];
  }

  private locations = [
        {
          name: "Head",
          roll: 1,
          penalty: -6,
          dmgMultiplier: 3
        },
        {
          name: "Torso",
          roll: 2,
          penalty: -1,
          dmgMultiplier: 1
        },
        {
          name: "Torso",
          roll: 3,
          penalty: -1,
          dmgMultiplier: 1
        },
        {
          name: "Torso",
          roll: 4,
          penalty: -1,
          dmgMultiplier: 1
        },
        {
          name: "Torso",
          roll: 5,
          penalty: -1,
          dmgMultiplier: 1
        },
        {
          name: "R.Limb",
          roll: 6,
          penalty: -3,
          dmgMultiplier: 1/2
        },
        {
          name: "R.Limb",
          roll: 7,
          penalty: -3,
          dmgMultiplier: 1/2
        },
        {
          name: "L.Limb",
          roll: 8,
          penalty: -3,
          dmgMultiplier: 1/2
        },
        {
          name: "L.Limb",
          roll: 9,
          penalty: -3,
          dmgMultiplier: 1/2
        },
        {
          name: "Tail or Wing",
          roll: 10,
          penalty: -2,
          dmgMultiplier: 1/2
        }
      ];
}