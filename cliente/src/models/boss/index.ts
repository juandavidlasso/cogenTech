export interface Boss {
    id_jefe: number;
    nombre: string;
    email: string;
    cargo: string;
}

export interface BossForm {
    nombre: string;
    email: string;
    cargo: string;
}

export interface GetBossResponse {
    getBoss: Boss[];
}
