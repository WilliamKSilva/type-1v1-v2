

export class GameRegular {
    constructor(
        public uuid: string,
        public player_one_uuid: string,
        public player_two_uuid: string | null,
        public game_uuid: string,
        public created_at: string,
        public updated_at: string,
    ) { }
}