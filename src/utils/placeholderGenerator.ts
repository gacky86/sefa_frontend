export const placeholderGenerator = (language: string) => {
  switch (language) {
    case '英語':
      return "Enter English word or phrases...";
    case 'ドイツ語':
      return "Geben Sie ein Wort oder einen Ausdruck ein ...";
    case 'フランス語':
      return "Saisissez un mot ou une expression ...";
    case 'ポルトガル語':
      return "Introduzir uma palavra ou expressão ...";
    case 'スペイン語':
      return "Introduzca una palabra o expresión ...";
    case 'オランダ語':
      return "Voer een woord of uitdrukking in ...";
    case 'イタリア語':
      return "Inserire una parola o un'espressione ...";
    default:
      return "Enter English word or phrases...";
  }
}
