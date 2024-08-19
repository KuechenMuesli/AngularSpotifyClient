declare module Spotify {
  interface Player {
    constructor(options: {
      name: string;
      getOAuthToken: (cb: (token: string) => void) => void;
      volume?: number;
    }): Player;
    connect(): Promise<boolean>;
    addListener(event: string, callback: (data: any) => void): void;
    resume(): Promise<void>;
    pause(): Promise<void>;
  }
}
