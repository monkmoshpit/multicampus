export type User = {
 id: string; // Changed to string as it is a ULID
 name: string;
 email: string;
 role: 'tenant' | 'teacher' | 'student';
 avatar?: string;
 email_verified_at: string | null;
 two_factor_enabled?: boolean;
 created_at: string;
 updated_at: string;
 [key: string]: unknown;
};


export type Auth = {
 user: User;
};

export type TwoFactorSetupData = {
 svg: string;
 url: string;
};

export type TwoFactorSecretKey = {
 secretKey: string;
};
