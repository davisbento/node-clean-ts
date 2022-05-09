export interface IJwtProvider {
  generateToken(userId: string): Promise<string>;
  verifyToken(token: string): Promise<string>;
}
