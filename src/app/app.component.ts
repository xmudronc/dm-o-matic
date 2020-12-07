import { Component } from '@angular/core';
import { Humanoid } from './components/damage_locations/humanoid';
import { Monster } from './components/damage_locations/monster';
import { Enemies } from './components/enemies';
import { CriticalWounds } from './components/critical_wounds';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  humanoid = new Humanoid();
  monster = new Monster();
  enemies = new Enemies();
  crits = new CriticalWounds();

  humanoidSelected = false;
  monsterSelected = false;
  specterSelected = false;
  elementalSelected = false;

  humanoidAim = false;
  specterAim = false;
  monsterAim = true;

  getBodyPart(enemy) {
    let location: any = document.querySelector('input[name="location"]:checked');
    let aimed = location.value.split("|")[1] == 0 ? false : true;
    switch (enemy.type) {
      case Enemies.HUMANOID:
        return {
          aimed: aimed,
          type: Enemies.HUMANOID,
          bodyPart: aimed 
            ? this.humanoid.getLocation(location.value.split("|")[1]) 
            : this.humanoid.getLocation(this.crits.roll("1d10"))
        }
      case Enemies.MONSTER:
        return {
          aimed: aimed,
          type: Enemies.MONSTER,
          bodyPart: aimed 
            ? this.monster.getLocation(location.value.split("|")[1]) 
            : this.monster.getLocation(this.crits.roll("1d10"))
        }
      case Enemies.SPECTER:
        return {
          aimed: aimed,
          type: Enemies.SPECTER,
          bodyPart: aimed 
            ? this.humanoid.getLocation(location.value.split("|")[1]) 
            : this.humanoid.getLocation(this.crits.roll("1d6"))
        }
      case Enemies.ELEMENTAL:
        return {
          aimed: aimed,
          type: Enemies.ELEMENTAL,
          bodyPart: aimed 
            ? this.humanoid.getLocation(location.value.split("|")[1]) 
            : this.humanoid.getLocation(this.crits.roll("1d10"))
        }
    }
  }

  magic() {
    let atk: any = document.querySelector("#atk");
    let def: any = document.querySelector("#def");
    let enemy: any = document.querySelector('input[name="enemy"]:checked');
    this.isCrit(atk.value, def.value, this.enemies.getEnemies(enemy.value));
  }

  isCrit(atk, def, target) {
    let value = atk - def;
    if (value >= 7 && value < 10) {
      this.determineCrit(CriticalWounds.SIMPLE, target);
    } else if (value >= 10 && value < 13) {
      this.determineCrit(CriticalWounds.COMPLEX, target);
    } else if (value >= 13 && value < 15) {
      this.determineCrit(CriticalWounds.DIFFICULT, target);
    } else if (value >= 15) {
      this.determineCrit(CriticalWounds.DEADLY, target);
    }
  }

  determineCrit(type, target) {
    let critTable = {
      simple: {
        type: CriticalWounds.SIMPLE,
        damage: 3
      },
      complex: {
        type: CriticalWounds.COMPLEX,
        damage: 5
      },
      difficult: {
        type: CriticalWounds.DIFFICULT,
        damage: 8
      },
      deadly: {
        type: CriticalWounds.DEADLY,
        damage: 10
      }
    }

    switch (type) {
      case CriticalWounds.SIMPLE:
        this.determineLocation(critTable.simple, target);
        break;
      case CriticalWounds.COMPLEX:
        this.determineLocation(critTable.complex, target);
        break;
      case CriticalWounds.DIFFICULT:
        this.determineLocation(critTable.difficult, target);
        break;
      case CriticalWounds.DEADLY:
        this.determineLocation(critTable.deadly, target);
        break;
    }
  }

  determineLocation(critDmg, target) {
    let criElement = document.querySelector("#critdamage");
    let namElement = document.querySelector("#name");
    let effElement = document.querySelector("#effect");
    let staElement = document.querySelector("#stabilized");
    let treElement = document.querySelector("#treated");

    let bodyPart = this.getBodyPart(target);
    console.log("Crit DMG to HP:", critDmg.damage);

    let crit = undefined;
    if (bodyPart.aimed) {
      if (bodyPart.bodyPart.name === "Head" || bodyPart.bodyPart.name === "Torso") {
        let greater = this.crits.roll("1d6") >= 5 ? true : false;
        if (greater) {
          if (bodyPart.bodyPart.name === "Head") {
            crit = this.getCritWithRoll(target, critDmg.type, 12);
          } else if (bodyPart.bodyPart.name === "Torso") {
            crit = this.getCritWithRoll(target, critDmg.type, 9);
          }
        } else {
          if (bodyPart.bodyPart.name === "Head") {
            crit = this.getCritWithRoll(target, critDmg.type, 11);
          } else if (bodyPart.bodyPart.name === "Torso") {
            crit = this.getCritWithRoll(target, critDmg.type, 6);
          }
        }
      } else {
        if (bodyPart.bodyPart.name.split(".")[1] === "Arm") {
          crit = this.getCritWithRoll(target, critDmg.type, 4);
        } else if (bodyPart.bodyPart.name.split(".")[1] === "Leg") {
          crit = this.getCritWithRoll(target, critDmg.type, 2);
        } else if (bodyPart.bodyPart.name.split(".")[1] === "Limb") {
          crit = this.getCritWithRoll(target, critDmg.type, 4);
        } else {
          crit = this.getCritWithRoll(target, critDmg.type, 2);
        }
      }
    } else {
      crit = this.getCrit(target, critDmg.type);
    }

    if (crit.name !== undefined) {
      console.log("Crit:", crit);
      criElement.innerHTML = critDmg.type + ", " + critDmg.damage + " to HP";
      namElement.innerHTML = crit.name;
      effElement.innerHTML = crit.effect;
      staElement.innerHTML = crit.stabilized;
      treElement.innerHTML = crit.treated;
    } else {
      console.log("Crit DMG bonus:", crit);
      criElement.innerHTML = critDmg.type + ", " + critDmg.damage + " to HP";
      namElement.innerHTML = "Bonus Damage";
      effElement.innerHTML = crit;
      staElement.innerHTML = "-";
      treElement.innerHTML = "-";
    }

  }

  getCrit(target, type) {
    if (target.type === Enemies.SPECTER) {
      return this.crits.getSpecterCrit(type);
    } else if (target.type === Enemies.ELEMENTAL) {
      return this.crits.getElementalCrit(type);
    } else {
      return this.crits.getCrit(type);
    }
  }

  getCritWithRoll(target, type, roll) {
    if (target.type === Enemies.SPECTER) {
      return this.crits.getSpecterCritWithRoll(type, roll);
    } else if (target.type === Enemies.ELEMENTAL) {
      return this.crits.getElementalCritWithRoll(type, roll);
    } else {
      return this.crits.getCritWithRoll(type, roll);
    }
  }

  aimRadioChange(event) {
    switch (event.target.value.split("|")[0]) {
      case "Random":
        this.humanoidSelected = false;
        this.monsterSelected = false;
        this.specterSelected = false;
        this.elementalSelected = false;
      break;
      case "Head":
        this.humanoidSelected = false;
        this.monsterSelected = false;
        this.specterSelected = false;
        this.elementalSelected = false;
      break;
      case "Torso":
        this.humanoidSelected = false;
        this.monsterSelected = false;
        this.specterSelected = false;
        this.elementalSelected = false;
      break;
      case "R.Arm":
        this.humanoidSelected = false;
        this.monsterSelected = true;
        this.specterSelected = false;
        this.elementalSelected = false;
      break;
      case "L.Arm":
        this.humanoidSelected = false;
        this.monsterSelected = true;
        this.specterSelected = false;
        this.elementalSelected = false;
      break;
      case "R.Leg":
        this.humanoidSelected = false;
        this.monsterSelected = true;
        this.specterSelected = true;
        this.elementalSelected = false;
      break;
      case "L.Leg":
        this.humanoidSelected = false;
        this.monsterSelected = true;
        this.specterSelected = true;
        this.elementalSelected = false;
      break;
      case "R.Limb":
        this.humanoidSelected = true;
        this.monsterSelected = false;
        this.specterSelected = true;
        this.elementalSelected = true;
      break;
      case "L.Limb":
        this.humanoidSelected = true;
        this.monsterSelected = false;
        this.specterSelected = true;
        this.elementalSelected = true;
      break;
      case "Tail.or.Wings":
        this.humanoidSelected = true;
        this.monsterSelected = false;
        this.specterSelected = true;
        this.elementalSelected = true;
      break;
    }
  }

  enemyRadioChange(event) {
    switch (Number(event.target.value)) {
      case 0:
        this.humanoidAim = false;
        this.specterAim = false;
        this.monsterAim = true;
      break;
      case 1:
        this.humanoidAim = true;
        this.specterAim = true;
        this.monsterAim = false;
      break;
      case 2:
        this.humanoidAim = false;
        this.specterAim = true;
        this.monsterAim = true;
      break;
      case 3:
        this.humanoidAim = false;
        this.specterAim = false;
        this.monsterAim = true;
      break;
    }
  }
  
}
