

export class GameFast {
    constructor(
        public uuid: string,
        public player_one_name: string,
        public player_two_name: string | null,
        public game_uuid: string,
        public created_at: string,
        public updated_at: string,
    ) { }
}