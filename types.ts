export interface User {
    nickname: string;
    username: string;
    email: string;
    photo: string;
    isMod: boolean;
    isInWeeklong: boolean;
    taggedBy: string;
    isAdmin: boolean;
    zombieHumanOz: number;
    tags: number;
    team: string;
    coins: number;
    daysSurvived: number;
    secretKey: string;
    requestingWeeklong: boolean;
    discordUser: string;
}

export interface RequestingUser {
    photo: string;
    nickname: string;
    mod: string;
    email: string;
}
