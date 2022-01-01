export class Player {
  uuid!: string;
  nickname!: string;
  armyId!: string;
  life!: number;
  initiative!: number;

  constructor(data: Partial<Player> = {}) {
    Object.assign(this, data);
  }
}