export const generatePwd = (minLen = 12) => {
  function rand(max: number) {
    return Math.floor(Math.random() * max);
  }

  function ensurePwdContains(pwd: string, regexListOfChars: RegExp, listOfChars: string) {
    if (!regexListOfChars.test(pwd)) {
      let newChar = listOfChars.charAt(rand(listOfChars.length));
      let pos = rand(pwd.length + 1);
      pwd = pwd.slice(0, pos) + newChar + pwd.slice(pos);
    }
    return pwd;
  }

  const legalChars = '!#$@*123456789aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ';
  const specialChars = '!#$@*';
  const specialRegex = /[!#\$@*]/;
  const caps = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const capsRegex = /[A-Z]/;
  const nums = '123456789';
  const numRegex = /[1-9]/;
  const legalCharsArray = legalChars.split('');

  let pwd = '',
    len = minLen + rand(minLen),
    index;

  len = Math.min(legalCharsArray.length, len);

  while (pwd.length < len) {
    index = rand(legalCharsArray.length);
    pwd += legalCharsArray[index];
    legalCharsArray.splice(index, 1);
  }

  pwd = ensurePwdContains(pwd, specialRegex, specialChars);
  pwd = ensurePwdContains(pwd, capsRegex, caps);
  pwd = ensurePwdContains(pwd, numRegex, nums);
  return pwd;
};
