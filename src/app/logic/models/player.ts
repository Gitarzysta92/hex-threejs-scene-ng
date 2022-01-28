export abstract class Player {
  uuid!: string;
  nickname!: string;
  armyId!: string;
  life!: number;
  initiative!: number;
  ready: boolean = false;
}