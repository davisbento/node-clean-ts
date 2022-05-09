export const formatApiErrorMessage = (error: string) => {
  console.log('ERROR BOT API', error);

  if (error === 'DuplicatedPayloadException') {
    return 'Payload duplicado';
  }

  if (error === 'ExchangeAccountBlockedException') {
    return 'Conta bloqueada / sem permissão de operar na exchange';
  }

  if (error === 'ExchangeFundsExceededException') {
    return 'Exchange excedeu o limite de fundos para a operação';
  }

  if (error === 'ExchangeInternalServerException') {
    return 'Erro interno da exchange';
  }

  if (error === 'ExchangeInvalidCredentialsException') {
    return 'API Key ou Secret inválidos';
  }

  if (error === 'ExchangeInvalidCredentialsPermissionsException') {
    return 'Permissões das credenciais inválidas';
  }

  if (error === 'ExchangeSystemOverloadException') {
    return 'Sistema da exchange sobrecarregado';
  }

  if (error === 'AccessDeniedException') {
    return 'Esse usuário não tem acesso a essa ação';
  }

  if (error === 'StrategyMinUsdInvestmentNotAchievedException') {
    return 'Conta tem Saldo menor que o mínimo necessário para a estratégia';
  }

  return null;
};
