export interface User {
    nickname: string;
    username: string;
    email: string;
    photo: string;
    isMod: string;
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
}

export interface RequestingUser {
    photo: string;
    nickname: string;
    mod: string;
    email: string;
}
