export class Humanoid {

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
        name: "R.Arm",
        roll: 5,
        penalty: -3,
        dmgMultiplier: 1/2
      },
      {
        name: "L.Arm",
        roll: 6,
        penalty: -3,
        dmgMultiplier: 1/2
      },
      {
        name: "R.Leg",
        roll: 7,
        penalty: -2,
        dmgMultiplier: 1/2
      },
      {
        name: "R.Leg",
        roll: 8,
        penalty: -2,
        dmgMultiplier: 1/2
      },
      {
        name: "L.Leg",
        roll: 9,
        penalty: -2,
        dmgMultiplier: 1/2
      },
      {
        name: "L.Leg",
        roll: 10,
        penalty: -2,
        dmgMultiplier: 1/2
      }
    ];
}