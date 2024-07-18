class Character {
    static MAX_HEALTH = 100;

    constructor(name) {
        this.name = name;
        this.health = Character.MAX_HEALTH;
        this.inventory = [];
    }

    roll(mod = 0) {
        const result = Math.floor(Math.random() * 20) + 1 + mod;
        console.log(`${this.name} rolled a ${result}.`);
        return result;
    }
}

class Adventurer extends Character {
    static ROLES = ["Fighter", "Healer", "Wizard"];

    constructor(name, role) {
        super(name);
        if (!Adventurer.ROLES.includes(role)) {
            throw new Error(`Invalid role: ${role}`);
        }
        this.role = role;
        this.inventory.push("bedroll", "50 gold coins");
    }

    scout() {
        console.log(`${this.name} is scouting ahead...`);
        super.roll();
    }

    duel(opponent) {
        while (this.health > 50 && opponent.health > 50) {
            const thisRoll = this.roll();
            const opponentRoll = opponent.roll();

            if (thisRoll > opponentRoll) {
                opponent.health -= 1;
            } else if (thisRoll < thisRoll) {
                this.health -= 1;
            }

            console.log(`${this.name} (Health: ${this.health}) rolled ${thisRoll}`);
            console.log(`${opponent.name} (Health: ${opponent.health}) rolled ${opponentRoll}`);
        }

        const winner = this.health > 50 ? this : opponent;
        console.log(`${winner.name} wins the duel with ${winner.health} health left!`);
    }
}

class Companion extends Character {
    constructor(name, type) {
        super(name);
        this.type = type;
    }
}

class AdventurerFactory {
    constructor(role) {
        this.role = role;
        this.adventurers = [];
    }

    generate(name) {
        const newAdventurer = new Adventurer(name, this.role);
        this.adventurers.push(newAdventurer);
        return newAdventurer;
    }

    findByIndex(index) {
        return this.adventurers[index];
    }

    findByName(name) {
        return this.adventurers.find(a => a.name === name);
    }
}

class Dragon extends Character {
    constructor(name) {
        super(name);
        this.health = 200;
        this.inventory.push("golden egg", "dragon scale");
    }

    breatheFire() {
        console.log(`${this.name} breathes fire!`);
    }
}

// Create an adventurer named Robin
const robin = new Adventurer("Robin", "Fighter");
robin.inventory.push("sword", "potion", "artifact");

// Create companions for Robin
const leo = new Companion("Leo", "Cat");
leo.companion = new Companion("Frank", "Flea");
leo.companion.inventory.push("small hat", "sunglasses");

robin.companion = leo;

// Create a factory for Healers
const healers = new AdventurerFactory("Healer");
const healerRobin = healers.generate("Robin");

// Create a dragon
const smaug = new Dragon("Smaug");

// Test methods
robin.scout();
robin.duel(healerRobin);
smaug.breatheFire();
